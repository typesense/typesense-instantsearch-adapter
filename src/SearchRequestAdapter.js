"use strict";

export class SearchRequestAdapter {
  constructor(instantsearchRequest, typesenseClient, searchByFields) {
    this.instantsearchRequest = instantsearchRequest;
    this.typesenseClient = typesenseClient;
    this.searchByFields = searchByFields;
  }

  _adaptFacetFilters(facetFilters) {
    let adaptedResult = "";

    if (!facetFilters) {
      return adaptedResult;
    }

    const intermediateFacetFilters = {};

    // Need to transform:
    // faceFilters = [["facet1:value1", "facet1:value2"], "facet2:value3"]]
    //
    // Into this:
    // intermediateFacetFilters = {
    //     "facet1": ["value1", "value2"],
    //     "facet2": ["value1", "value2"]
    // }

    facetFilters.flat().forEach(facetFilter => {
      const [facetName, facetValue] = facetFilter.split(":");
      intermediateFacetFilters[facetName] =
        intermediateFacetFilters[facetName] || [];
      intermediateFacetFilters[facetName].push(facetValue);
    });

    // Need to transform this:
    // intermediateFacetFilters = {
    //     "facet1": ["value1", "value2"],
    //     "facet2": ["value1", "value2"]
    // }
    //
    // Into this:
    // facet1: [value1,value2] && facet2: [value1,value2]

    adaptedResult = Object.keys(intermediateFacetFilters)
      .map(facet => `${facet}: [${intermediateFacetFilters[facet].join(",")}]`)
      .join(" && ");

    return adaptedResult;
  }

  async request() {
    return this.typesenseClient
      .collections(this.instantsearchRequest.indexName)
      .documents()
      .search({
        q:
          this.instantsearchRequest.params.query === ""
            ? "*"
            : this.instantsearchRequest.params.query,
        query_by: this.searchByFields.join(","),
        facet_by: [this.instantsearchRequest.params.facets].flat().join(","),
        filter_by: this._adaptFacetFilters(
          this.instantsearchRequest.params.facetFilters
        ),
        max_facet_values: this.instantsearchRequest.params.maxValuesPerFacet,
        page: this.instantsearchRequest.params.page + 1
      });
  }
}
