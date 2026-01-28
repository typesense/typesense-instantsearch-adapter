"use strict";

export class SearchRequestAdapter {
  static get NUMERIC_OPERATORS() {
    return ["<=", ">=", "<", ">", "="];
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

  /**
   * Returns the configured list of field names that may include delimiters.
   * Always returns a flat array so callers can treat it uniformly.
   */
  _getFacetableFieldsWithSpecialCharacters() {
    const fields = this.configuration.facetableFieldsWithSpecialCharacters;
    if (!Array.isArray(fields)) {
      return [];
    }
    return fields.flat();
  }

  /**
   * Finds the best matching field name at the start of `filter`.
   * Uses the provided delimiter check so it works for both facets and numeric filters.
   */
  _matchFieldNameWithDelimiter(filter, fields, isDelimiterAtIndex) {
    const matches = fields
      .filter((fieldName) => filter.startsWith(fieldName) && isDelimiterAtIndex(fieldName.length))
      .map((fieldName) => ({
        fieldName,
        delimiterIndex: fieldName.length,
      }));

    if (matches.length === 0) {
      return null;
    }

    return matches.reduce((best, current) => (current.fieldName.length > best.fieldName.length ? current : best));
  }

  /**
   * Returns the index of the first ":" that is not inside backticks.
   */
  _findFacetDelimiterIndex(filter) {
    let inBacktick = false;
    for (let i = 0; i < filter.length; i += 1) {
      const character = filter[i];
      if (character === "`") {
        inBacktick = !inBacktick;
      }
      if (!inBacktick && character === ":") {
        return i;
      }
    }
    return -1;
  }

  /**
   * Returns the index of the last ":" that is not inside backticks.
   * Used as a fallback when field names may contain colons.
   */
  _findLastFacetDelimiterIndex(filter) {
    let inBacktick = false;
    let lastIndex = -1;
    for (let i = 0; i < filter.length; i += 1) {
      const character = filter[i];
      if (character === "`") {
        inBacktick = !inBacktick;
      }
      if (!inBacktick && character === ":") {
        lastIndex = i;
      }
    }
    return lastIndex;
  }

  /**
   * Finds the first numeric operator outside backticks and returns its position.
   * @param {string} filter
   */
  _findNumericOperator(filter) {
    const operators = SearchRequestAdapter.NUMERIC_OPERATORS;
    let inBacktick = false;

    const index = Array.from(filter).findIndex((character, i) => {
      if (character === "`") {
        inBacktick = !inBacktick;
      }
      if (inBacktick) {
        return false;
      }
      return operators.some((operator) => filter.startsWith(operator, i));
    });

    if (index === -1) {
      return null;
    }

    const operator = operators.find((op) => filter.startsWith(op, index));
    return { index, operator };
  }

  /**
   * Parses "$collection(field.path)" (or "!$collection(field.path)").
   * Example: "$product_prices(retailer)" -> { collection: "product_prices", fieldPath: "retailer" }
   * Returns null if the string is not a join field.
   * @param {string} fieldName
   */
  _parseJoinFieldName(fieldName) {
    const trimmed = fieldName.trim();
    if (!(trimmed.startsWith("$") || trimmed.startsWith("!$"))) {
      return null;
    }
    const collectionStart = trimmed.startsWith("!$") ? 2 : 1;
    const openParenIndex = trimmed.indexOf("(", collectionStart);
    if (openParenIndex === -1) {
      return null;
    }

    let parenCount = 0;
    let closeParenIndex = -1;
    for (let i = openParenIndex; i < trimmed.length; i += 1) {
      const character = trimmed[i];
      if (character === "(") {
        parenCount += 1;
      } else if (character === ")") {
        parenCount -= 1;
        if (parenCount === 0) {
          closeParenIndex = i;
          break;
        }
      }
    }

    if (closeParenIndex === -1 || closeParenIndex !== trimmed.length - 1) {
      return null;
    }

    const collection = trimmed.slice(0, openParenIndex).trim();
    const fieldPath = trimmed.slice(openParenIndex + 1, closeParenIndex).trim();
    if (!collection || !fieldPath) {
      return null;
    }

    return { collection, fieldPath };
  }

  /**
   * Parses "$collection(innerFilter)" (or "!$collection(innerFilter)").
   * Example: "$product_prices(retailer:=[`value1`])" -> { collection: "product_prices", innerFilter: "retailer:=[`value1`]" }
   * Returns null if the filter is not a join filter string or parsing fails.
   * @param {string} filter
   */
  _parseJoinFilterString(filter) {
    const trimmed = filter.trim();
    if (!(trimmed.startsWith("$") || trimmed.startsWith("!$"))) {
      return null;
    }
    const collectionStartsAfterCharIndex = trimmed.startsWith("!$") ? 2 : 1;
    const openParenIndex = trimmed.indexOf("(", collectionStartsAfterCharIndex);
    if (openParenIndex === -1) {
      return null;
    }

    let parenCount = 0;
    let closeParenIndex = -1;
    for (let i = openParenIndex; i < trimmed.length; i += 1) {
      const character = trimmed[i];
      if (character === "(") {
        parenCount += 1;
      } else if (character === ")") {
        parenCount -= 1;
        if (parenCount === 0) {
          closeParenIndex = i;
          break;
        }
      }
    }

    if (closeParenIndex === -1 || closeParenIndex !== trimmed.length - 1) {
      return null;
    }

    const collection = trimmed.slice(0, openParenIndex).trim();
    const innerFilter = trimmed.slice(openParenIndex + 1, closeParenIndex).trim();
    if (!collection || !innerFilter) {
      return null;
    }

    return { collection, innerFilter };
  }

  _buildFacetFilterString({ fieldName, fieldValues, isExcluded, collectionName }) {
    // Check if this is a joined relation filter (e.g., "$refCollection(retailer)")
    const joinedRelationMatch = this._parseJoinFieldName(fieldName);

    const operator = isExcluded
      ? this._shouldUseExactMatchForField(fieldName, collectionName)
        ? ":!="
        : ":!"
      : this._shouldUseExactMatchForField(fieldName, collectionName)
        ? ":="
        : ":";

    if (joinedRelationMatch) {
      // This is a joined relation filter
      const { collection, fieldPath } = joinedRelationMatch; // e.g., "$refCollection", "retailer"
      // For joined relations, the filter should be: $collection(field:=[value1,value2])
      return `${collection}(${fieldPath}${operator}[${fieldValues.map((v) => this._escapeFacetValue(v)).join(",")}])`;
    } else {
      // Regular field filter (non-joined)
      return `${fieldName}${operator}[${fieldValues.map((v) => this._escapeFacetValue(v)).join(",")}]`;
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
          typesenseFilterStringComponents.push(
            this._buildFacetFilterString({
              fieldName,
              fieldValues: includedFieldValues,
              isExcluded: false,
              collectionName,
            }),
          );
        }
        if (excludedFieldValues.length > 0) {
          typesenseFilterStringComponents.push(
            this._buildFacetFilterString({
              fieldName,
              fieldValues: excludedFieldValues,
              isExcluded: true,
              collectionName,
            }),
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
          typesenseFilterString = this._buildFacetFilterString({
            fieldName,
            fieldValues: [fieldValue.substring(1)],
            isExcluded: true,
            collectionName,
          });
        } else {
          typesenseFilterString = this._buildFacetFilterString({
            fieldName,
            fieldValues: [fieldValue],
            isExcluded: false,
            collectionName,
          });
        }

        return typesenseFilterString;
      }
    });

    adaptedResult = transformedTypesenseFilters.join(" && ");
    // console.log(`${JSON.stringify(facetFilters)} => ${adaptedResult}`);

    return adaptedResult;
  }

  _parseFacetFilter(facetFilter) {
    let fieldName, fieldValue;

    // This is helpful when the filter looks like `facetName:with:colons:facetValue:with:colons` and a naive split would parse it as `facetName:with:colons:facetValue:with` and `colon`.
    // So if a facetValue can contain a colon, we ask users to pass in all possible facetable fields in `facetableFieldsWithSpecialCharacters` when instantiating the adapter, so we can explicitly match against that.
    const facetableFieldsWithSpecialCharacters = this._getFacetableFieldsWithSpecialCharacters();
    if (facetableFieldsWithSpecialCharacters.length > 0) {
      const matched = this._matchFieldNameWithDelimiter(
        facetFilter,
        facetableFieldsWithSpecialCharacters,
        (index) => facetFilter[index] === ":",
      );
      if (matched) {
        fieldName = matched.fieldName;
        fieldValue = facetFilter.slice(matched.delimiterIndex + 1);
        return {
          fieldName,
          fieldValue,
        };
      }
    }

    // If we haven't found any matches yet, check if this is a join filter
    // JOIN filters have the format "$collection(field):value" or "!$collection(field):value" (https://typesense.org/docs/latest/api/search.html#facet-referencing)
    // for join filters, we need to find the colon after the closing parenthesis, not use the last colon
    if (facetFilter.startsWith("$") || facetFilter.startsWith("!$")) {
      const collectionStartsAfterCharIndex = facetFilter.startsWith("!$") ? 2 : 1;
      const openParenIndex = facetFilter.indexOf("(", collectionStartsAfterCharIndex);
      if (openParenIndex !== -1) {
        // find the matching closing parenthesis
        let parenCount = 0;
        let closeParenIndex = -1;
        for (let i = openParenIndex; i < facetFilter.length; i += 1) {
          const character = facetFilter[i];
          if (character === "(") {
            parenCount += 1;
          } else if (character === ")") {
            parenCount -= 1;
            if (parenCount === 0) {
              closeParenIndex = i;
              break;
            }
          }
        }
        // found a closing paren, find the colon after it
        if (closeParenIndex !== -1) {
          const colonAfterJoin = facetFilter.indexOf(":", closeParenIndex + 1);
          if (colonAfterJoin !== -1) {
            fieldName = facetFilter.slice(0, colonAfterJoin).trim();
            fieldValue = facetFilter.slice(colonAfterJoin + 1).trim();
            return {
              fieldName,
              fieldValue,
            };
          }
        }
      }
    }

    // use a scan that assumes field names may have colons so we use the last colon as the delimiter.
    // handles cases like "field2:with:colons:value3" where the field name is "field2:with:colons". (edge case, not sure if this is supported by the server)
    const delimiterIndex = this._findLastFacetDelimiterIndex(facetFilter);
    if (delimiterIndex === -1) {
      console.error(
        `[Typesense-Instantsearch-Adapter] Parsing failed for a facet filter \`${facetFilter}\`. If you have field names with special characters, add them to a parameter called \`facetableFieldsWithSpecialCharacters\` when instantiating the adapter.`,
      );
    } else {
      fieldName = facetFilter.slice(0, delimiterIndex).trim();
      fieldValue = facetFilter.slice(delimiterIndex + 1).trim();
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

  _groupJoinFilters(filters) {
    // Group join filters by their collection name
    // Example: ["$product_prices(retailer:=[`value1`])", "$product_prices(status:=[`active`])", "brand:=[`Apple`]"]
    // Should become: ["$product_prices(retailer:=[`value1`] && status:=[`active`])", "brand:=[`Apple`]"]

    const joinFiltersMap = {};
    const regularFilters = [];

    filters.forEach((filter) => {
      const joinMatch = this._parseJoinFilterString(filter);

      if (joinMatch) {
        const { collection, innerFilter } = joinMatch;

        if (!joinFiltersMap[collection]) {
          joinFiltersMap[collection] = [];
        }
        joinFiltersMap[collection].push(innerFilter);
      } else {
        regularFilters.push(filter);
      }
    });

    // Rebuild grouped join filters
    const groupedJoinFilters = Object.keys(joinFiltersMap).map((collection) => {
      const innerFilters = joinFiltersMap[collection].join(" && ");
      return `${collection}(${innerFilters})`;
    });

    // Combine grouped join filters with regular filters
    return [...groupedJoinFilters, ...regularFilters].filter((f) => f).join(" && ");
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
      // Check if this is a joined relation filter (e.g., "$refCollection(price.current)")
      const joinedRelationMatch = this._parseJoinFieldName(field);

      if (joinedRelationMatch) {
        // This is a joined relation filter
        const { collection, fieldPath } = joinedRelationMatch; // e.g., "$refCollection", "price.current"

        if (filtersHash[field]["<="] != null && filtersHash[field][">="] != null) {
          adaptedFilters.push(
            `${collection}(${fieldPath}:=[${filtersHash[field][">="]}..${filtersHash[field]["<="]}])`,
          );
        } else if (filtersHash[field]["<="] != null) {
          adaptedFilters.push(`${collection}(${fieldPath}:<=${filtersHash[field]["<="]})`);
        } else if (filtersHash[field][">="] != null) {
          adaptedFilters.push(`${collection}(${fieldPath}:>=${filtersHash[field][">="]})`);
        } else if (filtersHash[field]["="] != null) {
          adaptedFilters.push(`${collection}(${fieldPath}:=${filtersHash[field]["="]})`);
        } else {
          console.warn(
            `[Typesense-Instantsearch-Adapter] Unsupported operator found ${JSON.stringify(filtersHash[field])}`,
          );
        }
      } else {
        // Regular field filter (non-joined)
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
      }
    });

    adaptedResult = adaptedFilters.join(" && ");
    return adaptedResult;
  }

  _parseNumericFilter(numericFilter) {
    let fieldName, operator, fieldValue;

    // The following is helpful when the facetName has special characters like > and a naive operator scan would parse it improperly.
    // So we ask users to pass in facetable fields in `facetableFieldsWithSpecialCharactersWithSpecialCharacters` when instantiating the adapter, so we can explicitly match against that.
    const facetableFieldsWithSpecialCharacters = this._getFacetableFieldsWithSpecialCharacters();
    if (facetableFieldsWithSpecialCharacters.length > 0) {
      const matched = this._matchFieldNameWithDelimiter(
        numericFilter,
        facetableFieldsWithSpecialCharacters,
        () => true,
      );
      if (matched) {
        const remainder = numericFilter.slice(matched.delimiterIndex);
        const trimmedRemainder = remainder.trimStart();
        const leadingTrimOffset = remainder.length - trimmedRemainder.length;
        const opMatch = this._findNumericOperator(trimmedRemainder);
        if (opMatch && opMatch.index === 0) {
          const operatorIndex = matched.delimiterIndex + leadingTrimOffset;
          fieldName = numericFilter.slice(0, operatorIndex).trim();
          operator = opMatch.operator;
          fieldValue = trimmedRemainder.slice(opMatch.operator.length).trim();
          return {
            fieldName,
            operator,
            fieldValue,
          };
        }
      }
    }

    // If we haven't found any matches yet, fall back to scanning for an operator.
    const opMatch = this._findNumericOperator(numericFilter);
    if (!opMatch) {
      console.error(
        `[Typesense-Instantsearch-Adapter] Parsing failed for a numeric filter \`${numericFilter}\`. If you have field names with special characters, be sure to add them to a parameter called \`facetableFieldsWithSpecialCharacters\` when instantiating the adapter.`,
      );
    } else {
      fieldName = numericFilter.slice(0, opMatch.index).trim();
      operator = opMatch.operator;
      fieldValue = numericFilter.slice(opMatch.index + opMatch.operator.length).trim();
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

    // Filter out empty strings, split by && to get individual filters, then group join filters
    const allFilters = adaptedFilters
      .filter((filter) => filter && filter !== "")
      .flatMap((filter) => filter.split(" && ").map((f) => f.trim()))
      .filter((f) => f);

    return this._groupJoinFilters(allFilters);
  }

  _adaptIndexName(indexName) {
    const sortToken = "/sort/";
    const sortIndex = indexName.indexOf(sortToken);
    if (sortIndex === -1) {
      return indexName;
    }
    return indexName.slice(0, sortIndex);
  }

  _adaptSortBy(indexName) {
    const sortToken = "/sort/";
    const sortIndex = indexName.indexOf(sortToken);
    if (sortIndex === -1) {
      return undefined;
    }
    return indexName.slice(sortIndex + sortToken.length);
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

    const searchRequest = { searches: searches };

    // Add union parameter if configured
    if (this.configuration.union) {
      searchRequest.union = this.configuration.union;
      commonParams.page = searches[0].page;
    }

    return this.typesenseClient.multiSearch.perform(searchRequest, commonParams);
  }
}
