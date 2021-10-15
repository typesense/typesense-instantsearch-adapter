describe("Negative Faceting", () => {
  beforeAll(require("./support/beforeAll"), 60 * 1000);

  describe("for a single value", () => {
    beforeEach(async () => {
      return page.goto("http://localhost:3000/negative_faceting.html");
    }, 30 * 1000);

    it("renders the results, facets and pagination", async () => {
      await expect(page).toMatchElement("#stats", {
        text: "911 results found",
      });
      return await expect(page).not.toMatchElement("body", {
        text: "cinnamon",
      });
    });
  });
  describe("for multiple values", () => {
    beforeEach(async () => {
      return page.goto("http://localhost:3000/negative_faceting.html?array");
    }, 30 * 1000);

    it("renders the results, facets and pagination", async () => {
      await expect(page).toMatchElement("#stats", {
        text: "29 results found",
      });
      await expect(page).not.toMatchElement("body", {
        text: "Cheddar cheese",
      });
      await expect(page).not.toMatchElement("body", {
        text: "Tater",
      });
      return await expect(page).toMatchElement("body", {
        text: "bananas",
      });
    });
  });
});
