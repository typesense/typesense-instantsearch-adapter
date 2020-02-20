"use strict";

import { Configuration } from "./Configuration";
import Typesense from "typesense";
import { RequestAdapter } from "./RequestAdapter";
import { ResponseAdapter } from "./ResponseAdapter";

export default class TypesenseInstantsearchAdapter {
  constructor(options) {
    this.configuration = new Configuration(options);
    this.configuration.validate();
    this.typesenseClient = new Typesense.Client(this.configuration.server);
    this.searchClient = {
      search: instantsearchRequests =>
        this.searchTypesenseAndAdapt(instantsearchRequests)
    };
  }

  async searchTypesenseAndAdapt(instantsearchRequests) {
    const adaptedResponses = await instantsearchRequests.map(
      async instantsearchRequest => {
        const requestAdapter = new RequestAdapter(
          instantsearchRequest,
          this.typesenseClient,
          this.configuration.searchByFields
        );
        const typesenseResponse = await requestAdapter.request();
        const responseAdapter = new ResponseAdapter(
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
}
