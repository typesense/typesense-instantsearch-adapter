"use strict";

import { Configuration } from "./Configuration";
import { SearchClient as TypesenseSearchClient } from "typesense";
import { SearchRequestAdapter } from "./SearchRequestAdapter";
import { SearchResponseAdapter } from "./SearchResponseAdapter";
import { FacetSearchResponseAdapter } from "./FacetSearchResponseAdapter";

export default class TypesenseInstantsearchAdapter {
  constructor(options) {
    this.updateConfiguration(options);
    this.searchClient = {
      clearCache: () => this.clearCache(),
      search: (instantsearchRequests) => this.searchTypesenseAndAdapt(instantsearchRequests),
      searchForFacetValues: (instantsearchRequests) =>
        this.searchTypesenseForFacetValuesAndAdapt(instantsearchRequests),
    };
  }

  async searchTypesenseAndAdapt(instantsearchRequests) {
    let typesenseResponse;
    try {
      typesenseResponse = await this._adaptAndPerformTypesenseRequest(instantsearchRequests);

      // Check if this is a union search response
      if (typesenseResponse.union_request_params) {
        // Handle union search response - single unified response
        this._validateTypesenseResult(typesenseResponse);
        const responseAdapter = new SearchResponseAdapter(
          typesenseResponse,
          instantsearchRequests[0], // Use first request as base
          this.configuration,
          [typesenseResponse], // Pass single response as allTypesenseResults
          typesenseResponse,
        );
        let adaptedResponse = responseAdapter.adapt();

        // InstantSearch expects one result per request, so return the same adapted response for each request
        const adaptedResponses = instantsearchRequests.map(() => adaptedResponse);

        return {
          results: adaptedResponses,
        };
      } else {
        // Handle regular multi-search response - multiple separate responses
        const adaptedResponses = typesenseResponse.results.map((typesenseResult, index) => {
          this._validateTypesenseResult(typesenseResult);
          const responseAdapter = new SearchResponseAdapter(
            typesenseResult,
            instantsearchRequests[index],
            this.configuration,
            typesenseResponse.results,
            typesenseResponse,
          );
          let adaptedResponse = responseAdapter.adapt();

          return adaptedResponse;
        });

        return {
          results: adaptedResponses,
        };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async searchTypesenseForFacetValuesAndAdapt(instantsearchRequests) {
    let typesenseResponse;
    try {
      typesenseResponse = await this._adaptAndPerformTypesenseRequest(instantsearchRequests);

      const adaptedResponses = typesenseResponse.results.map((typesenseResult, index) => {
        this._validateTypesenseResult(typesenseResult);
        const responseAdapter = new FacetSearchResponseAdapter(
          typesenseResult,
          instantsearchRequests[index],
          this.configuration,
        );
        return responseAdapter.adapt();
      });

      return adaptedResponses;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async _adaptAndPerformTypesenseRequest(instantsearchRequests) {
    const requestAdapter = new SearchRequestAdapter(instantsearchRequests, this.typesenseClient, this.configuration);
    const typesenseResponse = await requestAdapter.request();
    return typesenseResponse;
  }

  clearCache() {
    this.typesenseClient = new TypesenseSearchClient(this.configuration.server);
    return this.searchClient;
  }

  updateConfiguration(options) {
    this.configuration = new Configuration(options);
    this.configuration.validate();
    this.typesenseClient = new TypesenseSearchClient(this.configuration.server);
    return true;
  }

  _validateTypesenseResult(typesenseResult) {
    if (typesenseResult.error) {
      throw new Error(`${typesenseResult.code} - ${typesenseResult.error}`);
    }
    if (!typesenseResult.hits && !typesenseResult.grouped_hits) {
      throw new Error(`Did not find any hits. ${typesenseResult.code} - ${typesenseResult.error}`);
    }
  }
}
