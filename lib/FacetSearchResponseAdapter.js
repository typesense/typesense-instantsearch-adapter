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
    value: function _adaptFacetHits(typesenseFacetCounts) {
      var _this = this;

      var adaptedResult = {};
      var facet = typesenseFacetCounts.find(function (facet) {
        return facet.field_name === _this.instantsearchRequest.params.facetName;
      });
      adaptedResult = facet.counts.map(function (facetCount) {
        return {
          value: facetCount.value,
          highlighted: facetCount.value,
          // TODO: Fix highlighted facet values
          count: facetCount.count
        };
      });
      return adaptedResult;
    }
  }, {
    key: "_adaptNumberOfPages",
    value: function _adaptNumberOfPages() {
      var result = this.typesenseResponse.found / this.typesenseResponse.hits.length;

      if (Number.isFinite(result)) {
        return Math.ceil(result);
      } else {
        return 1;
      }
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
  return FacetSearchResponseAdapter;
}();

exports.FacetSearchResponseAdapter = FacetSearchResponseAdapter;