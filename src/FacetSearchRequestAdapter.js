"use strict";

export class FacetSearchRequestAdapter {
  constructor(instantsearchRequest, typesenseClient, searchByFields) {
    console.log(instantsearchRequest);
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
    const params = this.instantsearchRequest.params;
    const indexName = this.instantsearchRequest.indexName;
    return this.typesenseClient
      .collections(indexName)
      .documents()
      .search({
        q: params.query === "" ? "*" : params.query,
        facet_query: `${params.facetName}:${params.facetQuery}`,
        query_by: this.searchByFields.join(","),
        facet_by: [params.facets].flat().join(","),
        filter_by: this._adaptFacetFilters(params.facetFilters),
        max_facet_values: params.maxValuesPerFacet,
        page: params.page + 1
      });
  }
}
