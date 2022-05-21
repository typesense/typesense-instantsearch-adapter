"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchRequestAdapter = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var SearchRequestAdapter = /*#__PURE__*/function () {
  function SearchRequestAdapter(instantsearchRequests, typesenseClient, configuration) {
    (0, _classCallCheck2["default"])(this, SearchRequestAdapter);
    this.instantsearchRequests = instantsearchRequests;
    this.typesenseClient = typesenseClient;
    this.configuration = configuration;
    this.additionalSearchParameters = configuration.additionalSearchParameters;
    this.collectionSpecificSearchParameters = configuration.collectionSpecificSearchParameters;
  }

  (0, _createClass2["default"])(SearchRequestAdapter, [{
    key: "_adaptFacetFilters",
    value: function _adaptFacetFilters(facetFilters) {
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
            var facetFilterMatches = facetFilter.match(_this.constructor.FILTER_STRING_MATCHING_REGEX);
            var fieldName = "".concat(facetFilterMatches[1]).concat(facetFilterMatches[2]);
            var fieldValue = "".concat(facetFilterMatches[3]);
            intermediateFacetFilters[fieldName] = intermediateFacetFilters[fieldName] || [];
            intermediateFacetFilters[fieldName].push(fieldValue);
          });

          if (Object.keys(intermediateFacetFilters).length > 1) {
            console.error("[Typesense-Instantsearch-Adapter] Typesense does not support cross-field ORs at the moment. The adapter could not OR values between these fields: ".concat(Object.keys(intermediateFacetFilters).join(",")));
          } // Pick first value from intermediateFacetFilters


          var fieldName = Object.keys(intermediateFacetFilters)[0];
          var fieldValues = intermediateFacetFilters[fieldName]; // Need to transform:
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
            typesenseFilterStringComponents.push("".concat(fieldName, ":=[").concat(includedFieldValues.map(function (v) {
              return _this._escapeFacetValue(v);
            }).join(","), "]"));
          }

          if (excludedFieldValues.length > 0) {
            typesenseFilterStringComponents.push("".concat(fieldName, ":!=[").concat(excludedFieldValues.map(function (v) {
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
          var facetFilterMatches = item.match(_this.constructor.FILTER_STRING_MATCHING_REGEX);

          var _fieldName = "".concat(facetFilterMatches[1]).concat(facetFilterMatches[2]);

          var fieldValue = "".concat(facetFilterMatches[3]);

          var _typesenseFilterString;

          if (fieldValue.startsWith("-") && !_this._isNumber(fieldValue)) {
            _typesenseFilterString = "".concat(_fieldName, ":!=[").concat(_this._escapeFacetValue(fieldValue.substring(1)), "]");
          } else {
            _typesenseFilterString = "".concat(_fieldName, ":=[").concat(_this._escapeFacetValue(fieldValue), "]");
          }

          return _typesenseFilterString;
        }
      });
      adaptedResult = transformedTypesenseFilters.join(" && "); // console.log(`${JSON.stringify(facetFilters)} => ${adaptedResult}`);

      return adaptedResult;
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
      return Number.isInteger(value % 1) || // Mod 1 will automatically try converting string values to integer/float
      !!(value % 1); // Is Float
    }
  }, {
    key: "_adaptNumericFilters",
    value: function _adaptNumericFilters(numericFilters) {
      // Need to transform this:
      // ["field1<=634", "field1>=289", "field2<=5", "field3>=3"]
      // to:
      // "field1:=[634..289] && field2:<=5 && field3:>=3"
      var adaptedResult = "";

      if (!numericFilters) {
        return adaptedResult;
      } // Transform to intermediate structure:
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
        var _filter$match = filter.match(new RegExp("(.*?)(<=|>=|>|<|:|=)(.*)")),
            _filter$match2 = (0, _slicedToArray2["default"])(_filter$match, 4),
            field = _filter$match2[1],
            operator = _filter$match2[2],
            value = _filter$match2[3];

        filtersHash[field] = filtersHash[field] || {};
        filtersHash[field][operator] = value;
      }); // Transform that to:
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
    value: function _adaptFilters(instantsearchParams) {
      var adaptedFilters = []; // `filters` can be used with the `Configure` widget
      // However the format needs to be in the Typesense filter_by format, instead of Algolia filter format.

      if (instantsearchParams.filters) {
        adaptedFilters.push(instantsearchParams.filters);
      }

      adaptedFilters.push(this._adaptFacetFilters(instantsearchParams.facetFilters));
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
    key: "_buildSearchParameters",
    value: function _buildSearchParameters(instantsearchRequest) {
      var params = instantsearchRequest.params;
      var indexName = instantsearchRequest.indexName;

      var adaptedCollectionName = this._adaptIndexName(indexName); // Convert all common parameters to snake case


      var snakeCasedAdditionalSearchParameters = {};

      for (var _i = 0, _Object$entries = Object.entries(this.additionalSearchParameters); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        snakeCasedAdditionalSearchParameters[this._camelToSnakeCase(key)] = value;
      } // Override, collection specific parameters


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
        facet_by: [params.facets].flat().join(","),
        filter_by: this._adaptFilters(params) || snakeCasedAdditionalSearchParameters.filter_by,
        sort_by: adaptedSortBy || snakeCasedAdditionalSearchParameters.sort_by,
        max_facet_values: params.maxValuesPerFacet,
        page: (params.page || 0) + 1
      });

      if (params.hitsPerPage) {
        typesenseSearchParams.per_page = params.hitsPerPage;
      }

      if (params.facetQuery) {
        typesenseSearchParams.facet_query = "".concat(params.facetName, ":").concat(params.facetQuery);
        typesenseSearchParams.per_page = 0;
      } // console.log(params);
      // console.log(typesenseSearchParams);


      return typesenseSearchParams;
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
        var _this2 = this;

        var searches;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                searches = this.instantsearchRequests.map(function (instantsearchRequest) {
                  return _this2._buildSearchParameters(instantsearchRequest);
                });
                return _context.abrupt("return", this.typesenseClient.multiSearch.perform({
                  searches: searches
                }));

              case 2:
              case "end":
                return _context.stop();
            }
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
    key: "FILTER_STRING_MATCHING_REGEX",
    get: function get() {
      return new RegExp("(.*)((?!:).):(?!:)(.*)");
    }
  }]);
  return SearchRequestAdapter;
}();

exports.SearchRequestAdapter = SearchRequestAdapter;
//# sourceMappingURL=SearchRequestAdapter.js.map