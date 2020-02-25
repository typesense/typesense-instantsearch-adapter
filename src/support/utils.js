export const utils = {
  _adaptHighlightTag(value) {
    return value
      .replace(
        new RegExp("<mark>", "g"),
        this.instantsearchRequest.params.highlightPreTag
      )
      .replace(
        new RegExp("</mark>", "g"),
        this.instantsearchRequest.params.highlightPostTag
      );
  },
  _adaptNumberOfPages() {
    // Todo: Fix - this is a temp hack, replace hits.length with per_page, to prevent issues when rendering the last page
    const result =
      this.typesenseResponse.found / this.typesenseResponse.hits.length;
    if (Number.isFinite(result)) {
      return Math.ceil(result);
    } else {
      return 1;
    }
  }
};
