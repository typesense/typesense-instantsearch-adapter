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
});
