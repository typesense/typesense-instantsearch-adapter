import { SearchRequestAdapter } from "../src/SearchRequestAdapter";
import { Configuration } from "../src/Configuration";

describe("SearchRequestAdapter", () => {
  describe("._buildSearchParameters", () => {
    describe("when sortByOptions are provided", () => {
      it("adapts the given search parameters ", () => {
        // With no sort order
        let subject = new SearchRequestAdapter(
          [],
          null,
          new Configuration({
            sortByOptions: {
              "field1:desc": { enable_overrides: false },
            },
            collectionSpecificSortByOptions: {
              collection2: {
                "field2:asc": { enable_overrides: false },
              },
            },
          }),
        );
        let result = subject._buildSearchParameters({ indexName: "collection1", params: {} });
        expect(result).toEqual({
          collection: "collection1",
          page: 1,
          q: "*",
        });

        // With a matching sort order
        subject = new SearchRequestAdapter(
          [],
          null,
          new Configuration({
            sortByOptions: {
              "field1:desc": { enable_overrides: false },
            },
            collectionSpecificSortByOptions: {
              collection2: {
                "field2:asc": { enable_overrides: false },
              },
            },
          }),
        );
        result = subject._buildSearchParameters({ indexName: "collection1/sort/field1:desc", params: {} });
        expect(result).toEqual({
          collection: "collection1",
          page: 1,
          q: "*",
          sort_by: "field1:desc",
          enable_overrides: false,
        });

        // With a matching sort order, with federated search
        subject = new SearchRequestAdapter(
          [],
          null,
          new Configuration({
            sortByOptions: {
              "field1:desc": { enable_overrides: false },
            },
            collectionSpecificSortByOptions: {
              collection2: {
                "field2:asc": { enable_overrides: false },
              },
            },
          }),
        );
        result = subject._buildSearchParameters({ indexName: "collection2/sort/field2:asc", params: {} });
        expect(result).toEqual({
          collection: "collection2",
          page: 1,
          q: "*",
          sort_by: "field2:asc",
          enable_overrides: false,
        });

        //with curation tags (default for v30+)
        result = subject._buildSearchParameters({
          indexName: "collection2",
          params: { ruleContexts: ["context1", "context2"] },
        });
        expect(result).toEqual({
          collection: "collection2",
          page: 1,
          q: "*",
          curation_tags: "context1,context2",
        });
      });
    });

    describe("when useOverrideTags is true (for pre-v30)", () => {
      it("uses override_tags instead of curation_tags", () => {
        const subject = new SearchRequestAdapter(
          [],
          null,
          new Configuration({
            useOverrideTags: true,
          }),
        );
        const result = subject._buildSearchParameters({
          indexName: "collection1",
          params: { ruleContexts: ["context1", "context2"] },
        });
        expect(result).toEqual({
          collection: "collection1",
          page: 1,
          q: "*",
          override_tags: "context1,context2",
        });
      });
    });
  });

  describe("._adaptNumericFilters", () => {
    describe("when the fieldName doesn't have any numeric operator special characters", () => {
      it("adapts the given numeric filters", () => {
        const subject = new SearchRequestAdapter([], null, {});

        const result = subject._adaptNumericFilters([
          "field1<=634",
          "field1>=289",
          "field2<=5",
          "field3>=3",
          "field4:with:colon.and.dot:<=3",
        ]);
        expect(result).toEqual("field1:=[289..634] && field2:<=5 && field3:>=3 && field4:with:colon.and.dot::<=3");
      });
    });

    describe("when the fieldName has numeric operator special characters", () => {
      it("adapts the given numeric filters, given an additional facetableFieldsWithSpecialCharacters configuration", () => {
        const subject = new SearchRequestAdapter([], null, {
          facetableFieldsWithSpecialCharacters: ["field4>numeric-special=characters:and:colon"],
        });

        const result = subject._adaptNumericFilters([
          "field1<=634",
          "field1>=289",
          "field2<=5",
          "field3>=3",
          "field4>numeric-special=characters:and:colon<=3",
        ]);
        expect(result).toEqual(
          "field1:=[289..634] && field2:<=5 && field3:>=3 && field4>numeric-special=characters:and:colon:<=3",
        );
      });
    });
  });

  describe("._adaptFacetFilters", () => {
    describe("when the fieldName only has colons in the facet name", () => {
      it("adapts the given facet filters", () => {
        const subject = new SearchRequestAdapter([], null, {});

        const result = subject._adaptFacetFilters([
          ["field1:value1", "field1:value2"],
          "field2:with:colons:value3",
          "field2:with:colons:value4",
        ]);
        expect(result).toEqual(
          "field1:=[`value1`,`value2`] && field2:with:colons:=[`value3`] && field2:with:colons:=[`value4`]",
        );
      });
    });
    describe("when the fieldName has colons in the facet value", () => {
      it("adapts the given facet filters, given a configuration called facetableFieldsWithSpecialCharacters ", () => {
        const subject = new SearchRequestAdapter([], null, {
          facetableFieldsWithSpecialCharacters: ["field3", "field4:with:colons"],
        });

        const result = subject._adaptFacetFilters([
          ["field1:value1", "field1:value2"],
          "field2:with:colons:value3",
          "field2:with:colons:value4",
          "field3:value5:with:colon",
          "field4:with:colons:value6:with:colon",
        ]);
        expect(result).toEqual(
          "field1:=[`value1`,`value2`] && field2:with:colons:=[`value3`] && field2:with:colons:=[`value4`] && field3:=[`value5:with:colon`] && field4:with:colons:=[`value6:with:colon`]",
        );
      });
    });
    describe("when exactMatch is disabled", () => {
      it("adapts the given facet filters, given a configuration called filterByOptions ", () => {
        let subject = new SearchRequestAdapter([], null, {
          filterByOptions: {
            field1: { exactMatch: false },
          },
          collectionSpecificFilterByOptions: {
            collection1: {
              field2: { exactMatch: false },
              field4: { exactMatch: false },
            },
          },
        });

        let result = subject._adaptFacetFilters(
          [["field1:value1", "field1:value2"], "field2:value3", "field3:value4", "field4:-value5", "field4:-value6"],
          "collection1",
        );
        expect(result).toEqual(
          "field1:[`value1`,`value2`] && field2:[`value3`] && field3:=[`value4`] && field4:![`value5`] && field4:![`value6`]",
        );

        // Check collection specific settings in more detail
        subject = new SearchRequestAdapter([], null, {
          filterByOptions: {
            field1: { exactMatch: false },
          },
          collectionSpecificFilterByOptions: {
            collection1: {
              field2: { exactMatch: false },
              field4: { exactMatch: false },
            },
          },
        });

        result = subject._adaptFacetFilters(
          [["field1:value1", "field1:value2"], "field2:value3", "field3:value4", "field4:-value5", "field4:-value6"],
          "collection2",
        );
        expect(result).toEqual(
          "field1:[`value1`,`value2`] && field2:=[`value3`] && field3:=[`value4`] && field4:!=[`value5`] && field4:!=[`value6`]",
        );
      });
    });
  });

  describe(".adaptFacetBy", () => {
    it("adapts the given facet names, given a configuration called facetByOptions ", () => {
      const subject = new SearchRequestAdapter([], null, {
        facetByOptions: {
          field1: "(sort_by: _alpha:asc)",
        },
      });

      const result = subject._adaptFacetBy(["field1", "field2"]);
      expect(result).toEqual("field1(sort_by: _alpha:asc),field2");
    });

    it("adapts the given facet names, given a configuration called collectionSpecificFacetByOptions ", () => {
      const subject = new SearchRequestAdapter([], null, {
        facetByOptions: {
          field1: "(sort_by: _alpha:asc)",
        },
        collectionSpecificFacetByOptions: {
          collectionX: {
            field1: "(sort_by: _alpha:desc)",
          },
        },
      });

      const result = subject._adaptFacetBy(["field1", "field2"], "collectionX");
      expect(result).toEqual("field1(sort_by: _alpha:desc),field2");
    });
  });

  describe("._adaptGeoFilter", () => {
    it("adapts the given geo bounding box filter", () => {
      const subject = new SearchRequestAdapter([], null, {
        geoLocationField: "geoField",
      });

      let result = subject._adaptGeoFilter({ insideBoundingBox: "x1,y1,x2,y2" });
      expect(result).toEqual(`geoField:(x1, y1, x1, y2, x2, y2, x2, y1)`);

      result = subject._adaptGeoFilter({ insideBoundingBox: ["x1", "y1", "x2", "y2"] });
      expect(result).toEqual(`geoField:(x1, y1, x1, y2, x2, y2, x2, y1)`);
    });

    it("adapts the given geo aroundLatLng filter", () => {
      const subject = new SearchRequestAdapter([], null, {
        geoLocationField: "geoField",
      });

      expect(() => {
        subject._adaptGeoFilter({ aroundLatLng: "x1,y1" });
      }).toThrowError("filtering around a lat/lng also requires a numerical radius");

      expect(() => {
        subject._adaptGeoFilter({ aroundLatLng: "x1,y1", aroundRadius: "all" });
      }).toThrowError("filtering around a lat/lng also requires a numerical radius");

      const result = subject._adaptGeoFilter({ aroundLatLng: "x1,y1", aroundRadius: 10000 });
      expect(result).toEqual(`geoField:(x1,y1, 10 km)`);
    });

    it("adapts the given geo polygon filter", () => {
      const subject = new SearchRequestAdapter([], null, {
        geoLocationField: "geoField",
      });

      const result = subject._adaptGeoFilter({ insidePolygon: ["x1", "y1", "x2", "y2", "x3", "y3"] });
      expect(result).toEqual(`geoField:(x1,y1,x2,y2,x3,y3)`);
    });
  });
  describe(". _adaptRulesContextsToOverrideTags", () => {
    it("concatenates the rule contexts to a comma separated string", () => {
      const subject = new SearchRequestAdapter([], null, {});

      const result = subject._adaptRulesContextsToOverrideTags(["context1", "context2"]);
      expect(result).toEqual("context1,context2");
    });
  });

  describe("request", () => {
    describe("union search functionality", () => {
      it("includes union parameter in multisearch request when union is true", async () => {
        const mockTypesenseClient = {
          multiSearch: {
            perform: jest.fn().mockResolvedValue({ results: [] }),
          },
        };

        const configuration = new Configuration({
          union: true,
          additionalSearchParameters: {
            query_by: "name",
          },
        });

        const instantsearchRequests = [
          {
            indexName: "products",
            params: { query: "test" },
          },
          {
            indexName: "brands",
            params: { query: "test" },
          },
        ];

        const subject = new SearchRequestAdapter(instantsearchRequests, mockTypesenseClient, configuration);
        await subject.request();

        expect(mockTypesenseClient.multiSearch.perform).toHaveBeenCalledWith(
          {
            union: true,
            searches: [
              {
                collection: "products",
                q: "test",
                page: 1,
                query_by: "name",
                highlight_full_fields: "name",
              },
              {
                collection: "brands",
                q: "test",
                page: 1,
                query_by: "name",
                highlight_full_fields: "name",
              },
            ],
          },
          {
            page: 1,
          },
        );
      });

      it("does not include union parameter in multisearch request when union is false", async () => {
        const mockTypesenseClient = {
          multiSearch: {
            perform: jest.fn().mockResolvedValue({ results: [] }),
          },
        };

        const configuration = new Configuration({
          union: false,
          additionalSearchParameters: {
            query_by: "name",
          },
        });

        const instantsearchRequests = [
          {
            indexName: "products",
            params: { query: "test" },
          },
        ];

        const subject = new SearchRequestAdapter(instantsearchRequests, mockTypesenseClient, configuration);
        await subject.request();

        expect(mockTypesenseClient.multiSearch.perform).toHaveBeenCalledWith(
          {
            searches: [
              {
                collection: "products",
                q: "test",
                page: 1,
                query_by: "name",
                highlight_full_fields: "name",
              },
            ],
          },
          {},
        );
      });

      it("does not include union parameter in multisearch request when union is not configured", async () => {
        const mockTypesenseClient = {
          multiSearch: {
            perform: jest.fn().mockResolvedValue({ results: [] }),
          },
        };

        const configuration = new Configuration({
          additionalSearchParameters: {
            query_by: "name",
          },
        });

        const instantsearchRequests = [
          {
            indexName: "products",
            params: { query: "test" },
          },
        ];

        const subject = new SearchRequestAdapter(instantsearchRequests, mockTypesenseClient, configuration);
        await subject.request();

        expect(mockTypesenseClient.multiSearch.perform).toHaveBeenCalledWith(
          {
            searches: [
              {
                collection: "products",
                q: "test",
                page: 1,
                query_by: "name",
                highlight_full_fields: "name",
              },
            ],
          },
          {},
        );
      });

      it("includes union parameter with conversational search", async () => {
        const mockTypesenseClient = {
          multiSearch: {
            perform: jest.fn().mockResolvedValue({ results: [] }),
          },
        };

        const configuration = new Configuration({
          union: true,
          additionalSearchParameters: {
            query_by: "name",
          },
        });

        const instantsearchRequests = [
          {
            indexName: "products",
            params: { query: "test" },
          },
        ];

        // Mock a search parameter that includes conversation
        const subject = new SearchRequestAdapter(instantsearchRequests, mockTypesenseClient, configuration);
        subject._buildSearchParameters = jest.fn().mockReturnValue({
          collection: "products",
          q: "test",
          page: 1,
          query_by: "name",
          conversation: true,
          conversation_id: "conv_123",
          conversation_model_id: "model_456",
        });

        await subject.request();

        expect(mockTypesenseClient.multiSearch.perform).toHaveBeenCalledWith(
          {
            union: true,
            searches: [
              {
                collection: "products",
                page: 1,
                query_by: "name",
              },
            ],
          },
          {
            q: "test",
            conversation: true,
            conversation_id: "conv_123",
            conversation_model_id: "model_456",
            page: 1,
          },
        );
      });

      it("handles truthy string values for union parameter", async () => {
        const mockTypesenseClient = {
          multiSearch: {
            perform: jest.fn().mockResolvedValue({ results: [] }),
          },
        };

        const configuration = new Configuration({
          union: "true",
          additionalSearchParameters: {
            query_by: "name",
          },
        });

        const instantsearchRequests = [
          {
            indexName: "products",
            params: { query: "test" },
          },
        ];

        const subject = new SearchRequestAdapter(instantsearchRequests, mockTypesenseClient, configuration);
        await subject.request();

        expect(mockTypesenseClient.multiSearch.perform).toHaveBeenCalledWith(
          {
            union: "true",
            searches: [
              {
                collection: "products",
                q: "test",
                page: 1,
                query_by: "name",
                highlight_full_fields: "name",
              },
            ],
          },
          {
            page: 1,
          },
        );
      });
    });
  });
});
