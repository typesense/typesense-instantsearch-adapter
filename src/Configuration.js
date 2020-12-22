"use strict";

export class Configuration {
  constructor(options = {}) {
    this.server = options.server || {
      masterNode: {
        host: "localhost",
        port: "8108",
        path: "",
        protocol: "http"
      }
    };

    this.additionalSearchParameters = options.additionalSearchParameters || {};

    this.additionalSearchParameters.queryBy =
      this.additionalSearchParameters.queryBy || "";

    this.additionalSearchParameters.sortBy =
      this.additionalSearchParameters.sortBy || "";

    this.additionalSearchParameters.groupBy =
      this.additionalSearchParameters.groupBy || "";

    this.additionalSearchParameters.perPage =
      this.additionalSearchParameters.perPage || "10";

    this.additionalSearchParameters.highlightFullFields =
      this.additionalSearchParameters.highlightFullFields ||
      this.additionalSearchParameters.queryBy;
  }

  validate() {
    if (this.additionalSearchParameters.queryBy.length === 0) {
      throw new Error(
        "Missing required parameter: additionalSearchParameters.queryBy"
      );
    }
  }
}
