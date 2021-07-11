"use strict";

export class SearchRequestAdapter {
  static get INDEX_NAME_MATCHING_REGEX() {
    return new RegExp("^(.+?)(?=(/sort/(.*))|$)");
  }

  static get FILER_STRING_MATCHING_REGEX() {
    return new RegExp("(.*)((?!:).):(?!:)(.*)");
  }

  constructor(instantsearchRequests, typesenseClient, configuration) {
    this.instantsearchRequests = instantsearchRequests;
    this.typesenseClient = typesenseClient;
    this.configuration = configuration;
    this.additionalSearchParameters = configuration.additionalSearchParameters;
    this.collectionSpecificSearchParameters = configuration.collectionSpecificSearchParameters;
  }

  _adaptFacetFilters(facetFilters) {
    let adaptedResult = "";

    if (!facetFilters) {
      return adaptedResult;
    }

    /**
     * Need to transform:
     *  facetFilters = [["field1:value1", "field1:value2"], "field2:value3", "field2:value4"]
     *
     * Into this:
     *  field1:=[value1,value2] && field2:=value3 && field2:=value4
     *
     * Steps:
     *  - For each item in facetFilters
     *    - If item is array
     *      - OR values together.
     *      - Warn if field names are not the same
     *    - If item is string, convert to facet:=value format
     *  - Join strings by &&
     */

    const transformedTypesenseFilters = facetFilters.map((item) => {
      if (Array.isArray(item)) {
        // Need to transform:
        // facetFilters = ["field1:value1", "field1:value2", "facetN:valueN"]
        //
        // Into this:
        // intermediateFacetFilters = {
        //     "field1": ["value1", "value2"],
        //     "fieldN": ["valueN"]
        // }

        const intermediateFacetFilters = {};
        item.forEach((facetFilter) => {
          const facetFilterMatches = facetFilter.match(this.constructor.FILER_STRING_MATCHING_REGEX);
          const fieldName = `${facetFilterMatches[1]}${facetFilterMatches[2]}`;
          const fieldValue = `${facetFilterMatches[3]}`;
          intermediateFacetFilters[fieldName] = intermediateFacetFilters[fieldName] || [];
          intermediateFacetFilters[fieldName].push(fieldValue);
        });

        if (Object.keys(intermediateFacetFilters).length > 1) {
          console.error(
            `Typesense does not support cross-field ORs at the moment. The adapter could not OR values between these fields: ${Object.keys(
              intermediateFacetFilters
            ).join(",")}`
          );
        }

        // Pick first value from intermediateFacetFilters
        const fieldName = Object.keys(intermediateFacetFilters)[0];
        const fieldValues = intermediateFacetFilters[fieldName];

        // Need to transform:
        // intermediateFacetFilters = {
        //     "field1": ["value1", "value2"],
        // }
        //
        // Into this:
        // field1:=[value1,value2]

        const typesenseFilterString = `${fieldName}:=[\`${fieldValues.join(",")}\`]`;

        return typesenseFilterString;
      } else {
        // Need to transform:
        //  fieldName:fieldValue
        // Into
        //  fieldName:=fieldValue

        const facetFilterMatches = item.match(this.constructor.FILER_STRING_MATCHING_REGEX);
        const fieldName = `${facetFilterMatches[1]}${facetFilterMatches[2]}`;
        const fieldValue = `${facetFilterMatches[3]}`;
        const typesenseFilterString = `${fieldName}:=[\`${fieldValue}\`]`;

        return typesenseFilterString;
      }
    });

    adaptedResult = transformedTypesenseFilters.join(" && ");
    // console.log(`${JSON.stringify(facetFilters)} => ${adaptedResult}`);

    return adaptedResult;
  }

  _adaptNumericFilters(numericFilters) {
    // Need to transform this:
    // ["field1<=634", "field1>=289", "field2<=5", "field3>=3"]
    // to:
    // "field1:=[634..289] && field2:<=5 && field3:>=3"
    let adaptedResult = "";

    if (!numericFilters) {
      return adaptedResult;
    }

    // Transform to intermediate structure:
    // {
    //   field1: {
    //     "<=": 634,
    //     ">=": 289
    //   },
    //   field2: {
    //     "<=": 5
    //   },
    //   field3: {
    //     ">=": 3
    //   }
    // };
    const filtersHash = {};
    numericFilters.forEach((filter) => {
      const [, field, operator, value] = filter.match(new RegExp("(.*)(<=|>=|>|<|:)(.*)"));
      filtersHash[field] = filtersHash[field] || {};
      filtersHash[field][operator] = value;
    });

    // Transform that to:
    //  "field1:=[634..289] && field2:<=5 && field3:>=3"
    const adaptedFilters = [];
    Object.keys(filtersHash).forEach((field) => {
      if (filtersHash[field]["<="] != null && filtersHash[field][">="] != null) {
        adaptedFilters.push(`${field}:=[${filtersHash[field][">="]}..${filtersHash[field]["<="]}]`);
      } else if (filtersHash[field]["<="] != null) {
        adaptedFilters.push(`${field}:<=${filtersHash[field]["<="]}`);
      } else if (filtersHash[field][">="] != null) {
        adaptedFilters.push(`${field}:>=${filtersHash[field][">="]}`);
      } else {
        console.warn(`Unsupported operator found ${JSON.stringify(filtersHash[field])}`);
      }
    });

    adaptedResult = adaptedFilters.join(" && ");
    return adaptedResult;
  }

  _adaptGeoFilter(boundingBox) {
    const [x1, y1, x2, y2] = boundingBox.split(",");
    return `${this.configuration.geoLocationField}:(${x1}, ${y1}, ${x1}, ${y2}, ${x2}, ${y2}, ${x2}, ${y1})`;
  }

  _adaptFilters(facetFilters, numericFilters, geoFilter) {
    const adaptedFilters = [];

    adaptedFilters.push(this._adaptFacetFilters(facetFilters));
    adaptedFilters.push(this._adaptNumericFilters(numericFilters));

    if (geoFilter != null) {
      adaptedFilters.push(this._adaptGeoFilter(geoFilter));
    }

    return adaptedFilters.filter((filter) => filter !== "").join(" && ");
  }

  _adaptIndexName(indexName) {
    return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[1];
  }

  _adaptSortBy(indexName) {
    return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[3];
  }

  _buildSearchParameters(instantsearchRequest) {
    const params = instantsearchRequest.params;
    const indexName = instantsearchRequest.indexName;
    const adaptedCollectionName = this._adaptIndexName(indexName);

    // Convert all common parameters to snake case
    const snakeCasedAdditionalSearchParameters = {};
    for (const [key, value] of Object.entries(this.additionalSearchParameters)) {
      snakeCasedAdditionalSearchParameters[this._camelToSnakeCase(key)] = value;
    }

    // Override, collection specific parameters
    if (this.collectionSpecificSearchParameters[adaptedCollectionName]) {
      for (const [key, value] of Object.entries(this.collectionSpecificSearchParameters[adaptedCollectionName])) {
        snakeCasedAdditionalSearchParameters[this._camelToSnakeCase(key)] = value;
      }
    }

    const typesenseSearchParams = Object.assign({}, snakeCasedAdditionalSearchParameters);

    const adaptedSortBy = this._adaptSortBy(indexName);

    Object.assign(typesenseSearchParams, {
      collection: adaptedCollectionName,
      q: params.query === "" || params.query === undefined ? "*" : params.query,
      facet_by: [params.facets].flat().join(","),
      filter_by: this._adaptFilters(params.facetFilters, params.numericFilters, params.insideBoundingBox),
      sort_by: adaptedSortBy || snakeCasedAdditionalSearchParameters.sort_by,
      max_facet_values: params.maxValuesPerFacet,
      page: (params.page || 0) + 1,
    });

    if (params.hitsPerPage) {
      typesenseSearchParams.per_page = params.hitsPerPage;
    }

    if (params.facetQuery) {
      typesenseSearchParams.facet_query = `${params.facetName}:${params.facetQuery}`;
      typesenseSearchParams.per_page = 0;
    }

    // console.log(params);
    // console.log(typesenseSearchParams);

    return typesenseSearchParams;
  }

  _camelToSnakeCase(str) {
    return str
      .split(/(?=[A-Z])/)
      .join("_")
      .toLowerCase();
  }

  async request() {
    const searches = this.instantsearchRequests.map((instantsearchRequest) =>
      this._buildSearchParameters(instantsearchRequest)
    );

    return this.typesenseClient.multiSearch.perform({ searches: searches });
  }
}
