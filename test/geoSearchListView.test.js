describe("Federated Search", () => {
  beforeAll(require("./support/beforeAll"), 60 * 1000);

  beforeEach(async () => {
    return page.goto("http://localhost:3000/federated_search.html");
  }, 30 * 1000);

  describe("when searching for a term", () => {
    beforeEach(async () => {
      return expect(page).toFill("#searchbox input[type=search]", "Charger");
    });

    it("renders the results across multiple indices", async () => {
      await expect(page).toMatchElement("#product-stats", {
        text: "294 results found",
      });
      await expect(page).toMatchElement("#product-hits .ais-Hits-item:nth-of-type(1) .hit-name", {
        text: "Charger",
      });
      await expect(page).toMatchElement("#brand-stats", {
        text: "2 results found",
      });
      return await expect(page).toMatchElement("#brand-hits .ais-Hits-item:nth-of-type(1) .hit-name", {
        text: "ChargeHub",
      });
    });
  });
});
