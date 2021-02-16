describe("Search Experience", () => {
  beforeAll(require("./support/beforeAll"), 60 * 1000);

  beforeEach(async () => {
    return page.goto("http://localhost:3000");
  }, 10 * 1000);

  describe("when searching for a term", () => {
    beforeEach(async () => {
      return expect(page).toFill("#autocomplete input", "Charger");
    });

    it("renders autocomplete results", async () => {
      return expect(page).toMatchElement("#autocomplete .autocomplete-list", {
        text: "Insignia™ - 17W Vehicle Charger with 2 USB Ports"
      });
    });
  });
});
