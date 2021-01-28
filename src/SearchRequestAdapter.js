"use strict";

export class SearchRequestAdapter {
  static get INDEX_NAME_MATCHING_REGEX() {
    return new RegExp("^(.+?)(?=(/sort/(.*))|$)");
  }

  constructor(
    instantsearchRequests,
    typesenseClient,
    additionalSearchParameters
  ) {
    this.instantsearchRequests = instantsearchRequests;
    this.typesenseClient = typesenseClient;
    this.additionalSearchParameters = additionalSearchParameters;
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
      const facetFilterMatches = facetFilter.match(
        new RegExp("(.*)((?!:).):(?!:)(.*)")
      );
      const facetName = `${facetFilterMatches[1]}${facetFilterMatches[2]}`;
      const facetValue = `${facetFilterMatches[3]}`;
      intermediateFacetFilters[facetName] =
        intermediateFacetFilters[facetName] || [];
      intermediateFacetFilters[facetName].push(facetValue);
    });

    // Need to transform this:
    // intermediateFacetFilters = {
    //     "facet1": ["value1", "value2"],
    //     "facet2": ["value1"]
    // }
    //
    // Into this:
    // facet1:=[value1,value2] && facet2:=value1

    adaptedResult = Object.entries(intermediateFacetFilters)
      .map(([facet, values]) => `${facet}:=[${values.join(",")}]`)
      .join(" && ");

    return adaptedResult;
  }

  _adaptNumericFilters(numericFilters) {
    let adaptedResult = "";

    if (!numericFilters) {
      return adaptedResult;
    }

    adaptedResult = numericFilters
      .map(numericFilter => numericFilter.replace(new RegExp("(>|<=)"), ":$1"))
      .join(" && ");

    return adaptedResult;
  }

  _adaptFilters(facetFilters, numericFilters) {
    const adaptedFilters = [];

    adaptedFilters.push(this._adaptFacetFilters(facetFilters));
    adaptedFilters.push(this._adaptNumericFilters(numericFilters));

    return adaptedFilters.filter(filter => filter !== "").join(" && ");
  }

  _adaptIndexName(indexName) {
    return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[1];
  }

  _adaptSortBy(indexName) {
    return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[3];
  }

  _buildSearchParameters(instantsearchRequest) {
    const params = instantsearchRequest.params;
    const indexName = instantsearchRequest.indexName;

    const snakeCasedAdditionalSearchParameters = {};
    for (const [key, value] of Object.entries(
      this.additionalSearchParameters
    )) {
      snakeCasedAdditionalSearchParameters[this._camelToSnakeCase(key)] = value;
    }

    const typesenseSearchParams = Object.assign(
      {},
      snakeCasedAdditionalSearchParameters
    );

    const adaptedSortBy = this._adaptSortBy(indexName);

    Object.assign(typesenseSearchParams, {
      collection: this._adaptIndexName(instantsearchRequest.indexName),
      q: params.query === "" ? "*" : params.query,
      facet_by: [params.facets].flat().join(","),
      filter_by: this._adaptFilters(params.facetFilters, params.numericFilters),
      sort_by: adaptedSortBy || this.additionalSearchParameters.sortBy,
      max_facet_values: params.maxValuesPerFacet,
      page: (params.page || 0) + 1
    });

    if (params.hitsPerPage) {
      typesenseSearchParams.per_page = params.hitsPerPage;
    }

    if (params.facetQuery) {
      typesenseSearchParams.facet_query = `${params.facetName}:${params.facetQuery}`;
      typesenseSearchParams.per_page = 0;
    }

    // console.log(params);
    // console.log(sanitizedParams);

    return typesenseSearchParams;
  }

  _camelToSnakeCase(str) {
    return str
      .split(/(?=[A-Z])/)
      .join("_")
      .toLowerCase();
  }

  async request() {
    const searches = this.instantsearchRequests.map(instantsearchRequest =>
      this._buildSearchParameters(instantsearchRequest)
    );

    return this.typesenseClient.multi_search.perform({ searches: searches });
  }
}
