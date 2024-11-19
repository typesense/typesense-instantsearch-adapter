"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchRequestAdapter = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _excluded = ["q", "conversation", "conversation_id", "conversation_model_id"];
var SearchRequestAdapter = exports.SearchRequestAdapter = /*#__PURE__*/function () {
  function SearchRequestAdapter(instantsearchRequests, typesenseClient, configuration) {
    (0, _classCallCheck2["default"])(this, SearchRequestAdapter);
    this.instantsearchRequests = instantsearchRequests;
    this.typesenseClient = typesenseClient;
    this.configuration = configuration;
    this.additionalSearchParameters = configuration.additionalSearchParameters;
    this.collectionSpecificSearchParameters = configuration.collectionSpecificSearchParameters;
  }
  return (0, _createClass2["default"])(SearchRequestAdapter, [{
    key: "_shouldUseExactMatchForField",
    value: function _shouldUseExactMatchForField(fieldName, collectionName) {
      var _this$configuration$c, _this$configuration$f;
      if (((_this$configuration$c = this.configuration.collectionSpecificFilterByOptions) === null || _this$configuration$c === void 0 || (_this$configuration$c = _this$configuration$c[collectionName]) === null || _this$configuration$c === void 0 || (_this$configuration$c = _this$configuration$c[fieldName]) === null || _this$configuration$c === void 0 ? void 0 : _this$configuration$c.exactMatch) === false || ((_this$configuration$f = this.configuration.filterByOptions) === null || _this$configuration$f === void 0 || (_this$configuration$f = _this$configuration$f[fieldName]) === null || _this$configuration$f === void 0 ? void 0 : _this$configuration$f.exactMatch) === false) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: "_adaptFacetFilters",
    value: function _adaptFacetFilters(facetFilters, collectionName) {
      var _this = this;
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
            var _this$_parseFacetFilt = _this._parseFacetFilter(facetFilter),
              fieldName = _this$_parseFacetFilt.fieldName,
              fieldValue = _this$_parseFacetFilt.fieldValue;
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
              if (fieldValue.startsWith("-") && !_this._isNumber(fieldValue)) {
                result[0].push(fieldValue.substring(1));
              } else {
                result[1].push(fieldValue);
              }
              return result;
            }, [[], []]),
            _fieldValues$reduce2 = (0, _slicedToArray2["default"])(_fieldValues$reduce, 2),
            excludedFieldValues = _fieldValues$reduce2[0],
            includedFieldValues = _fieldValues$reduce2[1];
          var typesenseFilterStringComponents = [];
          if (includedFieldValues.length > 0) {
            var operator = _this._shouldUseExactMatchForField(fieldName, collectionName) ? ":=" : ":";
            typesenseFilterStringComponents.push("".concat(fieldName).concat(operator, "[").concat(includedFieldValues.map(function (v) {
              return _this._escapeFacetValue(v);
            }).join(","), "]"));
          }
          if (excludedFieldValues.length > 0) {
            var _operator = _this._shouldUseExactMatchForField(fieldName, collectionName) ? ":!=" : ":!";
            typesenseFilterStringComponents.push("".concat(fieldName).concat(_operator, "[").concat(excludedFieldValues.map(function (v) {
              return _this._escapeFacetValue(v);
            }).join(","), "]"));
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

          var _this$_parseFacetFilt2 = _this._parseFacetFilter(item),
            _fieldName = _this$_parseFacetFilt2.fieldName,
            fieldValue = _this$_parseFacetFilt2.fieldValue;
          var _typesenseFilterString;
          if (fieldValue.startsWith("-") && !_this._isNumber(fieldValue)) {
            var _operator2 = _this._shouldUseExactMatchForField(_fieldName, collectionName) ? ":!=" : ":!";
            _typesenseFilterString = "".concat(_fieldName).concat(_operator2, "[").concat(_this._escapeFacetValue(fieldValue.substring(1)), "]");
          } else {
            var _operator3 = _this._shouldUseExactMatchForField(_fieldName, collectionName) ? ":=" : ":";
            _typesenseFilterString = "".concat(_fieldName).concat(_operator3, "[").concat(_this._escapeFacetValue(fieldValue), "]");
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
      var _this$configuration$f2;
      var filterStringMatchingRegex, facetFilterMatches, fieldName, fieldValue;

      // This is helpful when the filter looks like `facetName:with:colons:facetValue:with:colons` and the default regex above parses the filter as `facetName:with:colons:facetValue:with` and `colon`.
      // So if a facetValue can contain a colon, we ask users to pass in all possible facetable fields in `facetableFieldsWithSpecialCharacters` when instantiating the adapter, so we can explicitly match against that.
      if (((_this$configuration$f2 = this.configuration.facetableFieldsWithSpecialCharacters) === null || _this$configuration$f2 === void 0 ? void 0 : _this$configuration$f2.length) > 0) {
        // escape any Regex special characters, source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
        var sanitizedFacetableFieldsWithSpecialCharacters = this.configuration.facetableFieldsWithSpecialCharacters.flat().map(function (f) {
          return f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        });
        filterStringMatchingRegex = new RegExp("^(".concat(sanitizedFacetableFieldsWithSpecialCharacters.join("|"), "):(.*)$"));
        facetFilterMatches = facetFilter.match(filterStringMatchingRegex);
        if (facetFilterMatches != null) {
          fieldName = "".concat(facetFilterMatches[1]);
          fieldValue = "".concat(facetFilterMatches[2]);
          return {
            fieldName: fieldName,
            fieldValue: fieldValue
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
        console.error("[Typesense-Instantsearch-Adapter] Parsing failed for a facet filter `".concat(facetFilter, "` with the Regex `").concat(filterStringMatchingRegex, "`. If you have field names with special characters, be sure to add them to a parameter called `facetableFieldsWithSpecialCharacters` when instantiating the adapter."));
      } else {
        fieldName = "".concat(facetFilterMatches[1]).concat(facetFilterMatches[2]);
        fieldValue = "".concat(facetFilterMatches[3]);
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
    key: "_adaptNumericFilters",
    value: function _adaptNumericFilters(numericFilters) {
      var _this2 = this;
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
        var _this2$_parseNumericF = _this2._parseNumericFilter(filter),
          fieldName = _this2$_parseNumericF.fieldName,
          operator = _this2$_parseNumericF.operator,
          fieldValue = _this2$_parseNumericF.fieldValue;
        filtersHash[fieldName] = filtersHash[fieldName] || {};
        filtersHash[fieldName][operator] = fieldValue;
      });

      // Transform that to:
      //  "field1:=[634..289] && field2:<=5 && field3:>=3"
      var adaptedFilters = [];
      Object.keys(filtersHash).forEach(function (field) {
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
      });
      adaptedResult = adaptedFilters.join(" && ");
      return adaptedResult;
    }
  }, {
    key: "_parseNumericFilter",
    value: function _parseNumericFilter(numericFilter) {
      var _this$configuration$f3;
      var filterStringMatchingRegex, numericFilterMatches;
      var fieldName, operator, fieldValue;

      // The following is helpful when the facetName has special characters like > and the default regex fails to parse it properly.
      // So we ask users to pass in facetable fields in `facetableFieldsWithSpecialCharactersWithSpecialCharacters` when instantiating the adapter, so we can explicitly match against that.
      if (((_this$configuration$f3 = this.configuration.facetableFieldsWithSpecialCharacters) === null || _this$configuration$f3 === void 0 ? void 0 : _this$configuration$f3.length) > 0) {
        // escape any Regex special characters, source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
        var sanitizedFacetableFieldsWithSpecialCharacters = this.configuration.facetableFieldsWithSpecialCharacters.map(function (f) {
          return f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        });
        filterStringMatchingRegex = new RegExp("^(".concat(sanitizedFacetableFieldsWithSpecialCharacters.join("|"), ")(<=|>=|>|<|=)(.*)$"));
        numericFilterMatches = numericFilter.match(filterStringMatchingRegex);
        if (numericFilterMatches != null) {
          // If no matches are found or if the above didn't trigger, fall back to the default regex
          var _numericFilterMatches = numericFilterMatches;
          var _numericFilterMatches2 = (0, _slicedToArray2["default"])(_numericFilterMatches, 4);
          fieldName = _numericFilterMatches2[1];
          operator = _numericFilterMatches2[2];
          fieldValue = _numericFilterMatches2[3];
          return {
            fieldName: fieldName,
            operator: operator,
            fieldValue: fieldValue
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
        console.error("[Typesense-Instantsearch-Adapter] Parsing failed for a numeric filter `".concat(numericFilter, "` with the Regex `").concat(filterStringMatchingRegex, "`. If you have field names with special characters, be sure to add them to a parameter called `facetableFieldsWithSpecialCharacters` when instantiating the adapter."));
      } else {
        var _numericFilterMatches3 = numericFilterMatches;
        var _numericFilterMatches4 = (0, _slicedToArray2["default"])(_numericFilterMatches3, 4);
        fieldName = _numericFilterMatches4[1];
        operator = _numericFilterMatches4[2];
        fieldValue = _numericFilterMatches4[3];
      }
      return {
        fieldName: fieldName,
        operator: operator,
        fieldValue: fieldValue
      };
    }
  }, {
    key: "_adaptGeoFilter",
    value: function _adaptGeoFilter(_ref) {
      var insideBoundingBox = _ref.insideBoundingBox,
        aroundRadius = _ref.aroundRadius,
        aroundLatLng = _ref.aroundLatLng,
        insidePolygon = _ref.insidePolygon;
      // Give this parameter first priority if it exists, since
      if (insideBoundingBox) {
        var x1, y1, x2, y2;
        if (Array.isArray(insideBoundingBox)) {
          var _insideBoundingBox$fl = insideBoundingBox.flat();
          var _insideBoundingBox$fl2 = (0, _slicedToArray2["default"])(_insideBoundingBox$fl, 4);
          x1 = _insideBoundingBox$fl2[0];
          y1 = _insideBoundingBox$fl2[1];
          x2 = _insideBoundingBox$fl2[2];
          y2 = _insideBoundingBox$fl2[3];
        } else {
          var _insideBoundingBox$sp = insideBoundingBox.split(",");
          var _insideBoundingBox$sp2 = (0, _slicedToArray2["default"])(_insideBoundingBox$sp, 4);
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
      return adaptedFilters.filter(function (filter) {
        return filter && filter !== "";
      }).join(" && ");
    }
  }, {
    key: "_adaptIndexName",
    value: function _adaptIndexName(indexName) {
      return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[1];
    }
  }, {
    key: "_adaptSortBy",
    value: function _adaptSortBy(indexName) {
      return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[3];
    }
  }, {
    key: "_adaptFacetBy",
    value: function _adaptFacetBy(facets, collectionName) {
      var _this3 = this;
      return [facets].flat().map(function (facet) {
        var _this3$configuration$;
        if ((_this3$configuration$ = _this3.configuration.collectionSpecificFacetByOptions) !== null && _this3$configuration$ !== void 0 && (_this3$configuration$ = _this3$configuration$[collectionName]) !== null && _this3$configuration$ !== void 0 && _this3$configuration$[facet]) {
          return "".concat(facet).concat(_this3.configuration.collectionSpecificFacetByOptions[collectionName][facet]);
        } else if (_this3.configuration.facetByOptions[facet]) {
          return "".concat(facet).concat(_this3.configuration.facetByOptions[facet]);
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
        var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];
        snakeCasedAdditionalSearchParameters[this._camelToSnakeCase(key)] = value;
      }

      // Override, collection specific parameters
      if (this.collectionSpecificSearchParameters[adaptedCollectionName]) {
        for (var _i2 = 0, _Object$entries2 = Object.entries(this.collectionSpecificSearchParameters[adaptedCollectionName]); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = (0, _slicedToArray2["default"])(_Object$entries2[_i2], 2),
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
      return Object.fromEntries(Object.entries(typesenseSearchParams).filter(function (_ref2) {
        var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
          _ = _ref3[0],
          v = _ref3[1];
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
      var _request = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _this4 = this,
          _searches$,
          _searches$2;
        var searches, commonParams, _searches$3, q, conversation, conversation_id, conversation_model_id;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // console.log(this.instantsearchRequests);
              searches = this.instantsearchRequests.map(function (instantsearchRequest) {
                return _this4._buildSearchParameters(instantsearchRequest);
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
                    modifiedSearchParams = (0, _objectWithoutProperties2["default"])(searchParams, _excluded);
                  return modifiedSearchParams;
                });
              }
              return _context.abrupt("return", this.typesenseClient.multiSearch.perform({
                searches: searches
              }, commonParams));
            case 4:
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
    key: "INDEX_NAME_MATCHING_REGEX",
    get: function get() {
      return new RegExp("^(.+?)(?=(/sort/(.*))|$)");
    }
  }, {
    key: "DEFAULT_FACET_FILTER_STRING_MATCHING_REGEX",
    get: function get() {
      return new RegExp("(.*)((?!:).):(?!:)(.*)");
    }
  }, {
    key: "DEFAULT_NUMERIC_FILTER_STRING_MATCHING_REGEX",
    get: function get() {
      return new RegExp("(.*?)(<=|>=|>|<|=)(.*)");
    }
  }]);
}();
//# sourceMappingURL=SearchRequestAdapter.js.map