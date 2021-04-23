describe("Refinement List Operators", () => {
  beforeAll(require("./support/beforeAll"), 60 * 1000);

  beforeEach(async () => {
    return page.goto("http://localhost:3000/refinement_list_operators.html");
  }, 30 * 1000);

  describe("when searching for a term", () => {
    beforeEach(async () => {
      return expect(page).toFill("#searchbox input[type=search]", "egg");
    });

    describe("applying AND filters", () => {
      it("renders the results, facets and pagination", async () => {
        await expect(page).toClick("#ingredients-list button", {
          text: "Show more"
        });
        await expect(page).toClick("#ingredients-list input[type=checkbox][value=butter]");
        await expect(page).toMatchElement("#stats", {
          text: "14 results found"
        });
        await expect(page).toClick("#ingredients-list input[type=checkbox][value=fettucini]");
        await expect(page).toMatchElement("#stats", {
          text: "2 results found"
        });

        await expect(page).toMatchElement("#hits", {
          text: "Chicken Fettucini"
        });
        return expect(page).toMatchElement("#hits", {
          text: "Fettucini With Lemon"
        });
      });
    });
  });
});
