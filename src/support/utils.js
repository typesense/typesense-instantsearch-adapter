export const utils = {
  _adaptHighlightTag(value, highlightPreTag, highlightPostTag) {
    return value
      .replace(new RegExp("<mark>", "g"), highlightPreTag)
      .replace(new RegExp("</mark>", "g"), highlightPostTag);
  },
  _adaptNumberOfPages() {
    const result =
      this.typesenseResponse.found /
      this.typesenseResponse.request_params.per_page;
    if (Number.isFinite(result)) {
      return Math.ceil(result);
    } else {
      return 1;
    }
  }
};
