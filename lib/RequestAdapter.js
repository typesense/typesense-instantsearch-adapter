"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestAdapter = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RequestAdapter =
/*#__PURE__*/
function () {
  function RequestAdapter(instantsearchRequest, typesenseClient, searchByFields) {
    (0, _classCallCheck2["default"])(this, RequestAdapter);
    this.instantsearchRequest = instantsearchRequest;
    this.typesenseClient = typesenseClient;
    this.searchByFields = searchByFields;
  }

  (0, _createClass2["default"])(RequestAdapter, [{
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
        var _facetFilter$split = facetFilter.split(":"),
            _facetFilter$split2 = (0, _slicedToArray2["default"])(_facetFilter$split, 2),
            facetName = _facetFilter$split2[0],
            facetValue = _facetFilter$split2[1];

        intermediateFacetFilters[facetName] = intermediateFacetFilters[facetName] || [];
        intermediateFacetFilters[facetName].push(facetValue);
      }); // Need to transform this:
      // intermediateFacetFilters = {
      //     "facet1": ["value1", "value2"],
      //     "facet2": ["value1", "value2"]
      // }
      //
      // Into this:
      // facet1: [value1,value2] && facet2: [value1,value2]

      adaptedResult = Object.keys(intermediateFacetFilters).map(function (facet) {
        return "".concat(facet, ": [").concat(intermediateFacetFilters[facet].join(","), "]");
      }).join(" && ");
      return adaptedResult;
    }
  }, {
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.typesenseClient.collections(this.instantsearchRequest.indexName).documents().search({
                  q: this.instantsearchRequest.params.query === "" ? "*" : this.instantsearchRequest.params.query,
                  query_by: this.searchByFields.join(","),
                  facet_by: [this.instantsearchRequest.params.facets].flat().join(","),
                  filter_by: this._adaptFacetFilters(this.instantsearchRequest.params.facetFilters),
                  max_facet_values: this.instantsearchRequest.params.maxValuesPerFacet,
                  page: this.instantsearchRequest.params.page + 1
                }));

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
  return RequestAdapter;
}();

exports.RequestAdapter = RequestAdapter;
//# sourceMappingURL=RequestAdapter.js.map