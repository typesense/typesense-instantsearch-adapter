"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = void 0;
var utils = {
  _adaptHighlightTag: function _adaptHighlightTag(value, highlightPreTag, highlightPostTag) {
    return value.replace(new RegExp("<mark>", "g"), highlightPreTag).replace(new RegExp("</mark>", "g"), highlightPostTag);
  },
  _adaptNumberOfPages: function _adaptNumberOfPages() {
    var result = this.typesenseResponse.found / this.typesenseResponse.request_params.per_page;

    if (Number.isFinite(result)) {
      return Math.ceil(result);
    } else {
      return 1;
    }
  }
};
exports.utils = utils;