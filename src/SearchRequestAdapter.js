"use strict";

export class SearchRequestAdapter {
  static get INDEX_NAME_MATCHING_REGEX() {
    return new RegExp("^(.+?)(?=(/sort/(.*))|$)");
  }

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

  _adaptIndexName(indexName) {
    console.log(indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX));
    return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[1];
  }

  _adaptSortBy(indexName) {
    return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[3];
  }

  async request() {
    console.log(this.instantsearchRequest);
    const indexName = this.instantsearchRequest.indexName;
    const params = this.instantsearchRequest.params;
    return this.typesenseClient
      .collections(this._adaptIndexName(indexName))
      .documents()
      .search({
        q: params.query === "" ? "*" : params.query,
        query_by: this.searchByFields.join(","),
        facet_by: [params.facets].flat().join(","),
        filter_by: this._adaptFacetFilters(params.facetFilters),
        sort_by: this._adaptSortBy(indexName),
        max_facet_values: params.maxValuesPerFacet,
        page: params.page + 1
      });
  }
}
