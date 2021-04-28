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
          value: "AT&T GoPhone",
          matchLevel: "none",
          matchedWords: [],
        },
        categories: [
          {
            value: "<mark>Cell</mark> Phones",
            matchLevel: "full",
            matchedWords: ["Cell"],
          },
          {
            value: "Prepaid Phones",
            matchLevel: "none",
            matchedWords: [],
          },
          {
            value: "All Prepaid Phones",
            matchLevel: "none",
            matchedWords: [],
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
            value: "Cell Phones > Prepaid Phones",
            matchLevel: "none",
            matchedWords: [],
          },
        ],
        "categories.lvl2": [
          {
            value: "Cell Phones > Prepaid Phones > All Prepaid Phones",
            matchLevel: "none",
            matchedWords: [],
          },
        ],
        description: {
          value:
            "Enjoy simplicity and speed with Alcatel's Ideal <mark>cell</mark> phone for AT&T. It fits neatly in almost any pocket and has a 4.5-inch display for easy one-handed use. Alcatel's Ideal phone from AT&T comes with 4G of memory and uses Wi-Fi or Bluetooth connectivity to keep connections active no matter what.",
          matchLevel: "full",
          matchedWords: ["cell"],
        },
        free_shipping: {
          value: "true",
          matchLevel: "none",
          matchedWords: [],
        },
        id: {
          value: "2",
          matchLevel: "none",
          matchedWords: [],
        },
        image: {
          value: "https://cdn-demo.algolia.com/bestbuy-0118/5443800_sb.jpg",
          matchLevel: "none",
          matchedWords: [],
        },
        name: {
          value: "AT&T GoPhone - Alcatel Ideal 4G LTE with 8GB Memory Prepaid <mark>Cell</mark> Phone - Slate Blue",
          matchLevel: "full",
          matchedWords: ["Cell"],
        },
        popularity: {
          value: "21413",
          matchLevel: "none",
          matchedWords: [],
        },
        price: {
          value: "29.99",
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
