describe("InstantSearch Dynamic Widgets", () => {
  beforeAll(require("./support/beforeAll"), 60 * 1000);

  beforeEach(async () => {
    return page.goto("http://localhost:3000/dynamic_widgets.html");
  }, 10 * 1000);

  describe("Page", () => {
    it("loads", async () => {
      return await expect(page).toMatch("AT&T");
    });
  });

  describe("searchBox", () => {
    it("renders", async () => {
      return expect(page).toMatchElement("#searchbox input.ais-SearchBox-input");
    });
  });

  describe("refinementList", () => {
    it("renders", async () => {
      return expect(page).toMatchElement(".ais-RefinementList", {
        text: "Apple165",
      });
    });
  });

  describe("menu", () => {
    it("renders", async () => {
      return expect(page).toMatchElement(".ais-Menu", {
        text: "Data Cables",
      });
    });
  });
});
