export var utils = {
  _adaptHighlightTag: function _adaptHighlightTag(value, highlightPreTag, highlightPostTag) {
    return value.replace(new RegExp("<mark>", "g"), highlightPreTag || "<mark>").replace(new RegExp("</mark>", "g"), highlightPostTag || "</mark>");
  },
  _adaptNumberOfPages: function _adaptNumberOfPages() {
    // For union search, use union_request_params, otherwise use request_params
    var requestParams = this.typesenseResponse.union_request_params ? this.typesenseResponse.union_request_params[0] : this.typesenseResponse.request_params;
    var perPage = (requestParams === null || requestParams === void 0 ? void 0 : requestParams.per_page) || 10;
    var result = this.typesenseResponse.found / perPage;
    if (Number.isFinite(result)) {
      return Math.ceil(result);
    } else {
      return 1;
    }
  }
};
//# sourceMappingURL=utils.js.map