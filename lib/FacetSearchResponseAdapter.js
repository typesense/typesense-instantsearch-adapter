"use strict";

import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { utils } from "./support/utils";
export var FacetSearchResponseAdapter = /*#__PURE__*/function () {
  function FacetSearchResponseAdapter(typesenseResponse, instantsearchRequest) {
    _classCallCheck(this, FacetSearchResponseAdapter);
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
  }
  return _createClass(FacetSearchResponseAdapter, [{
    key: "_adaptFacetHits",
    value: function _adaptFacetHits(typesenseFacetCounts) {
      var _this = this;
      var adaptedResult = [];
      var facet = typesenseFacetCounts.find(function (facet) {
        return facet.field_name === _this.instantsearchRequest.params.facetName;
      });
      if (typeof facet !== "undefined") {
        adaptedResult = facet.counts.map(function (facetCount) {
          return {
            value: facetCount.value,
            highlighted: _this._adaptHighlightTag(facetCount.highlighted, _this.instantsearchRequest.params.highlightPreTag, _this.instantsearchRequest.params.highlightPostTag),
            count: facetCount.count
          };
        });
      }
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
Object.assign(FacetSearchResponseAdapter.prototype, utils);
//# sourceMappingURL=FacetSearchResponseAdapter.js.map