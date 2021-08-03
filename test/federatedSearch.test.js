describe("Geo Search - List View", () => {
  beforeAll(require("./support/beforeAll"), 60 * 1000);

  beforeEach(async () => {
    return page.goto("http://localhost:3000/geosearch_list_view.html");
  }, 30 * 1000);

  describe("aroundLatLng via configure widget", () => {
    it("renders results within a within the specified radius around lat/lng", async () => {
      await expect(page).toMatchElement("#stats", {
        text: "56 results found",
      });
      return await expect(page).toMatchElement("#hits .ais-Hits-item:nth-of-type(1)", {
        text: "LAX",
      });
    });
  });
});
