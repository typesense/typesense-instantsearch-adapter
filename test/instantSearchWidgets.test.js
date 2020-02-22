describe("Instant Search Widgets", () => {
  beforeAll(async () => {
    // Log page errors
    page
      .on("console", message => {
        const messageType = message
          .type()
          .substr(0, 3)
          .toUpperCase();

        switch (messageType) {
          case "ERR":
            console.error(`${messageType} ${message.text()}`);
            break;
          default:
        }
      })
      .on("pageerror", ({ message }) => console.error(message))
      .on("response", response => {
        if (response.status() !== 200) {
          console.error(`${response.status()} ${response.url()}`);
        }
      })
      .on("requestfailed", request =>
        console.error(`${request.failure().errorText} ${request.url()}`)
      );

    return require("./support/createAndPopulateTypesenseIndex");
  }, 60 * 1000);

  describe("Page load", () => {
    beforeEach(async () => {
      return page.goto("http://localhost:3000");
    });

    it('should load the page"', async () => {
      await expect(page).toMatch("InstantSearch.js demo");
      await expect(page).toMatch("AT&T");
      return expect(page.title()).resolves.toMatch("testground");
    });
  });
});
