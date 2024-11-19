"use strict";

export class SearchRequestAdapter {
  static get INDEX_NAME_MATCHING_REGEX() {
    return new RegExp("^(.+?)(?=(/sort/(.*))|$)");
  }

  static get DEFAULT_FACET_FILTER_STRING_MATCHING_REGEX() {
    return new RegExp("(.*)((?!:).):(?!:)(.*)");
  }

  static get DEFAULT_NUMERIC_FILTER_STRING_MATCHING_REGEX() {
    return new RegExp("(.*?)(<=|>=|>|<|=)(.*)");
  }

  constructor(instantsearchRequests, typesenseClient, configuration) {
    this.instantsearchRequests = instantsearchRequests;
    this.typesenseClient = typesenseClient;
    this.configuration = configuration;
    this.additionalSearchParameters = configuration.additionalSearchParameters;
    this.collectionSpecificSearchParameters = configuration.collectionSpecificSearchParameters;
  }

  _shouldUseExactMatchForField(fieldName, collectionName) {
    if (
      this.configuration.collectionSpecificFilterByOptions?.[collectionName]?.[fieldName]?.exactMatch === false ||
      this.configuration.filterByOptions?.[fieldName]?.exactMatch === false
    ) {
      return false;
    } else {
      return true;
    }
  }

  _adaptFacetFilters(facetFilters, collectionName) {
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
          const { fieldName, fieldValue } = this._parseFacetFilter(facetFilter);
          intermediateFacetFilters[fieldName] = intermediateFacetFilters[fieldName] || [];
          intermediateFacetFilters[fieldName].push(fieldValue);
        });

        if (Object.keys(intermediateFacetFilters).length > 1) {
          console.error(
            `[Typesense-Instantsearch-Adapter] Typesense does not support cross-field ORs at the moment. The adapter could not OR values between these fields: ${Object.keys(
              intermediateFacetFilters,
            ).join(",")}`,
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

        // Partition values into included and excluded values
        const [excludedFieldValues, includedFieldValues] = fieldValues.reduce(
          (result, fieldValue) => {
            if (fieldValue.startsWith("-") && !this._isNumber(fieldValue)) {
              result[0].push(fieldValue.substring(1));
            } else {
              result[1].push(fieldValue);
            }
            return result;
          },
          [[], []],
        );

        const typesenseFilterStringComponents = [];
        if (includedFieldValues.length > 0) {
          const operator = this._shouldUseExactMatchForField(fieldName, collectionName) ? ":=" : ":";
          typesenseFilterStringComponents.push(
            `${fieldName}${operator}[${includedFieldValues.map((v) => this._escapeFacetValue(v)).join(",")}]`,
          );
        }
        if (excludedFieldValues.length > 0) {
          const operator = this._shouldUseExactMatchForField(fieldName, collectionName) ? ":!=" : ":!";
          typesenseFilterStringComponents.push(
            `${fieldName}${operator}[${excludedFieldValues.map((v) => this._escapeFacetValue(v)).join(",")}]`,
          );
        }

        const typesenseFilterString = typesenseFilterStringComponents.filter((f) => f).join(" && ");

        return typesenseFilterString;
      } else {
        // Need to transform:
        //  fieldName:fieldValue
        // Into
        //  fieldName:=fieldValue

        const { fieldName, fieldValue } = this._parseFacetFilter(item);
        let typesenseFilterString;
        if (fieldValue.startsWith("-") && !this._isNumber(fieldValue)) {
          const operator = this._shouldUseExactMatchForField(fieldName, collectionName) ? ":!=" : ":!";
          typesenseFilterString = `${fieldName}${operator}[${this._escapeFacetValue(fieldValue.substring(1))}]`;
        } else {
          const operator = this._shouldUseExactMatchForField(fieldName, collectionName) ? ":=" : ":";
          typesenseFilterString = `${fieldName}${operator}[${this._escapeFacetValue(fieldValue)}]`;
        }

        return typesenseFilterString;
      }
    });

    adaptedResult = transformedTypesenseFilters.join(" && ");
    // console.log(`${JSON.stringify(facetFilters)} => ${adaptedResult}`);

    return adaptedResult;
  }

  _parseFacetFilter(facetFilter) {
    let filterStringMatchingRegex, facetFilterMatches, fieldName, fieldValue;

    // This is helpful when the filter looks like `facetName:with:colons:facetValue:with:colons` and the default regex above parses the filter as `facetName:with:colons:facetValue:with` and `colon`.
    // So if a facetValue can contain a colon, we ask users to pass in all possible facetable fields in `facetableFieldsWithSpecialCharacters` when instantiating the adapter, so we can explicitly match against that.
    if (this.configuration.facetableFieldsWithSpecialCharacters?.length > 0) {
      // escape any Regex special characters, source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
      const sanitizedFacetableFieldsWithSpecialCharacters = this.configuration.facetableFieldsWithSpecialCharacters
        .flat()
        .map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      filterStringMatchingRegex = new RegExp(`^(${sanitizedFacetableFieldsWithSpecialCharacters.join("|")}):(.*)$`);
      facetFilterMatches = facetFilter.match(filterStringMatchingRegex);

      if (facetFilterMatches != null) {
        fieldName = `${facetFilterMatches[1]}`;
        fieldValue = `${facetFilterMatches[2]}`;

        return {
          fieldName,
          fieldValue,
        };
      }
    }

    // If we haven't found any matches yet
    // Use the default filter parsing regex, which assumes that only facet names have colons, and not facet values
    filterStringMatchingRegex = this.constructor.DEFAULT_FACET_FILTER_STRING_MATCHING_REGEX;
    facetFilterMatches = facetFilter.match(filterStringMatchingRegex);

    // console.log(filterStringMatchingRegex);
    // console.log(facetFilter);
    // console.log(facetFilterMatches);

    if (facetFilterMatches == null) {
      console.error(
        `[Typesense-Instantsearch-Adapter] Parsing failed for a facet filter \`${facetFilter}\` with the Regex \`${filterStringMatchingRegex}\`. If you have field names with special characters, be sure to add them to a parameter called \`facetableFieldsWithSpecialCharacters\` when instantiating the adapter.`,
      );
    } else {
      fieldName = `${facetFilterMatches[1]}${facetFilterMatches[2]}`;
      fieldValue = `${facetFilterMatches[3]}`;
    }

    return {
      fieldName,
      fieldValue,
    };
  }

  _escapeFacetValue(value) {
    // Don't escape booleans, integers or floats
    if (typeof value === "boolean" || value === "true" || value === "false" || this._isNumber(value)) {
      return value;
    }
    return `\`${value}\``;
  }

  _isNumber(value) {
    return (
      Number.isInteger(value % 1) || // Mod 1 will automatically try converting string values to integer/float
      !!(value % 1)
    ); // Is Float
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
      const { fieldName, operator, fieldValue } = this._parseNumericFilter(filter);
      filtersHash[fieldName] = filtersHash[fieldName] || {};
      filtersHash[fieldName][operator] = fieldValue;
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
      } else if (filtersHash[field]["="] != null) {
        adaptedFilters.push(`${field}:=${filtersHash[field]["="]}`);
      } else {
        console.warn(
          `[Typesense-Instantsearch-Adapter] Unsupported operator found ${JSON.stringify(filtersHash[field])}`,
        );
      }
    });

    adaptedResult = adaptedFilters.join(" && ");
    return adaptedResult;
  }

  _parseNumericFilter(numericFilter) {
    let filterStringMatchingRegex, numericFilterMatches;
    let fieldName, operator, fieldValue;

    // The following is helpful when the facetName has special characters like > and the default regex fails to parse it properly.
    // So we ask users to pass in facetable fields in `facetableFieldsWithSpecialCharactersWithSpecialCharacters` when instantiating the adapter, so we can explicitly match against that.
    if (this.configuration.facetableFieldsWithSpecialCharacters?.length > 0) {
      // escape any Regex special characters, source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
      const sanitizedFacetableFieldsWithSpecialCharacters = this.configuration.facetableFieldsWithSpecialCharacters.map(
        (f) => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      );
      filterStringMatchingRegex = new RegExp(
        `^(${sanitizedFacetableFieldsWithSpecialCharacters.join("|")})(<=|>=|>|<|=)(.*)$`,
      );

      numericFilterMatches = numericFilter.match(filterStringMatchingRegex);

      if (numericFilterMatches != null) {
        // If no matches are found or if the above didn't trigger, fall back to the default regex
        [, fieldName, operator, fieldValue] = numericFilterMatches;
        return {
          fieldName,
          operator,
          fieldValue,
        };
      }
    }

    // If we haven't found any matches yet, fall back to the default regex
    filterStringMatchingRegex = this.constructor.DEFAULT_NUMERIC_FILTER_STRING_MATCHING_REGEX;
    numericFilterMatches = numericFilter.match(filterStringMatchingRegex);

    // console.log(filterStringMatchingRegex);
    // console.log(numericFilter);
    // console.log(numericFilterMatches);

    if (numericFilterMatches == null) {
      console.error(
        `[Typesense-Instantsearch-Adapter] Parsing failed for a numeric filter \`${numericFilter}\` with the Regex \`${filterStringMatchingRegex}\`. If you have field names with special characters, be sure to add them to a parameter called \`facetableFieldsWithSpecialCharacters\` when instantiating the adapter.`,
      );
    } else {
      [, fieldName, operator, fieldValue] = numericFilterMatches;
    }

    return {
      fieldName,
      operator,
      fieldValue,
    };
  }

  _adaptGeoFilter({ insideBoundingBox, aroundRadius, aroundLatLng, insidePolygon }) {
    // Give this parameter first priority if it exists, since
    if (insideBoundingBox) {
      let x1, y1, x2, y2;
      if (Array.isArray(insideBoundingBox)) {
        [x1, y1, x2, y2] = insideBoundingBox.flat();
      } else {
        [x1, y1, x2, y2] = insideBoundingBox.split(",");
      }
      return `${this.configuration.geoLocationField}:(${x1}, ${y1}, ${x1}, ${y2}, ${x2}, ${y2}, ${x2}, ${y1})`;
    }

    if (aroundLatLng || aroundRadius) {
      if (!aroundRadius || aroundRadius === "all") {
        throw new Error(
          "[Typesense-Instantsearch-Adapter] In Typesense, geo-filtering around a lat/lng also requires a numerical radius. " +
            "So the `aroundRadius` parameter is required when `aroundLatLng` is used. " +
            "If you intend to just geo-sort around a lat/long, you want to use the sortBy InstantSearch widget (or a virtual sortBy custom widget).",
        );
      }
      const adaptedAroundRadius = `${parseFloat(aroundRadius) / 1000} km`; // aroundRadius is in meters
      return `${this.configuration.geoLocationField}:(${aroundLatLng}, ${adaptedAroundRadius})`;
    }

    if (insidePolygon) {
      let coordinates = insidePolygon;
      if (Array.isArray(insidePolygon)) {
        coordinates = insidePolygon.flat().join(",");
      }
      return `${this.configuration.geoLocationField}:(${coordinates})`;
    }
  }

  _adaptFilters(instantsearchParams, collectionName) {
    const adaptedFilters = [];

    // `filters` can be used with the `Configure` widget
    // However the format needs to be in the Typesense filter_by format, instead of Algolia filter format.
    if (instantsearchParams.filters) {
      adaptedFilters.push(instantsearchParams.filters);
    }
    adaptedFilters.push(this._adaptFacetFilters(instantsearchParams.facetFilters, collectionName));
    adaptedFilters.push(this._adaptNumericFilters(instantsearchParams.numericFilters));
    adaptedFilters.push(this._adaptGeoFilter(instantsearchParams));

    return adaptedFilters.filter((filter) => filter && filter !== "").join(" && ");
  }

  _adaptIndexName(indexName) {
    return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[1];
  }

  _adaptSortBy(indexName) {
    return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[3];
  }

  _adaptFacetBy(facets, collectionName) {
    return [facets]
      .flat()
      .map((facet) => {
        if (this.configuration.collectionSpecificFacetByOptions?.[collectionName]?.[facet]) {
          return `${facet}${this.configuration.collectionSpecificFacetByOptions[collectionName][facet]}`;
        } else if (this.configuration.facetByOptions[facet]) {
          return `${facet}${this.configuration.facetByOptions[facet]}`;
        } else {
          return facet;
        }
      })
      .join(",");
  }

  _adaptRulesContextsToOverrideTags(ruleContexts) {
    return ruleContexts.join(",");
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
      facet_by:
        snakeCasedAdditionalSearchParameters.facet_by || this._adaptFacetBy(params.facets, adaptedCollectionName),
      filter_by: this._adaptFilters(params, adaptedCollectionName) || snakeCasedAdditionalSearchParameters.filter_by,
      sort_by: adaptedSortBy || snakeCasedAdditionalSearchParameters.sort_by,
      max_facet_values: params.maxValuesPerFacet,
      page: (params.page || 0) + 1,
    });

    if (params.hitsPerPage != null) {
      typesenseSearchParams.per_page = params.hitsPerPage;
    }

    if (params.facetQuery) {
      typesenseSearchParams.facet_query = `${params.facetName}:${params.facetQuery}`;
      typesenseSearchParams.per_page = 0;
    }

    if (params.ruleContexts && params.ruleContexts.length > 0) {
      typesenseSearchParams.override_tags = this._adaptRulesContextsToOverrideTags(params.ruleContexts);
    }

    // If a custom vector query is specified, set q=*
    if (params.typesenseVectorQuery) {
      typesenseSearchParams.vector_query = params.typesenseVectorQuery;
    }

    // Allow for conditional disabling of overrides, for particular sort orders
    let sortByOption =
      this.configuration.collectionSpecificSortByOptions?.[adaptedCollectionName]?.[typesenseSearchParams["sort_by"]] ||
      this.configuration.sortByOptions?.[typesenseSearchParams["sort_by"]];
    if (sortByOption?.["enable_overrides"] != null) {
      typesenseSearchParams["enable_overrides"] = sortByOption["enable_overrides"];
    }

    // console.log(params);
    // console.log(typesenseSearchParams);

    // Filter out empty or null values, so we don't accidentally override values set in presets
    // eslint-disable-next-line no-unused-vars
    return Object.fromEntries(Object.entries(typesenseSearchParams).filter(([_, v]) => v != null && v !== ""));
  }

  _camelToSnakeCase(str) {
    return str
      .split(/(?=[A-Z])/)
      .join("_")
      .toLowerCase();
  }

  async request() {
    // console.log(this.instantsearchRequests);

    let searches = this.instantsearchRequests.map((instantsearchRequest) =>
      this._buildSearchParameters(instantsearchRequest),
    );

    // If this is a conversational search, then move conversation related params to query params
    let commonParams = {};
    if (searches[0]?.conversation === true || searches[0]?.conversation === "true") {
      const { q, conversation, conversation_id, conversation_model_id } = searches[0];
      commonParams = { q, conversation, conversation_id, conversation_model_id };

      searches = searches.map((searchParams) => {
        // eslint-disable-next-line no-unused-vars
        const { q, conversation, conversation_id, conversation_model_id, ...modifiedSearchParams } = searchParams;
        return modifiedSearchParams;
      });
    }

    return this.typesenseClient.multiSearch.perform({ searches: searches }, commonParams);
  }
}
