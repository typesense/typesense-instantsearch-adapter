"use strict";

export class ResponseAdapter {
  constructor(typesenseResponse) {
    this.typesenseResponse = typesenseResponse;
  }

  _adaptHits(typesenseHits) {
    let adaptedResult = [];
    adaptedResult = typesenseHits.map(typesenseHit => {
      const adaptedHit = {
        ...typesenseHit.document
      };
      adaptedHit.objectID = typesenseHit.document.id;

      // Algolia lists all searchable attributes in this key, even if there are no matches
      // So do the same and then override highlights
      adaptedHit._highlightResult = Object.assign(
        {},
        ...Object.keys(typesenseHit.document).map(attribute => ({
          [attribute]: {
            value: typesenseHit.document[attribute],
            matchLevel: "none",
            matchedWords: []
          }
        }))
      );
      typesenseHit.highlights.forEach(highlight => {
        adaptedHit._highlightResult[highlight.field] = {
          value: highlight.snippet,
          matchLevel: "full",
          matchedWords: [] // Todo: Fix MatchedWords
        };
      });
      // Todo: Fix Snippets and Highlights
      adaptedHit._snippetResult = adaptedHit._highlightResult;
      return adaptedHit;
    });
    return adaptedResult;
  }

  _adaptFacets(typesenseFacetCounts) {
    const adaptedResult = {};
    typesenseFacetCounts.forEach(facet => {
      Object.assign(adaptedResult, {
        [facet.field_name]: Object.assign(
          {},
          ...facet.counts.map(count => ({ [count.value]: count.count }))
        )
      });
    });
    return adaptedResult;
  }

  adapt() {
    const adaptedResult = {
      hits: this._adaptHits(this.typesenseResponse.hits),
      nbHits: this.typesenseResponse.found,
      page: this.typesenseResponse.page,
      nbPages: Math.ceil(
        this.typesenseResponse.found / this.typesenseResponse.hits.length
      ),
      hitsPerPage: this.typesenseResponse.hits.length,
      facets: this._adaptFacets(this.typesenseResponse.facet_counts),
      processingTimeMS: this.typesenseResponse.search_time_ms
    };
    return adaptedResult;
  }
}
