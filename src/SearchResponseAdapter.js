"use strict";

import { utils } from "./support/utils";

export class SearchResponseAdapter {
  constructor(typesenseResponse, instantsearchRequest, configuration) {
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
    this.configuration = configuration;
  }

  _adaptGroupedHits(typesenseGroupedHits) {
    let adaptedResult = [];

    adaptedResult = typesenseGroupedHits.map((groupedHit) => {
      const adaptedHits = this._adaptHits(groupedHit.hits);
      adaptedHits.forEach((hit) => (hit["group_key"] = groupedHit.group_key));
      return adaptedHits;
    });

    // adaptedResult is now in the form of [[{}, {}], [{}, {}], ...]
    //  where each element in the outermost array corresponds to a group.
    // We now flatten it to [{}, {}, {}]
    adaptedResult = adaptedResult.flat();

    return adaptedResult;
  }

  _adaptHits(typesenseHits) {
    let adaptedResult = [];
    adaptedResult = typesenseHits.map((typesenseHit) => {
      const adaptedHit = {
        ...typesenseHit.document,
      };
      adaptedHit.objectID = typesenseHit.document.id;
      adaptedHit._snippetResult = this._adaptHighlightResult(typesenseHit, "snippet");
      adaptedHit._highlightResult = this._adaptHighlightResult(typesenseHit, "value");

      // Add metadata fields to result, if a field with that name doesn't already exist
      ["text_match", "geo_distance_meters", "curated", "text_match_info"].forEach((metadataField) => {
        if (Object.keys(typesenseHit).includes(metadataField) && !Object.keys(adaptedHit).includes(metadataField)) {
          adaptedHit[metadataField] = typesenseHit[metadataField];
        }
      });

      const geoLocationValue = adaptedHit[this.configuration.geoLocationField];
      if (geoLocationValue) {
        adaptedHit._geoloc = {
          lat: geoLocationValue[0],
          lng: geoLocationValue[1],
        };
      }

      return adaptedHit;
    });
    return adaptedResult;
  }

  _adaptHighlightResult(typesenseHit, snippetOrValue) {
    const result = {};

    // If there is a highlight object available (as of v0.24.0),
    // And the highlight object uses the highlight format available in v0.24.0.rcn32 and above
    //  use that instead of the highlights array, since it supports highlights of nested fields
    if (typesenseHit.highlight != null && this.isHighlightPost0240RCN32Format(typesenseHit.highlight)) {
      this.adaptHighlightObject(typesenseHit, result, snippetOrValue);
    } else {
      this.adaptHighlightsArray(typesenseHit, result, snippetOrValue);
    }
    return result;
  }

  isHighlightPost0240RCN32Format(highlight) {
    return highlight.full == null && highlight.snippet == null;
  }

  adaptHighlightsArray(typesenseHit, result, snippetOrValue) {
    // Algolia lists all searchable attributes in this key, even if there are no matches
    // So do the same and then override highlights

    Object.assign(
      result,
      ...Object.entries(typesenseHit.document).map(([attribute, value]) => ({
        [attribute]: {
          value: value,
          matchLevel: "none",
          matchedWords: [],
        },
      }))
    );

    typesenseHit.highlights.forEach((highlight) => {
      result[highlight.field] = {
        value: highlight[snippetOrValue] || highlight[`${snippetOrValue}s`],
        matchLevel: "full",
        matchedWords: highlight.matched_tokens,
      };

      if (highlight.indices) {
        result[highlight.field]["matchedIndices"] = highlight.indices;
      }
    });

    // Now convert any values that have an array value
    // Also, replace highlight tag
    Object.entries(result).forEach(([k, v]) => {
      const attribute = k;
      const { value, matchLevel, matchedWords, matchedIndices } = v;
      if (value == null) {
        result[attribute] = this._adaptHighlightNullValue();
      } else if (Array.isArray(value)) {
        // Algolia lists all values of the key in highlights, even those that don't have any highlights
        // So add all values of the array field, including highlights
        result[attribute] = [];
        typesenseHit.document[attribute].forEach((unhighlightedValueFromArray, index) => {
          if (matchedIndices && matchedIndices.includes(index)) {
            result[attribute].push({
              value: this._adaptHighlightTag(
                `${value[matchedIndices.indexOf(index)]}`,
                this.instantsearchRequest.params.highlightPreTag,
                this.instantsearchRequest.params.highlightPostTag
              ),
              matchLevel: matchLevel,
              matchedWords: matchedWords[index],
            });
          } else if (typeof unhighlightedValueFromArray === "object") {
            // Handle arrays of objects
            // Side note: Typesense does not support highlights for nested objects in this `highlights` array,
            //  so we pass in an empty object below
            result[attribute].push(this._adaptHighlightInObjectValue(unhighlightedValueFromArray, {}, snippetOrValue));
          } else {
            result[attribute].push({
              value: `${unhighlightedValueFromArray}`,
              matchLevel: "none",
              matchedWords: [],
            });
          }
        });
      } else if (typeof value === "object") {
        // Handle nested objects
        // Side note: Typesense does not support highlights for nested objects in this `highlights` array,
        //  so we pass in an empty object below
        result[attribute] = this._adaptHighlightInObjectValue(value, {}, snippetOrValue);
      } else {
        // Convert all values to strings
        result[attribute].value = this._adaptHighlightTag(
          `${value}`,
          this.instantsearchRequest.params.highlightPreTag,
          this.instantsearchRequest.params.highlightPostTag
        );
      }
    });
  }

  adaptHighlightObject(typesenseHit, result, snippetOrValue) {
    Object.assign(
      result,
      this._adaptHighlightInObjectValue(typesenseHit.document, typesenseHit.highlight, snippetOrValue)
    );
  }

  _adaptHighlightInObjectValue(objectValue, highlightObjectValue, snippetOrValue) {
    return Object.assign(
      {},
      ...Object.entries(objectValue).map(([attribute, value]) => {
        let adaptedValue;
        if (value == null) {
          adaptedValue = this._adaptHighlightNullValue();
        } else if (Array.isArray(value)) {
          adaptedValue = this._adaptHighlightInArrayValue(
            value,
            highlightObjectValue?.[attribute] ?? [],
            snippetOrValue
          );
        } else if (typeof value === "object") {
          adaptedValue = this._adaptHighlightInObjectValue(
            value,
            highlightObjectValue?.[attribute] ?? {},
            snippetOrValue
          );
        } else {
          adaptedValue = this._adaptHighlightInPrimitiveValue(value, highlightObjectValue?.[attribute], snippetOrValue);
        }

        return {
          [attribute]: adaptedValue,
        };
      })
    );
  }

  _adaptHighlightInArrayValue(arrayValue, highlightArrayValue, snippetOrValue) {
    return arrayValue.map((value, index) => {
      let adaptedValue;
      if (value == null) {
        adaptedValue = this._adaptHighlightNullValue();
      } else if (Array.isArray(value)) {
        adaptedValue = this._adaptHighlightInArrayValue(value, highlightArrayValue?.[index] ?? [], snippetOrValue);
      } else if (typeof value === "object") {
        adaptedValue = this._adaptHighlightInObjectValue(value, highlightArrayValue?.[index] ?? {}, snippetOrValue);
      } else {
        adaptedValue = this._adaptHighlightInPrimitiveValue(value, highlightArrayValue?.[index], snippetOrValue);
      }
      return adaptedValue;
    });
  }

  _adaptHighlightInPrimitiveValue(primitiveValue, highlightPrimitiveValue, snippetOrValue) {
    if (highlightPrimitiveValue != null) {
      return {
        value: this._adaptHighlightTag(
          `${
            highlightPrimitiveValue[snippetOrValue] ??
            highlightPrimitiveValue["highlight"] ??
            highlightPrimitiveValue["snippet"]
          }`,
          this.instantsearchRequest.params.highlightPreTag,
          this.instantsearchRequest.params.highlightPostTag
        ),
        matchLevel: (highlightPrimitiveValue.matched_tokens || []).length > 0 ? "full" : "none",
        matchedWords: highlightPrimitiveValue.matched_tokens || [],
      };
    } else {
      return {
        // Convert all values to strings
        value: this._adaptHighlightTag(
          `${primitiveValue}`,
          this.instantsearchRequest.params.highlightPreTag,
          this.instantsearchRequest.params.highlightPostTag
        ),
        matchLevel: "none",
        matchedWords: [],
      };
    }
  }

  _adaptHighlightNullValue() {
    return {
      value: "",
      matchLevel: "none",
      matchedWords: [],
    };
  }

  _adaptFacets(typesenseFacetCounts) {
    const adaptedResult = {};
    typesenseFacetCounts.forEach((facet) => {
      Object.assign(adaptedResult, {
        [facet.field_name]: Object.assign({}, ...facet.counts.map((count) => ({ [count.value]: count.count }))),
      });
    });
    return adaptedResult;
  }

  _adaptFacetStats(typesenseFacetCounts) {
    const adaptedResult = {};
    typesenseFacetCounts.forEach((facet) => {
      if (Object.keys(facet.stats).length > 0) {
        Object.assign(adaptedResult, {
          [facet.field_name]: facet.stats,
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
      page: this.typesenseResponse.page - 1,
      nbPages: this._adaptNumberOfPages(),
      hitsPerPage: this.typesenseResponse.request_params.per_page,
      facets: this._adaptFacets(this.typesenseResponse.facet_counts || []),
      facets_stats: this._adaptFacetStats(this.typesenseResponse.facet_counts || {}),
      query: this.typesenseResponse.request_params.q,
      processingTimeMS: this.typesenseResponse.search_time_ms,
    };

    // console.log(adaptedResult);
    return adaptedResult;
  }
}

Object.assign(SearchResponseAdapter.prototype, utils);
