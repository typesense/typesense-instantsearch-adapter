"use strict";

export class Configuration {
  constructor(options = {}) {
    this.server = options.server || {
      nodes: [
        {
          host: "localhost",
          port: "8108",
          path: "",
          protocol: "http",
        },
      ],
    };

    this.server.cacheSearchResultsForSeconds = this.server.cacheSearchResultsForSeconds ?? 2 * 60;

    this.additionalSearchParameters = options.additionalSearchParameters ?? {};

    this.additionalSearchParameters.query_by =
      this.additionalSearchParameters.queryBy ?? this.additionalSearchParameters.query_by ?? "";

    this.additionalSearchParameters.sort_by =
      this.additionalSearchParameters.sortBy ?? this.additionalSearchParameters.sort_by ?? "";

    this.additionalSearchParameters.highlight_full_fields =
      this.additionalSearchParameters.highlightFullFields ??
      this.additionalSearchParameters.highlight_full_fields ??
      this.additionalSearchParameters.query_by;

    this.geoLocationField = options.geoLocationField ?? "_geoloc";

    this.collectionSpecificSearchParameters = options.collectionSpecificSearchParameters ?? {};

    Object.keys(this.collectionSpecificSearchParameters).forEach((collection) => {
      const params = this.collectionSpecificSearchParameters[collection];
      params.query_by = params.queryBy ?? params.query_by;
      params.sort_by = params.sortBy ?? params.sort_by;
      params.highlight_full_fields =
        params.highlightFullFields ??
        params.highlight_full_fields ??
        this.additionalSearchParameters.highlight_full_fields ??
        params.query_by;

      // Remove undefined values
      Object.keys(params).forEach((key) => (params[key] === undefined ? delete params[key] : {}));
    });
  }

  validate() {
    // Warn if camelCased parameters are used, suggest using snake_cased parameters instead
    if (
      this.additionalSearchParameters.queryBy ||
      Object.values(this.collectionSpecificSearchParameters).some((c) => c.queryBy)
    ) {
      console.warn(
        "[typesense-instantsearch-adapter] Please use snake_cased versions of parameters in additionalSearchParameters instead of camelCased parameters. For example: Use query_by instead of queryBy. camelCased parameters will be deprecated in a future version." +
          " We're making this change so that parameter names are identical to the ones sent to Typesense (which are all snake_cased), and to also keep the types for these parameters in sync with the types defined in typesense-js."
      );
    }

    /*
     * Either additionalSearchParameters.query_by needs to be set, or
     *   All collectionSpecificSearchParameters need to have query_by
     *
     * */
    if (
      this.additionalSearchParameters.query_by.length === 0 &&
      (Object.keys(this.collectionSpecificSearchParameters).length === 0 ||
        Object.values(this.collectionSpecificSearchParameters).some((c) => (c.query_by || "").length === 0))
    ) {
      throw new Error(
        "[typesense-instantsearch-adapter] Missing parameter: Either additionalSearchParameters.query_by needs to be set, or all collectionSpecificSearchParameters need to have .query_by set"
      );
    }
  }
}
