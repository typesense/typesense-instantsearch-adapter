describe("Search Experience", () => {
  beforeAll(require("./support/beforeAll"), 60 * 1000);

  beforeEach(async () => {
    return page.goto("http://localhost:3000");
  }, 30 * 1000);

  describe("when searching for a term", () => {
    beforeEach(async () => {
      return expect(page).toFill("#searchbox input[type=search]", "Charger");
    });

    it("renders the results, facets and pagination", async () => {
      await expect(page).toMatchElement("#brand-list", { text: "Belkin 21" });
      await expect(page).toMatchElement("#categories-menu", {
        text: "Cell Phone Accessories"
      });
      await expect(page).toMatchElement(
        '#price-range-input form input[type=number][placeholder="3"]'
      );
      await expect(page).toMatchElement(
        '#price-range-input form input[type=number][placeholder="250"]'
      );
      await expect(page).toMatchElement("#stats", {
        text: "437 results found"
      });
      await expect(page).toMatchElement(
        "#hits .ais-Hits-item:nth-of-type(1) .hit-name",
        {
          text: "Charger"
        }
      );
      await expect(page).toMatchElement("#infinite-hits", {
        text: "Charger"
      });
      await page.waitForSelector("#pagination a.ais-Pagination-link");
      const length = (await page.$$("#pagination a.ais-Pagination-link"))
        .length;
      return expect(length).toEqual(7 + 2);
    });

    describe("applying filters", () => {
      describe("brand filter", () => {
        it("renders the results, facets and pagination", async () => {
          await expect(page).toClick("#brand-list button", {
            text: "Show more"
          });
          await expect(page).toClick(
            "#brand-list input[type=checkbox][value=Samsung]"
          );
          await expect(page).toMatchElement("#stats", {
            text: "27 results found"
          });
          await expect(page).toMatchElement(
            '#price-range-input form input[type=number][placeholder="14"]'
          );
          await expect(page).toMatchElement(
            '#price-range-input form input[type=number][placeholder="770"]'
          );
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
          const length = (await page.$$("#pagination a.ais-Pagination-link"))
            .length;
          expect(length).toEqual(4 + 2);
        });
      });

      describe("searching for a brand facet value", () => {
        it("renders the facet search results", async () => {
          await expect(page).toFill("#brand-list input[type=search]", "Apple");
          await expect(page).toMatchElement("#brand-list", {
            text: "No results"
          });
          await expect(page).toFill("#brand-list input[type=search]", "ottie");
          await expect(page).toMatchElement("#brand-list", {
            text: "iOttie"
          });
        });
      });

      describe("using the menu widget", () => {
        it("renders the filtered results and updates the breadcrumb", async () => {
          await expect(page).toMatchElement("#categories-menu a", {
            text: "Car & Travel Accessories"
          });
          await expect(page).toClick("#categories-menu a span", {
            text: "Car & Travel Accessories"
          });
          await expect(page).toMatchElement("#stats", {
            text: "16 results found"
          });
          await expect(page).toMatchElement("#hits", {
            text: "Samsung - Adaptive Fast Charging Vehicle Charger"
          });
          await expect(page).toMatchElement("#infinite-hits", {
            text: "Belkin - MIXIT Metallic Car Charger - Black"
          });
          await expect(page).toMatchElement("#current-refinements", {
            text: "Categories:Car & Travel Accessories"
          });

          // Breadcrumb
          await expect(page).toMatchElement("#breadcrumb", {
            text: "Home>Car & Travel Accessories"
          });
        });
      });

      describe("when the refinements are cleared", () => {
        it("renders the unrefined results", async () => {
          await expect(page).toMatchElement("#categories-menu a", {
            text: "Car & Travel Accessories"
          });
          await expect(page).toClick("#categories-menu a span", {
            text: "Car & Travel Accessories"
          });
          await expect(page).toMatchElement("#stats", {
            text: "16 results found"
          });

          // clearRefinements
          await expect(page).toClick("#clear-refinements button", {
            text: "Clear refinements"
          });
          await expect(page).toMatchElement("#stats", {
            text: "437 results found"
          });
        });
      });

      describe("using the hierarchicalMenu", () => {
        it("renders the filtered results", async () => {
          await expect(page).toMatchElement("#searchbox input[type=search]");
          await expect(page).toClick("#searchbox input[type=search]", {
            clickCount: 3
          });
          await (await page.$("#searchbox input[type=search]")).press(
            "Backspace"
          );
          await expect(page).toMatchElement("#categories-hierarchical-menu a", {
            text: "Cell Phones"
          });
          await expect(page).toClick("#categories-hierarchical-menu a", {
            text: "Cell Phones"
          });
          await expect(page).toMatchElement("#categories-hierarchical-menu a", {
            text: "iPhone"
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
          const length = (await page.$$("#pagination a.ais-Pagination-link"))
            .length;
          expect(length).toEqual(5 + 2);
        });
      });

      describe("using the numericMenu", () => {
        it("renders the filtered results", async () => {
          // numericMenu
          await expect(page).toClick("#price-menu span", {
            text: "Between 500$ - 1000$"
          });
          await expect(page).toMatchElement("#stats", {
            text: "7 results found"
          });
          await expect(page).toMatchElement("#hits", {
            text: "Motorola - Moto Z 4G LTE"
          });
          await expect(page).toMatchElement("#infinite-hits", {
            text: "Sony - Xperia™ XZ 4G LTE with 32GB Memory Cell Phone"
          });
          await page.waitForSelector("#pagination a.ais-Pagination-link");
          const length = (await page.$$("#pagination a.ais-Pagination-link"))
            .length;
          expect(length).toEqual(1);
        });
      });
      describe("using the rangeInput", () => {
        it("renders the filtered results", async () => {
          await expect(page).toFill(
            "#price-range-input form input[type=number].ais-RangeInput-input--min",
            "99"
          );
          await expect(page).toFill(
            "#price-range-input form input[type=number].ais-RangeInput-input--max",
            "100"
          );
          await expect(page).toClick("#price-range-input button");
          await expect(page).toMatchElement("#stats", {
            text: "34 results found"
          });
          await expect(page).toMatchElement("#hits", {
            text: "mophie - Powerstation 20,000 mAh Portable Charger"
          });
          return expect(page).toMatchElement("#infinite-hits", {
            text: "Belkin - Valet 6700 mAh Portable Charger"
          });
        });
      });

      describe("using the ratingMenu", () => {
        it("renders the filtered results", async () => {
          await expect(page).toMatchElement(
            "#rating-menu a[aria-label='4 & up'] span"
          );
          await expect(page).toClick(
            "#rating-menu a[aria-label='4 & up'] span"
          );
          await expect(page).toMatchElement("#stats", {
            text: "241 results found"
          });
          await expect(page).toMatchElement("#hits", {
            text: "Dynex™ - Portable Charger - Gray"
          });
          await expect(page).toMatchElement("#infinite-hits", {
            text: "Samsung - Adaptive Fast Charging Wall Charger"
          });
          await page.waitForSelector("#pagination a.ais-Pagination-link");
          const length = (await page.$$("#pagination a.ais-Pagination-link"))
            .length;
          expect(length).toEqual(7 + 2);
        });
      });
    });

    describe("when sorting", () => {
      it("renders the sorted results", async () => {
        // Sort Asc
        await expect(page).toSelect("#sort-by select", "Price (asc)");
        await expect(page).toMatchElement("#stats", {
          text: "437 results found"
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
          text: "437 results found"
        });
        await expect(page).toMatchElement("#hits", {
          text: "mophie - powerstation 8x Portable Charger"
        });
        await expect(page).toMatchElement("#infinite-hits", {
          text: "Verizon - Jetpack 4G LTE Mobile Hotspot"
        });
        await expect(page).toClick("#pagination a", { text: "2" });
        await expect(page).toMatchElement("#hits", {
          text: "Dell - Power Companion Portable Charger"
        });
        await expect(page).toMatchElement("#infinite-hits", {
          text: "iBattz - Optimus Battstation Power"
        });
      });
    });

    describe("when changing the Hits per Page", () => {
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

  describe("when grouping results", () => {
    beforeEach(async () => {
      return page.goto("http://localhost:3000/?groupBy=brand&groupLimit=2");
    });

    it("renders the grouped results", async () => {
      await expect(page).toMatchElement("#brand-list", { text: "AT&T 1" });
      await expect(page).toMatchElement("#stats", {
        text: "250 results found"
      });
      await expect(page).toMatchElement(
        "#hits .ais-Hits-item:nth-of-type(1) .hit-name",
        {
          text: "AT&T"
        }
      );
      await expect(page).toMatchElement(
        "#hits .ais-Hits-item:nth-of-type(2) .hit-name",
        {
          text: "AT&T"
        }
      );
      await expect(page).toMatchElement(
        "#hits .ais-Hits-item:nth-of-type(3) .hit-name",
        {
          text: "Boost"
        }
      );
      await expect(page).toMatchElement(
        "#hits .ais-Hits-item:nth-of-type(4) .hit-name",
        {
          text: "Boost"
        }
      );
      await expect(page).toMatchElement("#infinite-hits", {
        text: "Samsung"
      });
      await page.waitForSelector("#pagination a.ais-Pagination-link");
      const length = (await page.$$("#pagination a.ais-Pagination-link"))
        .length;
      return expect(length).toEqual(7 + 2);
    });
  });
});
