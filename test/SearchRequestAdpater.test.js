import { SearchRequestAdapter } from "../src/SearchRequestAdapter";

describe("SearchRequestAdapter", () => {
  describe("._adaptNumericFilters", () => {
    it("adapts the given numeric filters", done => {
      const subject = new SearchRequestAdapter();

      const result = subject._adaptNumericFilters([
        "field1<=634",
        "field1>=289",
        "field2<=5",
        "field3>=3"
      ]);
      expect(result).toEqual("field1:=[289..634] && field2:<=5 && field3:>=3");
      done();
    });
  });
});
