import { SearchResponseAdapter } from "../src/SearchResponseAdapter";

describe("SearchResponseAdapter", () => {
  describe("._adaptHighlightResult", () => {
    it("adapts the given hit's highlight", (done) => {
      const typesenseResponse = require("./support/data/typesense-search-response.json");
      const subject = new SearchResponseAdapter(typesenseResponse, {
        params: {
          highlightPreTag: "<mark>",
          highlightPostTag: "</mark>",
        },
      });
      const typesenseHit = typesenseResponse.results[0].hits[0];

      const result = subject._adaptHighlightResult(typesenseHit, "value");
      expect(result).toEqual({
        brand: {
          value: "BLU",
          matchLevel: "none",
          matchedWords: [],
        },
        categories: [
          {
            value: "Cell Phones",
            matchLevel: "full",
            matchedWords: ["Cell"],
          },
          {
            value: "Unlocked Cell Phones",
            matchLevel: "full",
            matchedWords: ["Cell"],
          },
          {
            value: "All Unlocked Cell Phones",
            matchLevel: "full",
            matchedWords: ["Cell"],
          },
        ],
        "categories.lvl0": [
          {
            value: "Cell Phones",
            matchLevel: "none",
            matchedWords: [],
          },
        ],
        "categories.lvl1": [
          {
            value: "Cell Phones > Unlocked Cell Phones",
            matchLevel: "none",
            matchedWords: [],
          },
        ],
        "categories.lvl2": [
          {
            value: "Cell Phones > Unlocked Cell Phones > All Unlocked Cell Phones",
            matchLevel: "none",
            matchedWords: [],
          },
        ],
        description: {
          value:
            "Blu Studio G Unlocked <mark>Cell</mark> <mark>Phone:</mark> This unlocked <mark>phone</mark> will meet your needs as you work, play and travel. It serves as a mobile hotspot when you're on the go, so you can access the Internet from just about anywhere. Use the dual SIM card slots to answer both local and international calls without needing multiple devices.",
          matchLevel: "full",
          matchedWords: ["Cell", "Phone:", "phone"],
        },
        free_shipping: {
          value: "false",
          matchLevel: "none",
          matchedWords: [],
        },
        id: {
          value: "11",
          matchLevel: "none",
          matchedWords: [],
        },
        image: {
          value: "https://cdn-demo.algolia.com/bestbuy-0118/3902024_sb.jpg",
          matchLevel: "none",
          matchedWords: [],
        },
        name: {
          value: "BLU - Studio G 4G <mark>Cell</mark> <mark>Phone</mark> with 4GB (Unlocked) - Black",
          matchLevel: "full",
          matchedWords: ["Cell", "Phone"],
        },
        popularity: {
          value: "21209",
          matchLevel: "none",
          matchedWords: [],
        },
        price: {
          value: "79.99",
          matchLevel: "none",
          matchedWords: [],
        },
        rating: {
          value: "2",
          matchLevel: "none",
          matchedWords: [],
        },
      });
      done();
    });
  });
});
