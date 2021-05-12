"use strict";

export class SearchRequestAdapter {
  static get INDEX_NAME_MATCHING_REGEX() {
    return new RegExp("^(.+?)(?=(/sort/(.*))|$)");
  }

  static get FILER_STRING_MATCHING_REGEX() {
    // I called group2, not sure because I am not sure why it is there
    return new RegExp("(?<fieldName>.*)(?<notSure>(?!:).):(?<negative>-)?(?!:)(?<value>.*)");
  }

  constructor(instantsearchRequests, typesenseClient, additionalSearchParameters, collectionSpecificSearchParameters) {
    this.instantsearchRequests = instantsearchRequests;
    this.typesenseClient = typesenseClient;
    this.additionalSearchParameters = additionalSearchParameters;
    this.collectionSpecificSearchParameters = collectionSpecificSearchParameters;
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

    const parseFacetFilter = (facetFilter) => {
      const facetFilterMatches = facetFilter.match(this.constructor.FILER_STRING_MATCHING_REGEX);
      // console.log(facetFilterMatches)
      const fieldName = `${facetFilterMatches.groups["fieldName"]}${facetFilterMatches.groups["notSure"]}`;
      let fieldValue = `${facetFilterMatches.groups["value"]}`;
      let negative = false;

      // Check if is negative facet: https://www.algolia.com/doc/api-reference/api-parameters/facetFilters/
      // This is an insanely simple approach
      if (facetFilterMatches.groups.negative) {
        negative = true;
      } else {
        // replace \- with - so a facetValue can start with "-" assuming it was escaped before hand
        // untested
        fieldValue.replace("\\-", "-");
      }

      // Escape all facets except booleans
      if (!(String(fieldValue) === "true" || String(fieldValue) === "false")) {
        fieldValue = "`" + fieldValue + "`";
      }

      return { fieldName, fieldValue, negative };
    };

    const transformedTypesenseFilters = facetFilters.map((item) => {
      // console.log(item);
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
        const intermediateNegativeFacetFilters = {};

        item.forEach((facetFilter) => {
          const { fieldName, fieldValue, negative } = parseFacetFilter(facetFilter);

          // console.log(fieldName, fieldValue, negative);
          if (negative) {
            intermediateNegativeFacetFilters[fieldName] = intermediateNegativeFacetFilters[fieldName] || [];
            intermediateNegativeFacetFilters[fieldName].push(fieldValue);
          } else {
            intermediateFacetFilters[fieldName] = intermediateFacetFilters[fieldName] || [];
            intermediateFacetFilters[fieldName].push(fieldValue);
          }
        });

        // console.log("intermediateFacetFilters", intermediateFacetFilters);

        if (Object.keys(intermediateFacetFilters).length > 1) {
          console.error(
            `Typesense does not support cross-field ORs at the moment. The adapter could not OR values between these fields: ${Object.keys(
              intermediateFacetFilters
            ).join(",")}`
          );
        } else if (Object.keys(intermediateNegativeFacetFilters).length > 1) {
          console.error(
            `Typesense does not support cross-field ORs at the moment. The adapter could not OR values between these fields: ${Object.keys(
              intermediateNegativeFacetFilters
            ).join(",")}`
          );
        }

        // Need to transform:
        // intermediateFacetFilters = {
        //     "field1": ["value1", "value2"],
        // }
        //
        // Into this:
        // field1:=[value1,value2]

        const typesenseFilterString = [];
        if (Object.keys(intermediateFacetFilters).length > 0) {
          // Pick first value from intermediateFacetFilters
          // const fieldName = Object.keys(intermediateFacetFilters)[0];
          // const fieldValues = intermediateFacetFilters[fieldName];
          const fieldName = Object.keys(intermediateFacetFilters)[0];
          const fieldValues = intermediateFacetFilters[fieldName];
          typesenseFilterString.push(`${fieldName}:=[${fieldValues.join(",")}]`);
          // console.log(fieldName, fieldValues, typesenseFilterString);
        }

        if (Object.keys(intermediateNegativeFacetFilters).length > 0) {
          const fieldName = Object.keys(intermediateNegativeFacetFilters)[0];
          const fieldValues = intermediateNegativeFacetFilters[fieldName];
          // typesenseNegativeFilterString = `${fieldName}:-[${fieldValues.join(",")}]`;
          typesenseFilterString.push(`${fieldName}:-[${fieldValues.join(",")}]`);
        }

        return typesenseFilterString.join(" && ");
      } else {
        // Need to transform:
        //  fieldName:fieldValue
        // Into
        //  fieldName:=fieldValue

        const { fieldName, fieldValue, negative } = parseFacetFilter(item);
        let typesenseFilterString;
        if (negative) {
          typesenseFilterString = `${fieldName}:- [${fieldValue}]`;
        } else {
          typesenseFilterString = `${fieldName}:=[${fieldValue}]`;
        }
        // console.log(fieldName, fieldValue, negative);
        // console.log(typesenseFilterString);

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

  _adaptFilters(facetFilters, numericFilters) {
    const adaptedFilters = [];

    adaptedFilters.push(this._adaptFacetFilters(facetFilters));
    adaptedFilters.push(this._adaptNumericFilters(numericFilters));

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
    // console.log(params);

    Object.assign(typesenseSearchParams, {
      collection: adaptedCollectionName,
      q: params.query === "" || params.query === undefined ? "*" : params.query,
      facet_by: [params.facets].flat().join(","),
      filter_by: this._adaptFilters(params.facetFilters, params.numericFilters),
      sort_by: adaptedSortBy || this.additionalSearchParameters.sortBy,
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
