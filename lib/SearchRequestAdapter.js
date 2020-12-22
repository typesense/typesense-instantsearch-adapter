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

  function SearchRequestAdapter(instantsearchRequest, typesenseClient, additionalSearchParameters) {
    (0, _classCallCheck2["default"])(this, SearchRequestAdapter);
    this.instantsearchRequest = instantsearchRequest;
    this.typesenseClient = typesenseClient;
    this.additionalSearchParameters = additionalSearchParameters;
  }

  (0, _createClass2["default"])(SearchRequestAdapter, [{
    key: "_adaptBaseFilters",
    value: function _adaptBaseFilters(filters) {
      var adaptedResult = "";

      if (!filters) {
        return adaptedResult;
      }

      var temp = [];
      var intermediateFacetFilters = {};
      var facetFilters = filters.split("AND");
      facetFilters.forEach(function (part) {
        if (part.includes("OR")) {
          var subparts = part.split("OR");
          temp.push(subparts);
        } else {
          temp.push(part);
        }
      });
      temp.flat().forEach(function (facetFilter) {
        var _facetFilter$split = facetFilter.split(":"),
            _facetFilter$split2 = (0, _slicedToArray2["default"])(_facetFilter$split, 2),
            facetName = _facetFilter$split2[0],
            facetValue = _facetFilter$split2[1];

        intermediateFacetFilters[facetName] = intermediateFacetFilters[facetName] || [];
        intermediateFacetFilters[facetName].push(facetValue);
      });
      adaptedResult = Object.entries(intermediateFacetFilters).map(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            facet = _ref2[0],
            values = _ref2[1];

        return "".concat(facet, ":=[").concat(values.join(","), "]");
      }).join(" && ");
      return adaptedResult;
    }
  }, {
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
        var _facetFilter$split3 = facetFilter.split(":"),
            _facetFilter$split4 = (0, _slicedToArray2["default"])(_facetFilter$split3, 2),
            facetName = _facetFilter$split4[0],
            facetValue = _facetFilter$split4[1];

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

      adaptedResult = Object.entries(intermediateFacetFilters).map(function (_ref3) {
        var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
            facet = _ref4[0],
            values = _ref4[1];

        return "".concat(facet, ":=[").concat(values.join(","), "]");
      }).join(" && ");
      return adaptedResult;
    }
  }, {
    key: "_adaptNumericFilters",
    value: function _adaptNumericFilters(numericFilters) {
      var adaptedResult = "";

      if (!numericFilters) {
        return adaptedResult;
      }

      adaptedResult = numericFilters.map(function (numericFilter) {
        return numericFilter.replace(new RegExp("(>|<=)"), ":$1");
      }).join(" && ");
      return adaptedResult;
    }
  }, {
    key: "_adaptFilters",
    value: function _adaptFilters(filters, facetFilters, numericFilters) {
      var adaptedFilters = [];
      adaptedFilters.push(this._adaptBaseFilters(filters));
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
    value: function _buildSearchParameters() {
      var params = this.instantsearchRequest.params;
      var indexName = this.instantsearchRequest.indexName;
      var snakeCasedAdditionalSearchParameters = {};

      for (var _i = 0, _Object$entries = Object.entries(this.additionalSearchParameters); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        snakeCasedAdditionalSearchParameters[this._camelToSnakeCase(key)] = value;
      }

      var typesenseSearchParams = Object.assign({}, snakeCasedAdditionalSearchParameters);
      Object.assign(typesenseSearchParams, {
        q: params.query === "" ? "*" : params.query,
        facet_by: [params.facets].flat().join(","),
        filter_by: this._adaptFilters(params.filters, params.facetFilters, params.numericFilters),
        sort_by: this.additionalSearchParameters.sortBy ? this.additionalSearchParameters.sortBy : this._adaptSortBy(indexName),
        group_by: this.additionalSearchParameters.groupBy,
        per_page: this.additionalSearchParameters.perPage,
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
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.typesenseClient.collections(this._adaptIndexName(this.instantsearchRequest.indexName)).documents().search(this._buildSearchParameters()));

              case 1:
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