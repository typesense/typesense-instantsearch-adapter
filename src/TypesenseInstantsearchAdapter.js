"use strict";

import { Configuration } from "./Configuration";
import Typesense from "typesense";
import { SearchRequestAdapter } from "./SearchRequestAdapter";
import { SearchResponseAdapter } from "./SearchResponseAdapter";
import { FacetSearchRequestAdapter } from "./FacetSearchRequestAdapter";
import { FacetSearchResponseAdapter } from "./FacetSearchResponseAdapter";

export default class TypesenseInstantsearchAdapter {
  constructor(options) {
    this.configuration = new Configuration(options);
    this.configuration.validate();
    this.typesenseClient = new Typesense.Client(this.configuration.server);
    this.searchClient = {
      search: instantsearchRequests =>
        this.searchTypesenseAndAdapt(instantsearchRequests),
      searchForFacetValues: instantsearchRequests =>
        this.searchTypesenseForFacetValuesAndAdapt(instantsearchRequests)
    };
  }

  async searchTypesenseAndAdapt(instantsearchRequests) {
    const adaptedResponses = await instantsearchRequests.map(
      async instantsearchRequest => {
        const requestAdapter = new SearchRequestAdapter(
          instantsearchRequest,
          this.typesenseClient,
          this.configuration.searchByFields
        );
        const typesenseResponse = await requestAdapter.request();
        const responseAdapter = new SearchResponseAdapter(
          typesenseResponse,
          instantsearchRequest
        );
        return responseAdapter.adapt();
      }
    );

    const results = await Promise.all(adaptedResponses);
    return {
      results: results
    };
  }

  async searchTypesenseForFacetValuesAndAdapt(instantsearchRequests) {
    const adaptedResponses = await instantsearchRequests.map(
      async instantsearchRequest => {
        const requestAdapter = new FacetSearchRequestAdapter(
          instantsearchRequest,
          this.typesenseClient,
          this.configuration.searchByFields
        );
        const typesenseResponse = await requestAdapter.request();
        const responseAdapter = new FacetSearchResponseAdapter(
          typesenseResponse,
          instantsearchRequest
        );
        return responseAdapter.adapt();
      }
    );

    const results = await Promise.all(adaptedResponses);
    return results;
  }
}
