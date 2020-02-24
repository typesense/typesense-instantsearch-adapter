"use strict";

import { utils } from "./support/utils";

export class SearchResponseAdapter {
  constructor(typesenseResponse, instantsearchRequest) {
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
  }

  _adaptHits(typesenseHits) {
    let adaptedResult = [];
    adaptedResult = typesenseHits.map(typesenseHit => {
      const adaptedHit = {
        ...typesenseHit.document
      };
      adaptedHit.objectID = typesenseHit.document.id;
      adaptedHit._highlightResult = this._adaptHighlightResult(typesenseHit);
      // Todo: Fix Snippets and Highlights
      adaptedHit._snippetResult = adaptedHit._highlightResult;
      return adaptedHit;
    });
    return adaptedResult;
  }

  _adaptHighlightResult(typesenseHit) {
    // Algolia lists all searchable attributes in this key, even if there are no matches
    // So do the same and then override highlights

    const result = Object.assign(
      {},
      ...Object.entries(typesenseHit.document).map(([attribute, value]) => ({
        [attribute]: {
          value: value,
          matchLevel: "none",
          matchedWords: []
        }
      }))
    );

    typesenseHit.highlights.forEach(highlight => {
      result[highlight.field] = {
        value: highlight.snippet,
        matchLevel: "full",
        matchedWords: [] // Todo: Fix MatchedWords
      };
    });

    // Now convert any values that have an array value
    // Also, replace highlight tag
    Object.entries(result).forEach(([k, v]) => {
      const attribute = k;
      const { value, matchLevel, matchedWords } = v;
      if (Array.isArray(value)) {
        result[attribute] = [];
        value.forEach(v => {
          result[attribute].push({
            value: this._adaptHighlightTag(`${v}`),
            matchLevel: matchLevel, // TODO: Fix MatchLevel for array
            matchedWords: matchedWords // TODO: Fix MatchedWords for array
          });
        });
      } else {
        // Convert all values to strings
        result[attribute].value = this._adaptHighlightTag(`${value}`);
      }
    });
    return result;
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
      nbPages: this._adaptNumberOfPages(),
      hitsPerPage: this.typesenseResponse.hits.length,
      facets: this._adaptFacets(this.typesenseResponse.facet_counts || []),
      processingTimeMS: this.typesenseResponse.search_time_ms
    };
    return adaptedResult;
  }
}

Object.assign(SearchResponseAdapter.prototype, utils);
