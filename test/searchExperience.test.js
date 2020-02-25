describe("Search Experience", () => {
  beforeAll(require("./support/beforeAll"), 60 * 1000);

  beforeEach(async () => {
    return page.goto("http://localhost:3000");
  });

  describe("when searching for a term", () => {
    beforeEach(async () => {
      return expect(page).toFill("#searchbox input[type=search]", "Charger");
    });

    it("renders the results, facets and pagination", async () => {
      await expect(page).toMatchElement("#brand-list", { text: "Belkin 21" });
      await expect(page).toMatchElement("#categories-menu", {
        text: "Cell Phone Accessories"
      });
      await expect(page).toMatchElement("#stats", {
        text: "430 results found"
      });
      await expect(page).toMatchElement("#hits .hit-name:first-of-type", {
        text: "Charger"
      });
      await expect(page).toMatchElement("#infinite-hits", {
        text: "Charger"
      });
      await page.waitForSelector("#pagination a.ais-Pagination-link");
      const length = (await page.$$("#pagination a.ais-Pagination-link"))
        .length;
      return expect(length).toEqual(7 + 2);
    });

    describe("applying filters", () => {
      it("renders the results, facets and pagination", async () => {
        await expect(page).toClick("#brand-list button", { text: "Show more" });
        await expect(page).toClick(
          "#brand-list input[type=checkbox][value=Samsung]"
        );
        await expect(page).toMatchElement("#stats", {
          text: "430 results found"
        });
        await expect(page).toMatchElement("#hits", {
          text: "Fast Charge Wireless Charger"
        });
        await expect(page).toMatchElement("#infinite-hits", {
          text: "Fast Charge Wireless Charger"
        });
        await expect(page).toMatchElement("#current-refinements", {
          text: "Brand:Samsung"
        });

        // Pagination
        await page.waitForSelector("#pagination a.ais-Pagination-link");
        let length = (await page.$$("#pagination a.ais-Pagination-link"))
          .length;
        expect(length).toEqual(4 + 2);

        await expect(page).toFill("#brand-list input[type=search]", "Apple");
        await expect(page).toMatchElement("#brand-list", {
          text: "No results"
        });

        // Facet Search
        await expect(page).toFill("#brand-list input[type=search]", "Apple");
        await expect(page).toMatchElement("#brand-list", {
          text: "No results"
        });
        await expect(page).toFill("#brand-list input[type=search]", "ottie");
        await expect(page).toMatchElement("#brand-list", {
          text: "iOttie"
        });

        // Menu widget
        await expect(page).toClick("#categories-menu a", {
          text: "Smartwatch Accessories"
        });
        await expect(page).toMatchElement("#stats", {
          text: "5 results found"
        });
        await expect(page).toMatchElement("#hits", {
          text: "Gear S2 Wireless Charger"
        });
        await expect(page).toMatchElement("#infinite-hits", {
          text: "Gear S3 Wireless Charging Doc"
        });
        await expect(page).toMatchElement("#current-refinements", {
          text: "Categories:Smartwatch Accessories"
        });

        // Breadcrumb
        await expect(page).toMatchElement("#breadcrumb", {
          text: "Home>Smartwatch Accessories"
        });

        // clearRefinements
        await expect(page).toClick("#clear-refinements button", {
          text: "Clear refinements"
        });
        await expect(page).toMatchElement("#stats", {
          text: "430 results found"
        });

        // hierarchicalMenu
        await expect(page).toClick("#searchbox input[type=search]", {
          clickCount: 3
        });
        await (await page.$("#searchbox input[type=search]")).press(
          "Backspace"
        );
        await expect(page).toClick("#categories-hierarchical-menu a", {
          text: "Cell Phones"
        });
        await expect(page).toClick("#categories-hierarchical-menu a", {
          text: "iPhone"
        });
        await expect(page).toMatchElement("#categories-hierarchical-menu a", {
          text: "iPhone SE"
        });
        await expect(page).toMatchElement("#stats", {
          text: "35 results found"
        });
        await expect(page).toMatchElement("#hits", {
          text: "Apple - iPhone SE 16GB"
        });
        await expect(page).toMatchElement("#infinite-hits", {
          text: "Apple - iPhone SE 16GB - Rose Gold"
        });
        await page.waitForSelector("#pagination a.ais-Pagination-link");
        length = (await page.$$("#pagination a.ais-Pagination-link")).length;
        expect(length).toEqual(5 + 2);

        // numericMenu
        await expect(page).toClick("#price-menu span", {
          text: "Between 500$ - 1000$"
        }); // Apple - iPhone 6s 32GB - Space Gray
        await expect(page).toMatchElement("#stats", {
          text: "22 results found"
        });
        await expect(page).toMatchElement("#hits", {
          text: "Apple - iPhone 6s 32GB - Space Gray"
        });
        await expect(page).toMatchElement("#infinite-hits", {
          text: "Apple - iPhone 6s Plus 64GB"
        });
        await page.waitForSelector("#pagination a.ais-Pagination-link");
        length = (await page.$$("#pagination a.ais-Pagination-link")).length;
        expect(length).toEqual(3 + 2);
      });
    });

    describe("sorting", () => {
      it("renders the results", async () => {
        // Sort Asc
        await expect(page).toSelect("#sort-by select", "Price (asc)");
        await expect(page).toMatchElement("#stats", {
          text: "430 results found"
        });
        await expect(page).toMatchElement("#hits", {
          text: "Tzumi - PocketJuice Portable Charger"
        });
        await expect(page).toMatchElement("#infinite-hits", {
          text: "Dynex™ - 1-Port Vehicle Charger"
        });

        // Sort Desc
        await expect(page).toSelect("#sort-by select", "Price (desc)");
        await expect(page).toMatchElement("#stats", {
          text: "430 results found"
        });
        await expect(page).toMatchElement("#hits", {
          text: "mophie - powerstation 8x Portable Charger"
        });
        await expect(page).toMatchElement("#infinite-hits", {
          text: "Tumi - Portable Charger"
        });
        await expect(page).toClick("#pagination a", { text: "2" });
        await expect(page).toMatchElement("#hits", {
          text: "Cobra - JumPack Portable Charger"
        });
        await expect(page).toMatchElement("#infinite-hits", {
          text: "myCharge - HUBMAX"
        });
      });
    });

    describe("Hits per Page", () => {
      it("renders the set number of hits", async () => {
        await expect(page).toSelect(
          "#hits-per-page select",
          "16 hits per page"
        );
        await page.waitForSelector("#hits li:nth-of-type(9)");
        const length = (await page.$$("#hits li")).length;
        expect(length).toEqual(16);
      });
    });
  });
});
