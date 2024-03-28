"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FacetSearchResponseAdapter = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _utils = require("./support/utils");
var FacetSearchResponseAdapter = exports.FacetSearchResponseAdapter = /*#__PURE__*/function () {
  function FacetSearchResponseAdapter(typesenseResponse, instantsearchRequest) {
    (0, _classCallCheck2["default"])(this, FacetSearchResponseAdapter);
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
  }
  return (0, _createClass2["default"])(FacetSearchResponseAdapter, [{
    key: "_adaptFacetHits",
    value: function _adaptFacetHits(typesenseFacetCounts) {
      var _this = this;
      var adaptedResult = {};
      var facet = typesenseFacetCounts.find(function (facet) {
        return facet.field_name === _this.instantsearchRequest.params.facetName;
      });
      adaptedResult = facet.counts.map(function (facetCount) {
        return {
          value: facetCount.value,
          highlighted: _this._adaptHighlightTag(facetCount.highlighted, _this.instantsearchRequest.params.highlightPreTag, _this.instantsearchRequest.params.highlightPostTag),
          count: facetCount.count
        };
      });
      return adaptedResult;
    }
  }, {
    key: "adapt",
    value: function adapt() {
      var adaptedResult = {
        facetHits: this._adaptFacetHits(this.typesenseResponse.facet_counts),
        exhaustiveFacetsCount: true,
        processingTimeMS: this.typesenseResponse.search_time_ms
      };
      return adaptedResult;
    }
  }]);
}();
Object.assign(FacetSearchResponseAdapter.prototype, _utils.utils);
//# sourceMappingURL=FacetSearchResponseAdapter.js.map