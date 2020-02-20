"use strict";

export class FacetSearchResponseAdapter {
  constructor(typesenseResponse, instantsearchRequest) {
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
  }

  _adaptFacetHits(typesenseHits) {
    // TODO: Fix facet search response adaptation
    return [];
  }

  adapt() {
    const adaptedResult = {
      facetHits: this._adaptFacetHits(this.typesenseResponse.hits),
      nbHits: this.typesenseResponse.found,
      page: this.typesenseResponse.page,
      nbPages: Math.ceil(
        this.typesenseResponse.found / this.typesenseResponse.hits.length
      ),
      hitsPerPage: this.typesenseResponse.hits.length,
      processingTimeMS: this.typesenseResponse.search_time_ms
    };
    console.log(adaptedResult);
    return adaptedResult;
  }
}
