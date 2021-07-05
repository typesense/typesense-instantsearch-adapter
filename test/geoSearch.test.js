describe("Geo Search", () => {
  beforeAll(require("./support/beforeAll"), 60 * 1000);

  beforeEach(async () => {
    return page.goto("http://localhost:3000/geosearch.html");
  }, 30 * 1000);

  describe("when the page loads", () => {
    it("renders results", async () => {
      return await expect(page).toMatchElement("#stats", {
        text: "3,282 results found",
      });
    });
  });

  describe("when the map is zoomed in", () => {
    it("renders results", async () => {
      await page.waitForSelector('button[aria-label="Zoom in"]', {
        timeout: 5000,
      });
      await page.click('button[aria-label="Zoom in"]');
      return await expect(page).toMatchElement("#stats", {
        text: "2,029 results found",
      });
    });
  });

  describe("when a search term is typed in", () => {
    it("renders results", async () => {
      await page.waitForSelector('button[aria-label="Zoom in"]', {
        timeout: 5000,
      });
      await page.click('button[aria-label="Zoom in"]');
      await page.focus("#searchbox input[type=search]");
      await page.keyboard.type("los");
      return await expect(page).toMatchElement("#stats", {
        text: "107 results found",
      });
    });
  });
});
