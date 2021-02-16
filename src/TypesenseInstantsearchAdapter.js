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
    let typesenseResponse;
    try {
      typesenseResponse = await this._adaptAndPerformTypesenseRequest(
        instantsearchRequests
      );

      const adaptedResponses = typesenseResponse.results.map(
        (typesenseResult, index) => {
          this._validateTypesenseResult(typesenseResult);
          const responseAdapter = new SearchResponseAdapter(
            typesenseResult,
            instantsearchRequests[index]
          );
          return responseAdapter.adapt();
        }
      );

      return {
        results: adaptedResponses
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async searchTypesenseForFacetValuesAndAdapt(instantsearchRequests) {
    let typesenseResponse;
    try {
      typesenseResponse = await this._adaptAndPerformTypesenseRequest(
        instantsearchRequests
      );

      const adaptedResponses = typesenseResponse.results.map(
        (typesenseResult, index) => {
          this._validateTypesenseResult(typesenseResult);
          const responseAdapter = new FacetSearchResponseAdapter(
            typesenseResult,
            instantsearchRequests[index]
          );
          return responseAdapter.adapt();
        }
      );

      return adaptedResponses;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async _adaptAndPerformTypesenseRequest(instantsearchRequests) {
    const requestAdapter = new SearchRequestAdapter(
      instantsearchRequests,
      this.typesenseClient,
      this.configuration.additionalSearchParameters
    );
    const typesenseResponse = await requestAdapter.request();
    return typesenseResponse;
  }

  _validateTypesenseResult(typesenseResult) {
    if (typesenseResult.error) {
      throw new Error(`${typesenseResult.code} - ${typesenseResult.error}`);
    }
    if (!typesenseResult.hits && !typesenseResult.grouped_hits) {
      throw new Error(
        `Did not find any hits. ${typesenseResult.code} - ${typesenseResult.error}`
      );
    }
  }
}
