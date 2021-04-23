"use strict";

import { utils } from "./support/utils";

export class FacetSearchResponseAdapter {
  constructor(typesenseResponse, instantsearchRequest) {
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
  }

  _adaptFacetHits(typesenseFacetCounts) {
    let adaptedResult = {};
    const facet = typesenseFacetCounts.find((facet) => facet.field_name === this.instantsearchRequest.params.facetName);

    adaptedResult = facet.counts.map((facetCount) => ({
      value: facetCount.value,
      highlighted: this._adaptHighlightTag(
        facetCount.highlighted,
        this.instantsearchRequest.params.highlightPreTag,
        this.instantsearchRequest.params.highlightPostTag
      ),
      count: facetCount.count,
    }));

    return adaptedResult;
  }

  adapt() {
    const adaptedResult = {
      facetHits: this._adaptFacetHits(this.typesenseResponse.facet_counts),
      exhaustiveFacetsCount: true,
      processingTimeMS: this.typesenseResponse.search_time_ms,
    };
    return adaptedResult;
  }
}

Object.assign(FacetSearchResponseAdapter.prototype, utils);
