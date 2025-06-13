export const utils = {
  _adaptHighlightTag(value, highlightPreTag, highlightPostTag) {
    return value
      .replace(new RegExp("<mark>", "g"), highlightPreTag || "<mark>")
      .replace(new RegExp("</mark>", "g"), highlightPostTag || "</mark>");
  },
  _adaptNumberOfPages() {
    // For union search, use union_request_params, otherwise use request_params
    const requestParams = this.typesenseResponse.union_request_params
      ? this.typesenseResponse.union_request_params[0]
      : this.typesenseResponse.request_params;

    const perPage = requestParams?.per_page || 10;
    const result = this.typesenseResponse.found / perPage;

    if (Number.isFinite(result)) {
      return Math.ceil(result);
    } else {
      return 1;
    }
  },
};
