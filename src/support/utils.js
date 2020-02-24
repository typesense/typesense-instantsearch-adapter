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
    const result =
      this.typesenseResponse.found / this.typesenseResponse.hits.length;
    if (Number.isFinite(result)) {
      return Math.ceil(result);
    } else {
      return 1;
    }
  }
};
