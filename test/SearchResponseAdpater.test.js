import { SearchResponseAdapter } from "../src/SearchResponseAdapter";
import { Configuration } from "../src/Configuration";

describe("SearchResponseAdapter", () => {
  describe("._adaptHighlightResult", () => {
    it("adapts the given hit's highlight", () => {
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
          value: "Verizon Prepaid",
          matchLevel: "none",
          matchedWords: [],
        },
        categories: [
          {
            value: "Cell Phones",
            matchLevel: "none",
            matchedWords: [],
          },
          {
            value: "Cell <mark>Phone</mark> Accessories",
            matchLevel: "full",
          },
          {
            value: "SIM Cards",
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
            value: "Cell Phones > Cell Phone Accessories",
            matchLevel: "none",
            matchedWords: [],
          },
        ],
        "categories.lvl2": [
          {
            value: "Cell Phones > Cell Phone Accessories > SIM Cards",
            matchLevel: "none",
            matchedWords: [],
          },
        ],
        description: {
          value:
            "Set up your existing Verizon <mark>Prepaid</mark> 4G cell <mark>phone</mark> with this Verizon Wireless <mark>Prepaid</mark> kit, which contains a PIN for a 1-month airtime plan with 30 days of unlimited talk and text and 1GB of data, plus a nano SIM card and SIM card adapter tray.",
          matchLevel: "full",
          matchedWords: ["Prepaid", "phone"],
        },
        free_shipping: {
          value: "false",
          matchLevel: "none",
          matchedWords: [],
        },
        id: {
          value: "1172",
          matchLevel: "none",
          matchedWords: [],
        },
        image: {
          value: "https://cdn-demo.algolia.com/bestbuy-0118/4331711_sb.jpg",
          matchLevel: "none",
          matchedWords: [],
        },
        name: {
          value: "Verizon <mark>Prepaid</mark> - Bring Your Own <mark>Phone</mark> SIM Kit + Airtime",
          matchLevel: "full",
          matchedWords: ["Prepaid", "Phone"],
        },
        popularity: {
          value: "6955",
          matchLevel: "none",
          matchedWords: [],
        },
        price: {
          value: "49.95",
          matchLevel: "none",
          matchedWords: [],
        },
        rating: {
          value: "4",
          matchLevel: "none",
          matchedWords: [],
        },
      });
    });

    describe("when the result has an int array", () => {
      it("adapts the given hit's highlight", () => {
        const typesenseResponse = require("./support/data/typesense-search-response-with-int-arrays.json");
        const subject = new SearchResponseAdapter(typesenseResponse, {
          params: {
            highlightPreTag: "<mark>",
            highlightPostTag: "</mark>",
          },
        });
        const typesenseHit = typesenseResponse.results[0].hits[0];

        const result = subject._adaptHighlightResult(typesenseHit, "value");
        expect(result).toEqual({
          company_name: {
            value: "<mark>String</mark> Value",
            matchLevel: "full",
            matchedWords: ["String"],
          },
          country: {
            value: "<mark>String</mark> Value",
            matchLevel: "full",
            matchedWords: ["String"],
          },
          num_employees: [
            {
              value: "0",
              matchLevel: "none",
              matchedWords: [],
            },
            {
              value: "1",
              matchLevel: "none",
              matchedWords: [],
            },
          ],
        });
      });
    });

    describe("when the result uses the highlight structure between 0.24.0.rcn1 to 0.24.0.rcn31", () => {
      it("only highlights non-nested fields", () => {
        const typesenseResponse = require("./support/data/typesense-search-response-with-highlight-0.24.0.rcn1-to-0.24.0-rcn31.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse,
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          new Configuration()
        );
        const typesenseHit = typesenseResponse.results[0].hits[0];

        const result = subject._adaptHighlightResult(typesenseHit, "value");
        expect(result).toEqual({
          addresses: [
            {
              city: {
                value: "Fries",
                matchLevel: "none",
                matchedWords: [],
              },
              street: {
                value: "33rd St",
                matchLevel: "none",
                matchedWords: [],
              },
            },
            {
              city: {
                value: "Houston",
                matchLevel: "none",
                matchedWords: [],
              },
              street: {
                value: "5th St",
                matchLevel: "none",
                matchedWords: [],
              },
            },
          ],
          company_name: {
            value: "<mark>Stark</mark> Industries",
            matchLevel: "full",
            matchedWords: ["Stark"],
          },
          id: {
            value: "533",
            matchLevel: "none",
            matchedWords: [],
          },
          num_employees: {
            value: "403",
            matchLevel: "none",
            matchedWords: [],
          },
          test_null_value: {
            value: "",
            matchLevel: "none",
            matchedWords: [],
          },
        });
      });
    });

    describe("when the result uses the highlight structure post 0.24.0.rcn32", () => {
      it("only highlights non-nested fields", () => {
        const typesenseResponse = require("./support/data/typesense-search-response-with-highlight-to-0.24.0-rcn32-and-above.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse,
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          new Configuration()
        );
        const typesenseHit = typesenseResponse.results[0].hits[0];

        const result = subject._adaptHighlightResult(typesenseHit, "value");
        expect(result).toEqual({
          addresses: [
            {
              city: {
                value: "Fries",
                matchLevel: "none",
                matchedWords: [],
              },
              street: {
                value: "33rd St",
                matchLevel: "none",
                matchedWords: [],
              },
            },
            {
              city: {
                value: "<mark>Houston</mark>",
                matchLevel: "full",
                matchedWords: ["Houston"],
              },
              street: {
                value: "5th St",
                matchLevel: "none",
                matchedWords: [],
              },
            },
          ],
          company_name: {
            value: "<mark>Stark</mark> Industries",
            matchLevel: "full",
            matchedWords: ["Stark"],
          },
          id: {
            value: "533",
            matchLevel: "none",
            matchedWords: [],
          },
          num_employees: {
            value: "403",
            matchLevel: "none",
            matchedWords: [],
          },
          test_null_value: {
            value: "",
            matchLevel: "none",
            matchedWords: [],
          },
        });
      });
    });
  });
});
