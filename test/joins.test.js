describe("Joins", () => {
  beforeAll(require("./support/beforeAll"), 60 * 1000);

  beforeEach(async () => {
    return page.goto("http://localhost:3000/joins.html");
  }, 30 * 1000);

  describe("when rendering the page", () => {
    it("renders all products initially", async () => {
      await expect(page).toMatchElement("#stats", {
        text: "10 results found",
      });
    });
  });

  describe("when filtering by retailer (join facet)", () => {
    it("filters products by Amazon retailer", async () => {
      await expect(page).toClick("#retailer-list input[type=checkbox][value=Amazon]");
      await expect(page).toMatchElement("#stats", {
        text: "10 results found",
      });
    });

    it("filters products by BestBuy retailer", async () => {
      await expect(page).toClick("#retailer-list input[type=checkbox][value=BestBuy]");
      await expect(page).toMatchElement("#stats", {
        text: "4 results found",
      });
    });

    it("filters products by Walmart retailer", async () => {
      await expect(page).toClick("#retailer-list input[type=checkbox][value=Walmart]");
      await expect(page).toMatchElement("#stats", {
        text: "6 results found",
      });
    });

    it("filters products by Target retailer", async () => {
      await expect(page).toClick("#retailer-list input[type=checkbox][value=Target]");
      await expect(page).toMatchElement("#stats", {
        text: "5 results found",
      });
    });

    it("filters products by multiple retailers", async () => {
      await expect(page).toClick("#retailer-list input[type=checkbox][value=Amazon]");
      await expect(page).toClick("#retailer-list input[type=checkbox][value=BestBuy]");
      await expect(page).toMatchElement("#stats", {
        text: "10 results found",
      });
    });
  });

  describe("when filtering by price range (join numeric)", () => {
    it("filters products by price range using range input", async () => {
      await expect(page).toFill("#price-range-input input[type=number]:first-of-type", "50");
      await expect(page).toFill("#price-range-input input[type=number]:last-of-type", "100");
      await page.keyboard.press("Enter");

      await page.waitForSelector("#stats", { visible: true });

      const statsText = await page.$eval("#stats", (el) => el.textContent);
      expect(statsText).toMatch(/\d+ results? found/);
    });
  });

  describe("when combining filters", () => {
    it("filters products by retailer and price range", async () => {
      await expect(page).toClick("#retailer-list input[type=checkbox][value=Amazon]");
      await expect(page).toFill("#price-range-input input[type=number]:first-of-type", "20");
      await expect(page).toFill("#price-range-input input[type=number]:last-of-type", "50");
      await page.keyboard.press("Enter");

      await page.waitForSelector("#stats", { visible: true });

      const statsText = await page.$eval("#stats", (el) => el.textContent);
      expect(statsText).toMatch(/\d+ results? found/);
    });
  });

  describe("when clearing refinements", () => {
    it("clears all filters and shows all products", async () => {
      await expect(page).toClick("#retailer-list input[type=checkbox][value=Amazon]");
      await expect(page).toClick("#clear-refinements button");
      await expect(page).toMatchElement("#stats", {
        text: "10 results found",
      });
    });
  });
});
