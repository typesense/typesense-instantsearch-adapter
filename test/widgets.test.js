describe("Instant Search Widgets", () => {
  beforeAll(require("./support/beforeAll"), 60 * 1000);

  beforeEach(async () => {
    return page.goto("http://localhost:3000");
  }, 10 * 1000);

  describe("Page", () => {
    it("loads", async () => {
      await expect(page).toMatch("InstantSearch.js demo");
      await expect(page).toMatch("AT&T");
      return expect(page.title()).resolves.toMatch("testground");
    });
  });

  describe("searchBox", () => {
    it("renders", async () => {
      return expect(page).toMatchElement(
        "#searchbox input.ais-SearchBox-input"
      );
    });
  });

  describe("breadcrumb", () => {
    it("renders", async () => {
      return expect(page).toMatchElement("#breadcrumb .ais-Breadcrumb a", {
        text: "Home"
      });
    });
  });

  describe("stats", () => {
    it("renders", async () => {
      return expect(page).toMatchElement("#stats", {
        text: /3,291 results found in \d*ms for \*/
      });
    });
  });

  describe("sortBy", () => {
    it("renders", async () => {
      return expect(page).toMatchElement("#sort-by select.ais-SortBy-select");
    });
  });

  describe("clearRefinements", () => {
    it("renders", async () => {
      return expect(page).toMatchElement(
        "#clear-refinements button.ais-ClearRefinements-button"
      );
    });
  });

  describe("currentRefinements", () => {
    it("renders", async () => {
      return expect(page).toMatchElement(
        "#current-refinements ul.ais-CurrentRefinements-list"
      );
    });
  });

  describe("refinementList", () => {
    it("renders", async () => {
      return expect(page).toMatchElement("#brand-list", {
        text: "Apple 165"
      });
    });
  });

  describe("toggleRefinement", () => {
    it("renders", async () => {
      return expect(page).toMatchElement("#toggle-refinement", {
        text: "Free shipping"
      });
    });
  });

  describe("menu", () => {
    it("renders", async () => {
      return expect(page).toMatchElement("#categories-menu", {
        text: "Bluetooth Headsets"
      });
    });
  });

  describe("hierarchicalMenu", () => {
    it("renders", async () => {
      await page.focus("#categories-hierarchical-menu");
      return expect(page).toMatchElement("#categories-hierarchical-menu", {
        text: "Cell Phones"
      });
    });
  });

  describe("ratingMenu", () => {
    it("renders", async () => {
      return expect(page).toMatchElement("#rating-menu a[aria-label='4 & up']");
    });
  });

  describe("hits", () => {
    it("renders", async () => {
      return expect(page).toMatchElement("#hits .hit-name:first-of-type", {
        text: "Samsung Galaxy Express"
      });
    });
  });

  describe("infiniteHits", () => {
    it("renders", async () => {
      return expect(page).toMatchElement(
        "#infinite-hits .infinite-hit-name:first-of-type",
        {
          text: "Samsung Galaxy Express"
        }
      );
    });
  });

  describe("numericMenu", () => {
    it("renders", async () => {
      return expect(page).toMatchElement("#price-menu", {
        text: "Less than 500$"
      });
    });
  });

  describe("rangeInput", () => {
    it("renders", async () => {
      await expect(page).toMatchElement(
        '#price-range-input form input[type=number][placeholder="1"]'
      );
      return expect(page).toMatchElement(
        '#price-range-input form input[type=number][placeholder="900"]'
      );
    });
  });

  describe("rangeSlide", () => {
    it("renders", async () => {
      await expect(page).toMatchElement(
        '#price-range-slider div[aria-valuenow="1"]'
      );
      return expect(page).toMatchElement(
        '#price-range-slider div[aria-valuenow="900"]'
      );
    });
  });

  describe("pagination", () => {
    it("renders", async () => {
      await page.waitForSelector("#pagination a.ais-Pagination-link");
      const length = (await page.$$("#pagination a.ais-Pagination-link"))
        .length;
      return expect(length).toEqual(7 + 2);
    });
  });

  describe("hitsPerPage", () => {
    it("renders", async () => {
      return expect(page).toMatchElement(
        "#hits-per-page select.ais-HitsPerPage-select"
      );
    });
  });

  describe("autocomplete", () => {
    it("renders", async () => {
      await expect(page).toMatchElement("#autocomplete input");
      return expect(page).toMatchElement("#autocomplete .autocomplete-list", {
        text: "Samsung Galaxy Express"
      });
    });
  });
});
