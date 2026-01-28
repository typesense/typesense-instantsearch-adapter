"use strict";

import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
var _excluded = ["q", "conversation", "conversation_id", "conversation_model_id"];
import _regeneratorRuntime from "@babel/runtime/regenerator";
export var SearchRequestAdapter = /*#__PURE__*/function () {
  function SearchRequestAdapter(instantsearchRequests, typesenseClient, configuration) {
    _classCallCheck(this, SearchRequestAdapter);
    this.instantsearchRequests = instantsearchRequests;
    this.typesenseClient = typesenseClient;
    this.configuration = configuration;
    this.additionalSearchParameters = configuration.additionalSearchParameters;
    this.collectionSpecificSearchParameters = configuration.collectionSpecificSearchParameters;
  }
  return _createClass(SearchRequestAdapter, [{
    key: "_shouldUseExactMatchForField",
    value: function _shouldUseExactMatchForField(fieldName, collectionName) {
      var _this$configuration$c, _this$configuration$f;
      if (((_this$configuration$c = this.configuration.collectionSpecificFilterByOptions) === null || _this$configuration$c === void 0 || (_this$configuration$c = _this$configuration$c[collectionName]) === null || _this$configuration$c === void 0 || (_this$configuration$c = _this$configuration$c[fieldName]) === null || _this$configuration$c === void 0 ? void 0 : _this$configuration$c.exactMatch) === false || ((_this$configuration$f = this.configuration.filterByOptions) === null || _this$configuration$f === void 0 || (_this$configuration$f = _this$configuration$f[fieldName]) === null || _this$configuration$f === void 0 ? void 0 : _this$configuration$f.exactMatch) === false) {
        return false;
      } else {
        return true;
      }
    }

    /**
     * Returns the configured list of field names that may include delimiters.
     * Always returns a flat array so callers can treat it uniformly.
     */
  }, {
    key: "_getFacetableFieldsWithSpecialCharacters",
    value: function _getFacetableFieldsWithSpecialCharacters() {
      var fields = this.configuration.facetableFieldsWithSpecialCharacters;
      if (!Array.isArray(fields)) {
        return [];
      }
      return fields.flat();
    }

    /**
     * Finds the best matching field name at the start of `filter`.
     * Uses the provided delimiter check so it works for both facets and numeric filters.
     */
  }, {
    key: "_matchFieldNameWithDelimiter",
    value: function _matchFieldNameWithDelimiter(filter, fields, isDelimiterAtIndex) {
      var matches = fields.filter(function (fieldName) {
        return filter.startsWith(fieldName) && isDelimiterAtIndex(fieldName.length);
      }).map(function (fieldName) {
        return {
          fieldName: fieldName,
          delimiterIndex: fieldName.length
        };
      });
      if (matches.length === 0) {
        return null;
      }
      return matches.reduce(function (best, current) {
        return current.fieldName.length > best.fieldName.length ? current : best;
      });
    }

    /**
     * Returns the index of the first ":" that is not inside backticks.
     */
  }, {
    key: "_findFacetDelimiterIndex",
    value: function _findFacetDelimiterIndex(filter) {
      var inBacktick = false;
      for (var i = 0; i < filter.length; i += 1) {
        var character = filter[i];
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
  }, {
    key: "_findLastFacetDelimiterIndex",
    value: function _findLastFacetDelimiterIndex(filter) {
      var inBacktick = false;
      var lastIndex = -1;
      for (var i = 0; i < filter.length; i += 1) {
        var character = filter[i];
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
  }, {
    key: "_findNumericOperator",
    value: function _findNumericOperator(filter) {
      var operators = SearchRequestAdapter.NUMERIC_OPERATORS;
      var inBacktick = false;
      var index = Array.from(filter).findIndex(function (character, i) {
        if (character === "`") {
          inBacktick = !inBacktick;
        }
        if (inBacktick) {
          return false;
        }
        return operators.some(function (operator) {
          return filter.startsWith(operator, i);
        });
      });
      if (index === -1) {
        return null;
      }
      var operator = operators.find(function (op) {
        return filter.startsWith(op, index);
      });
      return {
        index: index,
        operator: operator
      };
    }

    /**
     * Parses "$collection(field.path)" (or "!$collection(field.path)").
     * Example: "$product_prices(retailer)" -> { collection: "product_prices", fieldPath: "retailer" }
     * Returns null if the string is not a join field.
     * @param {string} fieldName
     */
  }, {
    key: "_parseJoinFieldName",
    value: function _parseJoinFieldName(fieldName) {
      var trimmed = fieldName.trim();
      if (!(trimmed.startsWith("$") || trimmed.startsWith("!$"))) {
        return null;
      }
      var collectionStart = trimmed.startsWith("!$") ? 2 : 1;
      var openParenIndex = trimmed.indexOf("(", collectionStart);
      if (openParenIndex === -1) {
        return null;
      }
      var parenCount = 0;
      var closeParenIndex = -1;
      for (var i = openParenIndex; i < trimmed.length; i += 1) {
        var character = trimmed[i];
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
      var collection = trimmed.slice(0, openParenIndex).trim();
      var fieldPath = trimmed.slice(openParenIndex + 1, closeParenIndex).trim();
      if (!collection || !fieldPath) {
        return null;
      }
      return {
        collection: collection,
        fieldPath: fieldPath
      };
    }

    /**
     * Parses "$collection(innerFilter)" (or "!$collection(innerFilter)").
     * Example: "$product_prices(retailer:=[`value1`])" -> { collection: "product_prices", innerFilter: "retailer:=[`value1`]" }
     * Returns null if the filter is not a join filter string or parsing fails.
     * @param {string} filter
     */
  }, {
    key: "_parseJoinFilterString",
    value: function _parseJoinFilterString(filter) {
      var trimmed = filter.trim();
      if (!(trimmed.startsWith("$") || trimmed.startsWith("!$"))) {
        return null;
      }
      var collectionStartsAfterCharIndex = trimmed.startsWith("!$") ? 2 : 1;
      var openParenIndex = trimmed.indexOf("(", collectionStartsAfterCharIndex);
      if (openParenIndex === -1) {
        return null;
      }
      var parenCount = 0;
      var closeParenIndex = -1;
      for (var i = openParenIndex; i < trimmed.length; i += 1) {
        var character = trimmed[i];
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
      var collection = trimmed.slice(0, openParenIndex).trim();
      var innerFilter = trimmed.slice(openParenIndex + 1, closeParenIndex).trim();
      if (!collection || !innerFilter) {
        return null;
      }
      return {
        collection: collection,
        innerFilter: innerFilter
      };
    }
  }, {
    key: "_buildFacetFilterString",
    value: function _buildFacetFilterString(_ref) {
      var _this = this;
      var fieldName = _ref.fieldName,
        fieldValues = _ref.fieldValues,
        isExcluded = _ref.isExcluded,
        collectionName = _ref.collectionName;
      // Check if this is a joined relation filter (e.g., "$refCollection(retailer)")
      var joinedRelationMatch = this._parseJoinFieldName(fieldName);
      var operator = isExcluded ? this._shouldUseExactMatchForField(fieldName, collectionName) ? ":!=" : ":!" : this._shouldUseExactMatchForField(fieldName, collectionName) ? ":=" : ":";
      if (joinedRelationMatch) {
        // This is a joined relation filter
        var collection = joinedRelationMatch.collection,
          fieldPath = joinedRelationMatch.fieldPath; // e.g., "$refCollection", "retailer"
        // For joined relations, the filter should be: $collection(field:=[value1,value2])
        return "".concat(collection, "(").concat(fieldPath).concat(operator, "[").concat(fieldValues.map(function (v) {
          return _this._escapeFacetValue(v);
        }).join(","), "])");
      } else {
        // Regular field filter (non-joined)
        return "".concat(fieldName).concat(operator, "[").concat(fieldValues.map(function (v) {
          return _this._escapeFacetValue(v);
        }).join(","), "]");
      }
    }
  }, {
    key: "_adaptFacetFilters",
    value: function _adaptFacetFilters(facetFilters, collectionName) {
      var _this2 = this;
      var adaptedResult = "";
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

      var transformedTypesenseFilters = facetFilters.map(function (item) {
        if (Array.isArray(item)) {
          // Need to transform:
          // facetFilters = ["field1:value1", "field1:value2", "facetN:valueN"]
          //
          // Into this:
          // intermediateFacetFilters = {
          //     "field1": ["value1", "value2"],
          //     "fieldN": ["valueN"]
          // }

          var intermediateFacetFilters = {};
          item.forEach(function (facetFilter) {
            var _this2$_parseFacetFil = _this2._parseFacetFilter(facetFilter),
              fieldName = _this2$_parseFacetFil.fieldName,
              fieldValue = _this2$_parseFacetFil.fieldValue;
            intermediateFacetFilters[fieldName] = intermediateFacetFilters[fieldName] || [];
            intermediateFacetFilters[fieldName].push(fieldValue);
          });
          if (Object.keys(intermediateFacetFilters).length > 1) {
            console.error("[Typesense-Instantsearch-Adapter] Typesense does not support cross-field ORs at the moment. The adapter could not OR values between these fields: ".concat(Object.keys(intermediateFacetFilters).join(",")));
          }

          // Pick first value from intermediateFacetFilters
          var fieldName = Object.keys(intermediateFacetFilters)[0];
          var fieldValues = intermediateFacetFilters[fieldName];

          // Need to transform:
          // intermediateFacetFilters = {
          //     "field1": ["value1", "value2"],
          // }
          //
          // Into this:
          // field1:=[value1,value2]

          // Partition values into included and excluded values
          var _fieldValues$reduce = fieldValues.reduce(function (result, fieldValue) {
              if (fieldValue.startsWith("-") && !_this2._isNumber(fieldValue)) {
                result[0].push(fieldValue.substring(1));
              } else {
                result[1].push(fieldValue);
              }
              return result;
            }, [[], []]),
            _fieldValues$reduce2 = _slicedToArray(_fieldValues$reduce, 2),
            excludedFieldValues = _fieldValues$reduce2[0],
            includedFieldValues = _fieldValues$reduce2[1];
          var typesenseFilterStringComponents = [];
          if (includedFieldValues.length > 0) {
            typesenseFilterStringComponents.push(_this2._buildFacetFilterString({
              fieldName: fieldName,
              fieldValues: includedFieldValues,
              isExcluded: false,
              collectionName: collectionName
            }));
          }
          if (excludedFieldValues.length > 0) {
            typesenseFilterStringComponents.push(_this2._buildFacetFilterString({
              fieldName: fieldName,
              fieldValues: excludedFieldValues,
              isExcluded: true,
              collectionName: collectionName
            }));
          }
          var typesenseFilterString = typesenseFilterStringComponents.filter(function (f) {
            return f;
          }).join(" && ");
          return typesenseFilterString;
        } else {
          // Need to transform:
          //  fieldName:fieldValue
          // Into
          //  fieldName:=fieldValue

          var _this2$_parseFacetFil2 = _this2._parseFacetFilter(item),
            _fieldName = _this2$_parseFacetFil2.fieldName,
            fieldValue = _this2$_parseFacetFil2.fieldValue;
          var _typesenseFilterString;
          if (fieldValue.startsWith("-") && !_this2._isNumber(fieldValue)) {
            _typesenseFilterString = _this2._buildFacetFilterString({
              fieldName: _fieldName,
              fieldValues: [fieldValue.substring(1)],
              isExcluded: true,
              collectionName: collectionName
            });
          } else {
            _typesenseFilterString = _this2._buildFacetFilterString({
              fieldName: _fieldName,
              fieldValues: [fieldValue],
              isExcluded: false,
              collectionName: collectionName
            });
          }
          return _typesenseFilterString;
        }
      });
      adaptedResult = transformedTypesenseFilters.join(" && ");
      // console.log(`${JSON.stringify(facetFilters)} => ${adaptedResult}`);

      return adaptedResult;
    }
  }, {
    key: "_parseFacetFilter",
    value: function _parseFacetFilter(facetFilter) {
      var fieldName, fieldValue;

      // This is helpful when the filter looks like `facetName:with:colons:facetValue:with:colons` and a naive split would parse it as `facetName:with:colons:facetValue:with` and `colon`.
      // So if a facetValue can contain a colon, we ask users to pass in all possible facetable fields in `facetableFieldsWithSpecialCharacters` when instantiating the adapter, so we can explicitly match against that.
      var facetableFieldsWithSpecialCharacters = this._getFacetableFieldsWithSpecialCharacters();
      if (facetableFieldsWithSpecialCharacters.length > 0) {
        var matched = this._matchFieldNameWithDelimiter(facetFilter, facetableFieldsWithSpecialCharacters, function (index) {
          return facetFilter[index] === ":";
        });
        if (matched) {
          fieldName = matched.fieldName;
          fieldValue = facetFilter.slice(matched.delimiterIndex + 1);
          return {
            fieldName: fieldName,
            fieldValue: fieldValue
          };
        }
      }

      // If we haven't found any matches yet, check if this is a join filter
      // JOIN filters have the format "$collection(field):value" or "!$collection(field):value" (https://typesense.org/docs/latest/api/search.html#facet-referencing)
      // for join filters, we need to find the colon after the closing parenthesis, not use the last colon
      if (facetFilter.startsWith("$") || facetFilter.startsWith("!$")) {
        var collectionStartsAfterCharIndex = facetFilter.startsWith("!$") ? 2 : 1;
        var openParenIndex = facetFilter.indexOf("(", collectionStartsAfterCharIndex);
        if (openParenIndex !== -1) {
          // find the matching closing parenthesis
          var parenCount = 0;
          var closeParenIndex = -1;
          for (var i = openParenIndex; i < facetFilter.length; i += 1) {
            var character = facetFilter[i];
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
            var colonAfterJoin = facetFilter.indexOf(":", closeParenIndex + 1);
            if (colonAfterJoin !== -1) {
              fieldName = facetFilter.slice(0, colonAfterJoin).trim();
              fieldValue = facetFilter.slice(colonAfterJoin + 1).trim();
              return {
                fieldName: fieldName,
                fieldValue: fieldValue
              };
            }
          }
        }
      }

      // use a scan that assumes field names may have colons so we use the last colon as the delimiter.
      // handles cases like "field2:with:colons:value3" where the field name is "field2:with:colons". (edge case, not sure if this is supported by the server)
      var delimiterIndex = this._findLastFacetDelimiterIndex(facetFilter);
      if (delimiterIndex === -1) {
        console.error("[Typesense-Instantsearch-Adapter] Parsing failed for a facet filter `".concat(facetFilter, "`. If you have field names with special characters, add them to a parameter called `facetableFieldsWithSpecialCharacters` when instantiating the adapter."));
      } else {
        fieldName = facetFilter.slice(0, delimiterIndex).trim();
        fieldValue = facetFilter.slice(delimiterIndex + 1).trim();
      }
      return {
        fieldName: fieldName,
        fieldValue: fieldValue
      };
    }
  }, {
    key: "_escapeFacetValue",
    value: function _escapeFacetValue(value) {
      // Don't escape booleans, integers or floats
      if (typeof value === "boolean" || value === "true" || value === "false" || this._isNumber(value)) {
        return value;
      }
      return "`".concat(value, "`");
    }
  }, {
    key: "_isNumber",
    value: function _isNumber(value) {
      return Number.isInteger(value % 1) ||
      // Mod 1 will automatically try converting string values to integer/float
      !!(value % 1); // Is Float
    }
  }, {
    key: "_groupJoinFilters",
    value: function _groupJoinFilters(filters) {
      var _this3 = this;
      // Group join filters by their collection name
      // Example: ["$product_prices(retailer:=[`value1`])", "$product_prices(status:=[`active`])", "brand:=[`Apple`]"]
      // Should become: ["$product_prices(retailer:=[`value1`] && status:=[`active`])", "brand:=[`Apple`]"]

      var joinFiltersMap = {};
      var regularFilters = [];
      filters.forEach(function (filter) {
        var joinMatch = _this3._parseJoinFilterString(filter);
        if (joinMatch) {
          var collection = joinMatch.collection,
            innerFilter = joinMatch.innerFilter;
          if (!joinFiltersMap[collection]) {
            joinFiltersMap[collection] = [];
          }
          joinFiltersMap[collection].push(innerFilter);
        } else {
          regularFilters.push(filter);
        }
      });

      // Rebuild grouped join filters
      var groupedJoinFilters = Object.keys(joinFiltersMap).map(function (collection) {
        var innerFilters = joinFiltersMap[collection].join(" && ");
        return "".concat(collection, "(").concat(innerFilters, ")");
      });

      // Combine grouped join filters with regular filters
      return [].concat(_toConsumableArray(groupedJoinFilters), regularFilters).filter(function (f) {
        return f;
      }).join(" && ");
    }
  }, {
    key: "_adaptNumericFilters",
    value: function _adaptNumericFilters(numericFilters) {
      var _this4 = this;
      // Need to transform this:
      // ["field1<=634", "field1>=289", "field2<=5", "field3>=3"]
      // to:
      // "field1:=[634..289] && field2:<=5 && field3:>=3"
      var adaptedResult = "";
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
      var filtersHash = {};
      numericFilters.forEach(function (filter) {
        var _this4$_parseNumericF = _this4._parseNumericFilter(filter),
          fieldName = _this4$_parseNumericF.fieldName,
          operator = _this4$_parseNumericF.operator,
          fieldValue = _this4$_parseNumericF.fieldValue;
        filtersHash[fieldName] = filtersHash[fieldName] || {};
        filtersHash[fieldName][operator] = fieldValue;
      });

      // Transform that to:
      //  "field1:=[634..289] && field2:<=5 && field3:>=3"
      var adaptedFilters = [];
      Object.keys(filtersHash).forEach(function (field) {
        // Check if this is a joined relation filter (e.g., "$refCollection(price.current)")
        var joinedRelationMatch = _this4._parseJoinFieldName(field);
        if (joinedRelationMatch) {
          // This is a joined relation filter
          var collection = joinedRelationMatch.collection,
            fieldPath = joinedRelationMatch.fieldPath; // e.g., "$refCollection", "price.current"

          if (filtersHash[field]["<="] != null && filtersHash[field][">="] != null) {
            adaptedFilters.push("".concat(collection, "(").concat(fieldPath, ":=[").concat(filtersHash[field][">="], "..").concat(filtersHash[field]["<="], "])"));
          } else if (filtersHash[field]["<="] != null) {
            adaptedFilters.push("".concat(collection, "(").concat(fieldPath, ":<=").concat(filtersHash[field]["<="], ")"));
          } else if (filtersHash[field][">="] != null) {
            adaptedFilters.push("".concat(collection, "(").concat(fieldPath, ":>=").concat(filtersHash[field][">="], ")"));
          } else if (filtersHash[field]["="] != null) {
            adaptedFilters.push("".concat(collection, "(").concat(fieldPath, ":=").concat(filtersHash[field]["="], ")"));
          } else {
            console.warn("[Typesense-Instantsearch-Adapter] Unsupported operator found ".concat(JSON.stringify(filtersHash[field])));
          }
        } else {
          // Regular field filter (non-joined)
          if (filtersHash[field]["<="] != null && filtersHash[field][">="] != null) {
            adaptedFilters.push("".concat(field, ":=[").concat(filtersHash[field][">="], "..").concat(filtersHash[field]["<="], "]"));
          } else if (filtersHash[field]["<="] != null) {
            adaptedFilters.push("".concat(field, ":<=").concat(filtersHash[field]["<="]));
          } else if (filtersHash[field][">="] != null) {
            adaptedFilters.push("".concat(field, ":>=").concat(filtersHash[field][">="]));
          } else if (filtersHash[field]["="] != null) {
            adaptedFilters.push("".concat(field, ":=").concat(filtersHash[field]["="]));
          } else {
            console.warn("[Typesense-Instantsearch-Adapter] Unsupported operator found ".concat(JSON.stringify(filtersHash[field])));
          }
        }
      });
      adaptedResult = adaptedFilters.join(" && ");
      return adaptedResult;
    }
  }, {
    key: "_parseNumericFilter",
    value: function _parseNumericFilter(numericFilter) {
      var fieldName, operator, fieldValue;

      // The following is helpful when the facetName has special characters like > and a naive operator scan would parse it improperly.
      // So we ask users to pass in facetable fields in `facetableFieldsWithSpecialCharactersWithSpecialCharacters` when instantiating the adapter, so we can explicitly match against that.
      var facetableFieldsWithSpecialCharacters = this._getFacetableFieldsWithSpecialCharacters();
      if (facetableFieldsWithSpecialCharacters.length > 0) {
        var matched = this._matchFieldNameWithDelimiter(numericFilter, facetableFieldsWithSpecialCharacters, function () {
          return true;
        });
        if (matched) {
          var remainder = numericFilter.slice(matched.delimiterIndex);
          var trimmedRemainder = remainder.trimStart();
          var leadingTrimOffset = remainder.length - trimmedRemainder.length;
          var _opMatch = this._findNumericOperator(trimmedRemainder);
          if (_opMatch && _opMatch.index === 0) {
            var operatorIndex = matched.delimiterIndex + leadingTrimOffset;
            fieldName = numericFilter.slice(0, operatorIndex).trim();
            operator = _opMatch.operator;
            fieldValue = trimmedRemainder.slice(_opMatch.operator.length).trim();
            return {
              fieldName: fieldName,
              operator: operator,
              fieldValue: fieldValue
            };
          }
        }
      }

      // If we haven't found any matches yet, fall back to scanning for an operator.
      var opMatch = this._findNumericOperator(numericFilter);
      if (!opMatch) {
        console.error("[Typesense-Instantsearch-Adapter] Parsing failed for a numeric filter `".concat(numericFilter, "`. If you have field names with special characters, be sure to add them to a parameter called `facetableFieldsWithSpecialCharacters` when instantiating the adapter."));
      } else {
        fieldName = numericFilter.slice(0, opMatch.index).trim();
        operator = opMatch.operator;
        fieldValue = numericFilter.slice(opMatch.index + opMatch.operator.length).trim();
      }
      return {
        fieldName: fieldName,
        operator: operator,
        fieldValue: fieldValue
      };
    }
  }, {
    key: "_adaptGeoFilter",
    value: function _adaptGeoFilter(_ref2) {
      var insideBoundingBox = _ref2.insideBoundingBox,
        aroundRadius = _ref2.aroundRadius,
        aroundLatLng = _ref2.aroundLatLng,
        insidePolygon = _ref2.insidePolygon;
      // Give this parameter first priority if it exists, since
      if (insideBoundingBox) {
        var x1, y1, x2, y2;
        if (Array.isArray(insideBoundingBox)) {
          var _insideBoundingBox$fl = insideBoundingBox.flat();
          var _insideBoundingBox$fl2 = _slicedToArray(_insideBoundingBox$fl, 4);
          x1 = _insideBoundingBox$fl2[0];
          y1 = _insideBoundingBox$fl2[1];
          x2 = _insideBoundingBox$fl2[2];
          y2 = _insideBoundingBox$fl2[3];
        } else {
          var _insideBoundingBox$sp = insideBoundingBox.split(",");
          var _insideBoundingBox$sp2 = _slicedToArray(_insideBoundingBox$sp, 4);
          x1 = _insideBoundingBox$sp2[0];
          y1 = _insideBoundingBox$sp2[1];
          x2 = _insideBoundingBox$sp2[2];
          y2 = _insideBoundingBox$sp2[3];
        }
        return "".concat(this.configuration.geoLocationField, ":(").concat(x1, ", ").concat(y1, ", ").concat(x1, ", ").concat(y2, ", ").concat(x2, ", ").concat(y2, ", ").concat(x2, ", ").concat(y1, ")");
      }
      if (aroundLatLng || aroundRadius) {
        if (!aroundRadius || aroundRadius === "all") {
          throw new Error("[Typesense-Instantsearch-Adapter] In Typesense, geo-filtering around a lat/lng also requires a numerical radius. " + "So the `aroundRadius` parameter is required when `aroundLatLng` is used. " + "If you intend to just geo-sort around a lat/long, you want to use the sortBy InstantSearch widget (or a virtual sortBy custom widget).");
        }
        var adaptedAroundRadius = "".concat(parseFloat(aroundRadius) / 1000, " km"); // aroundRadius is in meters
        return "".concat(this.configuration.geoLocationField, ":(").concat(aroundLatLng, ", ").concat(adaptedAroundRadius, ")");
      }
      if (insidePolygon) {
        var coordinates = insidePolygon;
        if (Array.isArray(insidePolygon)) {
          coordinates = insidePolygon.flat().join(",");
        }
        return "".concat(this.configuration.geoLocationField, ":(").concat(coordinates, ")");
      }
    }
  }, {
    key: "_adaptFilters",
    value: function _adaptFilters(instantsearchParams, collectionName) {
      var adaptedFilters = [];

      // `filters` can be used with the `Configure` widget
      // However the format needs to be in the Typesense filter_by format, instead of Algolia filter format.
      if (instantsearchParams.filters) {
        adaptedFilters.push(instantsearchParams.filters);
      }
      adaptedFilters.push(this._adaptFacetFilters(instantsearchParams.facetFilters, collectionName));
      adaptedFilters.push(this._adaptNumericFilters(instantsearchParams.numericFilters));
      adaptedFilters.push(this._adaptGeoFilter(instantsearchParams));

      // Filter out empty strings, split by && to get individual filters, then group join filters
      var allFilters = adaptedFilters.filter(function (filter) {
        return filter && filter !== "";
      }).flatMap(function (filter) {
        return filter.split(" && ").map(function (f) {
          return f.trim();
        });
      }).filter(function (f) {
        return f;
      });
      return this._groupJoinFilters(allFilters);
    }
  }, {
    key: "_adaptIndexName",
    value: function _adaptIndexName(indexName) {
      var sortToken = "/sort/";
      var sortIndex = indexName.indexOf(sortToken);
      if (sortIndex === -1) {
        return indexName;
      }
      return indexName.slice(0, sortIndex);
    }
  }, {
    key: "_adaptSortBy",
    value: function _adaptSortBy(indexName) {
      var sortToken = "/sort/";
      var sortIndex = indexName.indexOf(sortToken);
      if (sortIndex === -1) {
        return undefined;
      }
      return indexName.slice(sortIndex + sortToken.length);
    }
  }, {
    key: "_adaptFacetBy",
    value: function _adaptFacetBy(facets, collectionName) {
      var _this5 = this;
      return [facets].flat().map(function (facet) {
        var _this5$configuration$;
        if ((_this5$configuration$ = _this5.configuration.collectionSpecificFacetByOptions) !== null && _this5$configuration$ !== void 0 && (_this5$configuration$ = _this5$configuration$[collectionName]) !== null && _this5$configuration$ !== void 0 && _this5$configuration$[facet]) {
          return "".concat(facet).concat(_this5.configuration.collectionSpecificFacetByOptions[collectionName][facet]);
        } else if (_this5.configuration.facetByOptions[facet]) {
          return "".concat(facet).concat(_this5.configuration.facetByOptions[facet]);
        } else {
          return facet;
        }
      }).join(",");
    }
  }, {
    key: "_adaptRulesContextsToOverrideTags",
    value: function _adaptRulesContextsToOverrideTags(ruleContexts) {
      return ruleContexts.join(",");
    }
  }, {
    key: "_buildSearchParameters",
    value: function _buildSearchParameters(instantsearchRequest) {
      var _this$configuration$c2, _this$configuration$s;
      var params = instantsearchRequest.params;
      var indexName = instantsearchRequest.indexName;
      var adaptedCollectionName = this._adaptIndexName(indexName);

      // Convert all common parameters to snake case
      var snakeCasedAdditionalSearchParameters = {};
      for (var _i = 0, _Object$entries = Object.entries(this.additionalSearchParameters); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];
        snakeCasedAdditionalSearchParameters[this._camelToSnakeCase(key)] = value;
      }

      // Override, collection specific parameters
      if (this.collectionSpecificSearchParameters[adaptedCollectionName]) {
        for (var _i2 = 0, _Object$entries2 = Object.entries(this.collectionSpecificSearchParameters[adaptedCollectionName]); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            _key = _Object$entries2$_i[0],
            _value = _Object$entries2$_i[1];
          snakeCasedAdditionalSearchParameters[this._camelToSnakeCase(_key)] = _value;
        }
      }
      var typesenseSearchParams = Object.assign({}, snakeCasedAdditionalSearchParameters);
      var adaptedSortBy = this._adaptSortBy(indexName);
      Object.assign(typesenseSearchParams, {
        collection: adaptedCollectionName,
        q: params.query === "" || params.query === undefined ? "*" : params.query,
        facet_by: snakeCasedAdditionalSearchParameters.facet_by || this._adaptFacetBy(params.facets, adaptedCollectionName),
        filter_by: this._adaptFilters(params, adaptedCollectionName) || snakeCasedAdditionalSearchParameters.filter_by,
        sort_by: adaptedSortBy || snakeCasedAdditionalSearchParameters.sort_by,
        max_facet_values: params.maxValuesPerFacet,
        page: (params.page || 0) + 1
      });
      if (params.hitsPerPage != null) {
        typesenseSearchParams.per_page = params.hitsPerPage;
      }
      if (params.facetQuery) {
        typesenseSearchParams.facet_query = "".concat(params.facetName, ":").concat(params.facetQuery);
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
      var sortByOption = ((_this$configuration$c2 = this.configuration.collectionSpecificSortByOptions) === null || _this$configuration$c2 === void 0 || (_this$configuration$c2 = _this$configuration$c2[adaptedCollectionName]) === null || _this$configuration$c2 === void 0 ? void 0 : _this$configuration$c2[typesenseSearchParams["sort_by"]]) || ((_this$configuration$s = this.configuration.sortByOptions) === null || _this$configuration$s === void 0 ? void 0 : _this$configuration$s[typesenseSearchParams["sort_by"]]);
      if ((sortByOption === null || sortByOption === void 0 ? void 0 : sortByOption["enable_overrides"]) != null) {
        typesenseSearchParams["enable_overrides"] = sortByOption["enable_overrides"];
      }

      // console.log(params);
      // console.log(typesenseSearchParams);

      // Filter out empty or null values, so we don't accidentally override values set in presets
      // eslint-disable-next-line no-unused-vars
      return Object.fromEntries(Object.entries(typesenseSearchParams).filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          _ = _ref4[0],
          v = _ref4[1];
        return v != null && v !== "";
      }));
    }
  }, {
    key: "_camelToSnakeCase",
    value: function _camelToSnakeCase(str) {
      return str.split(/(?=[A-Z])/).join("_").toLowerCase();
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _this6 = this,
          _searches$,
          _searches$2;
        var searches, commonParams, _searches$3, q, conversation, conversation_id, conversation_model_id, searchRequest;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // console.log(this.instantsearchRequests);
              searches = this.instantsearchRequests.map(function (instantsearchRequest) {
                return _this6._buildSearchParameters(instantsearchRequest);
              }); // If this is a conversational search, then move conversation related params to query params
              commonParams = {};
              if (((_searches$ = searches[0]) === null || _searches$ === void 0 ? void 0 : _searches$.conversation) === true || ((_searches$2 = searches[0]) === null || _searches$2 === void 0 ? void 0 : _searches$2.conversation) === "true") {
                _searches$3 = searches[0], q = _searches$3.q, conversation = _searches$3.conversation, conversation_id = _searches$3.conversation_id, conversation_model_id = _searches$3.conversation_model_id;
                commonParams = {
                  q: q,
                  conversation: conversation,
                  conversation_id: conversation_id,
                  conversation_model_id: conversation_model_id
                };
                searches = searches.map(function (searchParams) {
                  // eslint-disable-next-line no-unused-vars
                  var q = searchParams.q,
                    conversation = searchParams.conversation,
                    conversation_id = searchParams.conversation_id,
                    conversation_model_id = searchParams.conversation_model_id,
                    modifiedSearchParams = _objectWithoutProperties(searchParams, _excluded);
                  return modifiedSearchParams;
                });
              }
              searchRequest = {
                searches: searches
              }; // Add union parameter if configured
              if (this.configuration.union) {
                searchRequest.union = this.configuration.union;
                commonParams.page = searches[0].page;
              }
              return _context.abrupt("return", this.typesenseClient.multiSearch.perform(searchRequest, commonParams));
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function request() {
        return _request.apply(this, arguments);
      }
      return request;
    }()
  }], [{
    key: "NUMERIC_OPERATORS",
    get: function get() {
      return ["<=", ">=", "<", ">", "="];
    }
  }]);
}();
//# sourceMappingURL=SearchRequestAdapter.js.map