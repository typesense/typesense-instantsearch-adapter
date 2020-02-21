"use strict";

export class FacetSearchResponseAdapter {
  constructor(typesenseResponse, instantsearchRequest) {
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
  }

  _adaptFacetHits(typesenseFacetCounts) {
    let adaptedResult = {};
    const facet = typesenseFacetCounts.find(
      facet => facet.field_name === this.instantsearchRequest.params.facetName
    );

    adaptedResult = facet.counts.map(facetCount => ({
      value: facetCount.value,
      highlighted: facetCount.value, // TODO: Fix highlighted facet values
      count: facetCount.count
    }));

    return adaptedResult;
  }

  _adaptNumberOfPages() {
    const result =
      this.typesenseResponse.found / this.typesenseResponse.hits.length;
    if (Number.isFinite(result)) {
      return Math.ceil(result);
    } else {
      return 1;
    }
  }

  adapt() {
    const adaptedResult = {
      facetHits: this._adaptFacetHits(this.typesenseResponse.facet_counts),
      exhaustiveFacetsCount: true,
      processingTimeMS: this.typesenseResponse.search_time_ms
    };
    return adaptedResult;
  }
}
