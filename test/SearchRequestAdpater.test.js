import { SearchRequestAdapter } from "../src/SearchRequestAdapter";

describe("SearchRequestAdapter", () => {
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
          "field1:=[289..634] && field2:<=5 && field3:>=3 && field4>numeric-special=characters:and:colon:<=3"
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
          "field1:=[`value1`,`value2`] && field2:with:colons:=[`value3`] && field2:with:colons:=[`value4`]"
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
          "field1:=[`value1`,`value2`] && field2:with:colons:=[`value3`] && field2:with:colons:=[`value4`] && field3:=[`value5:with:colon`] && field4:with:colons:=[`value6:with:colon`]"
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
