"use strict";

import { utils } from "./support/utils";
import he from "he";

export class SearchResponseAdapter {
  constructor(typesenseResponse, instantsearchRequest) {
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
  }

  _adaptGroupedHits(typesenseGroupedHits) {
    let adaptedResult = [];

    adaptedResult = typesenseGroupedHits.map(groupedHit =>
      this._adaptHits(groupedHit.hits)
    );

    // adaptedResult is now in the form of [[{}, {}], [{}, {}], ...]
    //  where each element in the outer most array corresponds to a group.
    // We now flatten it to [{}, {}, {}]
    adaptedResult = adaptedResult.flat();

    return adaptedResult;
  }

  _adaptHits(typesenseHits) {
    let adaptedResult = [];
    adaptedResult = typesenseHits.map(typesenseHit => {
      const adaptedHit = {
        ...typesenseHit.document
      };
      adaptedHit.objectID = typesenseHit.document.id;
      adaptedHit._snippetResult = this._adaptHighlightResult(
        typesenseHit,
        "snippet"
      );
      adaptedHit._highlightResult = this._adaptHighlightResult(
        typesenseHit,
        "value"
      );
      return adaptedHit;
    });
    return adaptedResult;
  }

  _adaptHighlightResult(typesenseHit, snippetOrValue) {
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
        value: highlight[snippetOrValue] || highlight[`${snippetOrValue}s`],
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
            value: this._adaptHighlightTag(he.decode(`${v}`)),
            matchLevel: matchLevel, // TODO: Fix MatchLevel for array
            matchedWords: matchedWords // TODO: Fix MatchedWords for array
          });
        });
      } else {
        // Convert all values to strings
        result[attribute].value = this._adaptHighlightTag(
          he.decode(`${value}`)
        );
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

  _adaptFacetStats(typesenseFacetCounts) {
    const adaptedResult = {};
    typesenseFacetCounts.forEach(facet => {
      if (Object.keys(facet.stats).length > 0) {
        Object.assign(adaptedResult, {
          [facet.field_name]: facet.stats
        });
      }
    });
    return adaptedResult;
  }

  adapt() {
    const adaptedResult = {
      hits: this.typesenseResponse.grouped_hits
        ? this._adaptGroupedHits(this.typesenseResponse.grouped_hits)
        : this._adaptHits(this.typesenseResponse.hits),
      nbHits: this.typesenseResponse.found,
      page: this.typesenseResponse.page,
      nbPages: this._adaptNumberOfPages(),
      hitsPerPage: this.typesenseResponse.request_params.per_page,
      facets: this._adaptFacets(this.typesenseResponse.facet_counts || []),
      facets_stats: this._adaptFacetStats(
        this.typesenseResponse.facet_counts || {}
      ),
      query: this.typesenseResponse.request_params.q,
      processingTimeMS: this.typesenseResponse.search_time_ms
    };

    // console.log(adaptedResult);
    return adaptedResult;
  }
}

Object.assign(SearchResponseAdapter.prototype, utils);
