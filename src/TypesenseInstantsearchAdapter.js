"use strict";

import { Configuration } from "./Configuration";
import { SearchClient as TypesenseSearchClient } from "typesense";
import { SearchRequestAdapter } from "./SearchRequestAdapter";
import { SearchResponseAdapter } from "./SearchResponseAdapter";
import { FacetSearchResponseAdapter } from "./FacetSearchResponseAdapter";

export default class TypesenseInstantsearchAdapter {
  constructor(options) {
    this.configuration = new Configuration(options);
    this.configuration.validate();
    this.typesenseClient = new TypesenseSearchClient(this.configuration.server);
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
        try {
          const typesenseResponse = await this._adaptAndPerformTypesenseRequest(
            instantsearchRequest
          );
          const responseAdapter = new SearchResponseAdapter(
            typesenseResponse,
            instantsearchRequest
          );
          return responseAdapter.adapt();
        } catch (error) {
          console.error(error);
          throw error;
        }
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
        try {
          const typesenseResponse = await this._adaptAndPerformTypesenseRequest(
            instantsearchRequest
          );
          const responseAdapter = new FacetSearchResponseAdapter(
            typesenseResponse,
            instantsearchRequest
          );
          return responseAdapter.adapt();
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    );

    const results = await Promise.all(adaptedResponses);
    return results;
  }

  async _adaptAndPerformTypesenseRequest(instantsearchRequest) {
    const requestAdapter = new SearchRequestAdapter(
      instantsearchRequest,
      this.typesenseClient,
      this.configuration.additionalSearchParameters
    );
    const typesenseResponse = await requestAdapter.request();
    return typesenseResponse;
  }
}
