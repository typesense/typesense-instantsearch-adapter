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

    this.searchByFields = options.searchByFields || [];
    this.maxHits = options.maxHits;
  }

  validate() {
    if (this.searchByFields.length === 0) {
      throw new Error("Missing required parameter: searchByFields");
    }
  }
}
