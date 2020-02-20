"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FacetSearchResponseAdapter = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var FacetSearchResponseAdapter =
/*#__PURE__*/
function () {
  function FacetSearchResponseAdapter(typesenseResponse, instantsearchRequest) {
    (0, _classCallCheck2["default"])(this, FacetSearchResponseAdapter);
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
  }

  (0, _createClass2["default"])(FacetSearchResponseAdapter, [{
    key: "_adaptFacetHits",
    value: function _adaptFacetHits(typesenseHits) {
      // TODO: Fix facet search response adaptation
      return [];
    }
  }, {
    key: "adapt",
    value: function adapt() {
      var adaptedResult = {
        facetHits: this._adaptFacetHits(this.typesenseResponse.hits),
        nbHits: this.typesenseResponse.found,
        page: this.typesenseResponse.page,
        nbPages: Math.ceil(this.typesenseResponse.found / this.typesenseResponse.hits.length),
        hitsPerPage: this.typesenseResponse.hits.length,
        processingTimeMS: this.typesenseResponse.search_time_ms
      };
      console.log(adaptedResult);
      return adaptedResult;
    }
  }]);
  return FacetSearchResponseAdapter;
}();

exports.FacetSearchResponseAdapter = FacetSearchResponseAdapter;
//# sourceMappingURL=FacetSearchResponseAdapter.js.map