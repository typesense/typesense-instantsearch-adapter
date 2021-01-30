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
  (0, _createClass2["default"])(SearchRequestAdapter, null, [{
    key: "INDEX_NAME_MATCHING_REGEX",
    get: function get() {
      return new RegExp("^(.+?)(?=(/sort/(.*))|$)");
    }
  }]);

  function SearchRequestAdapter(instantsearchRequests, typesenseClient, additionalSearchParameters) {
    (0, _classCallCheck2["default"])(this, SearchRequestAdapter);
    this.instantsearchRequests = instantsearchRequests;
    this.typesenseClient = typesenseClient;
    this.additionalSearchParameters = additionalSearchParameters;
  }

  (0, _createClass2["default"])(SearchRequestAdapter, [{
    key: "_adaptFacetFilters",
    value: function _adaptFacetFilters(facetFilters) {
      var adaptedResult = "";

      if (!facetFilters) {
        return adaptedResult;
      }

      var intermediateFacetFilters = {}; // Need to transform:
      // faceFilters = [["facet1:value1", "facet1:value2"], "facet2:value3"]]
      //
      // Into this:
      // intermediateFacetFilters = {
      //     "facet1": ["value1", "value2"],
      //     "facet2": ["value1", "value2"]
      // }

      facetFilters.flat().forEach(function (facetFilter) {
        var facetFilterMatches = facetFilter.match(new RegExp("(.*)((?!:).):(?!:)(.*)"));
        var facetName = "".concat(facetFilterMatches[1]).concat(facetFilterMatches[2]);
        var facetValue = "".concat(facetFilterMatches[3]);
        intermediateFacetFilters[facetName] = intermediateFacetFilters[facetName] || [];
        intermediateFacetFilters[facetName].push(facetValue);
      }); // Need to transform this:
      // intermediateFacetFilters = {
      //     "facet1": ["value1", "value2"],
      //     "facet2": ["value1"]
      // }
      //
      // Into this:
      // facet1:=[value1,value2] && facet2:=value1

      adaptedResult = Object.entries(intermediateFacetFilters).map(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            facet = _ref2[0],
            values = _ref2[1];

        return "".concat(facet, ":=[").concat(values.join(","), "]");
      }).join(" && ");
      return adaptedResult;
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
        var _filter$match = filter.match(new RegExp("(.*)(<=|>=|>|<|:)(.*)")),
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
        } else {
          console.warn("Unsupported operator found ".concat(JSON.stringify(filtersHash[field])));
        }
      });
      adaptedResult = adaptedFilters.join(" && ");
      return adaptedResult;
    }
  }, {
    key: "_adaptFilters",
    value: function _adaptFilters(facetFilters, numericFilters) {
      var adaptedFilters = [];
      adaptedFilters.push(this._adaptFacetFilters(facetFilters));
      adaptedFilters.push(this._adaptNumericFilters(numericFilters));
      return adaptedFilters.filter(function (filter) {
        return filter !== "";
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
      var snakeCasedAdditionalSearchParameters = {};

      for (var _i = 0, _Object$entries = Object.entries(this.additionalSearchParameters); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        snakeCasedAdditionalSearchParameters[this._camelToSnakeCase(key)] = value;
      }

      var typesenseSearchParams = Object.assign({}, snakeCasedAdditionalSearchParameters);

      var adaptedSortBy = this._adaptSortBy(indexName);

      Object.assign(typesenseSearchParams, {
        collection: this._adaptIndexName(instantsearchRequest.indexName),
        q: params.query === "" ? "*" : params.query,
        facet_by: [params.facets].flat().join(","),
        filter_by: this._adaptFilters(params.facetFilters, params.numericFilters),
        sort_by: adaptedSortBy || this.additionalSearchParameters.sortBy,
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
      // console.log(sanitizedParams);


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
        var _this = this;

        var searches;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                searches = this.instantsearchRequests.map(function (instantsearchRequest) {
                  return _this._buildSearchParameters(instantsearchRequest);
                });
                return _context.abrupt("return", this.typesenseClient.multi_search.perform({
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
  }]);
  return SearchRequestAdapter;
}();

exports.SearchRequestAdapter = SearchRequestAdapter;