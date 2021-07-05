let describeFunc = describe;
if (process.env.CI) {
  describeFunc = xdescribe;
}
describeFunc("Geo Search", () => {
  beforeAll(require("./support/beforeAll"), 60 * 1000);

  beforeEach(async () => {
    await page.goto("http://localhost:3000/geosearch.html");
    return await new Promise((r) => setTimeout(r, 5000));
  }, 30 * 1000);

  describe("when the page loads", () => {
    it("renders results", async () => {
      return await expect(page).toMatchElement("#stats", {
        text: "3,282 results found",
      });
    });
  });

  xdescribe("when the map is zoomed in", () => {
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

  xdescribe("when a search term is typed in", () => {
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
