"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = void 0;
var utils = {
  _adaptHighlightTag: function _adaptHighlightTag(value) {
    return value.replace(new RegExp("<mark>", "g"), this.instantsearchRequest.params.highlightPreTag).replace(new RegExp("</mark>", "g"), this.instantsearchRequest.params.highlightPostTag);
  },
  _adaptNumberOfPages: function _adaptNumberOfPages() {
    // Todo: Fix - this is a temp workaround, replace hits.length with per_page, to prevent issues when rendering the last page
    var result = this.typesenseResponse.found / this.typesenseResponse.hits.length;

    if (Number.isFinite(result)) {
      return Math.ceil(result);
    } else {
      return 1;
    }
  }
};
exports.utils = utils;
