describe("Geo Search - List View", () => {
  beforeAll(require("./support/beforeAll"), 60 * 1000);

  describe("aroundLatLng via configure widget", () => {
    it("renders results within a within the specified radius around lat lng", async () => {
      await page.goto("http://localhost:3000/geosearch_list_view.html");
      await expect(page).toMatchElement("#stats", {
        text: "56 results found",
      });
      return await expect(page).toMatchElement("#hits .ais-Hits-item:nth-of-type(1)", {
        text: "LAX",
      });
    });
  });
  describe("insideBoundingBox via configure widget", () => {
    it("renders results within a within the specified bounding box", async () => {
      await page.goto("http://localhost:3000/geosearch_list_view.html?insideBoundingBox");

      await expect(page).toMatchElement("#stats", {
        text: "119 results found",
      });
      return await expect(page).toMatchElement("#hits .ais-Hits-item:nth-of-type(1)", {
        text: "LAX",
      });
    });
  });

  describe("insidePolygon via configure widget", () => {
    it("renders results within a within the specified polygon", async () => {
      await page.goto("http://localhost:3000/geosearch_list_view.html?insidePolygon");

      await expect(page).toMatchElement("#stats", {
        text: "2 results found",
      });
      return await expect(page).toMatchElement("#hits .ais-Hits-item:nth-of-type(1)", {
        text: "ORD",
      });
    });
  });
});
