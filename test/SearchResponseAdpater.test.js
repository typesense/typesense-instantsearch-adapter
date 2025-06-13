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
          new Configuration(),
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
          new Configuration(),
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

  describe("._adaptUserData", () => {
    describe("When there's a metadata object in the response based on curation rules", () => {
      it("formats Typesense's metadata object into userData", () => {
        const typesenseResponse = require("./support/data/typesense-search-response-with-metadata.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse["results"][0],
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );
        const result = subject.adapt();
        expect(result?.userData).toEqual([
          {
            promotion: "new_phones",
            title: "Check out the latest holiday season phones",
          },
        ]);
        expect(result.appliedRules).toEqual(["typesense-override"]);
      });
    });
    describe("When there's not a metadata object in the response based on curation rules", () => {
      it("leaves the userData object empty", () => {
        const typesenseResponse = require("./support/data/typesense-search-response.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse["results"][0],
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );
        const result = subject.adapt();
        expect(result?.userData).toBeUndefined();
        expect(result.appliedRules).toBeUndefined();
      });
    });
  });
  describe("._adaptRenderingContent", () => {
    describe("when user does not specify any renderingContent", () => {
      describe("when the search has results", () => {
        it("generates the facet ordering for the user automatically", () => {
          const typesenseResponse = require("./support/data/typesense-search-response.json");
          const subject = new SearchResponseAdapter(
            typesenseResponse["results"][0],
            {
              params: {
                highlightPreTag: "<mark>",
                highlightPostTag: "</mark>",
              },
            },
            {},
          );

          const result = subject.adapt();
          expect(result?.renderingContent?.facetOrdering?.facets?.order).toEqual([
            "brand",
            "free_shipping",
            "price",
            "rating",
            "categories",
            "categories.lvl0",
          ]);
        });
      });
      describe("when the primary search has no results", () => {
        it("generates the facet ordering for the user automatically", () => {
          const typesenseResponse = require("./support/data/typesense-search-response-no-results.json");
          const subject = new SearchResponseAdapter(
            typesenseResponse["results"][0],
            {
              params: {
                highlightPreTag: "<mark>",
                highlightPostTag: "</mark>",
              },
            },
            {},
            typesenseResponse["results"],
          );

          const result = subject.adapt();
          expect(result?.renderingContent?.facetOrdering?.facets?.order).toEqual([
            "brand",
            "price",
            "rating",
            "free_shipping",
          ]);
        });
      });
    });
    describe("when user specifies partial renderingContent, without facet ordering", () => {
      it("generates the facet ordering for the user automatically, and merges with the provided data", () => {
        const typesenseResponse = require("./support/data/typesense-search-response.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse["results"][0],
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {
            renderingContent: {
              facetOrdering: {
                somevalue: "abc",
                anothervalue: {
                  key: "value",
                },
              },
            },
          },
        );

        const result = subject.adapt();
        expect(result?.renderingContent).toEqual({
          facetOrdering: {
            somevalue: "abc",
            anothervalue: {
              key: "value",
            },
            facets: {
              order: ["brand", "free_shipping", "price", "rating", "categories", "categories.lvl0"],
            },
          },
        });
      });
    });
    describe("when user specifies facet ordering", () => {
      it("it uses that and doesn't override", () => {
        const typesenseResponse = require("./support/data/typesense-search-response.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse["results"][0],
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {
            renderingContent: {
              facetOrdering: {
                somevalue: "abc",
                anothervalue: {
                  key: "value",
                },
                facets: {
                  order: ["brand", "free_shipping"],
                },
              },
            },
          },
        );

        const result = subject.adapt();
        expect(result?.renderingContent).toEqual({
          facetOrdering: {
            somevalue: "abc",
            anothervalue: {
              key: "value",
            },
            facets: {
              order: ["brand", "free_shipping"],
            },
          },
        });
      });
    });
  });

  describe("._adaptGroupedHits", () => {
    describe("when flattenGroupedHits is false", () => {
      it("adapts the given grouped_hits", () => {
        const typesenseResponse = require("./support/data/typesense-search-response-grouped-hits.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse,
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          { flattenGroupedHits: false },
        );
        const typesenseGroupedHits = typesenseResponse.results[0].grouped_hits;

        const result = subject._adaptGroupedHits(typesenseGroupedHits);
        expect(result.length).toEqual(10);
        expect(result[0]["_group_found"]).toEqual(7);
        expect(result[0]["_group_key"]).toEqual(["AT&T GoPhone"]);
        expect(result[0]["_grouped_hits"].length).toEqual(3);
      });
    });

    describe("when flattenGroupedHits is true", () => {
      it("adapts the given grouped_hits", () => {
        const typesenseResponse = require("./support/data/typesense-search-response-grouped-hits.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse,
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          { flattenGroupedHits: true },
        );
        const typesenseGroupedHits = typesenseResponse.results[0].grouped_hits;

        const result = subject._adaptGroupedHits(typesenseGroupedHits);
        expect(result.length).toEqual(30);
        expect(result[0]["_group_found"]).toEqual(7);
        expect(result[0]["_group_key"]).toEqual(["AT&T GoPhone"]);
        expect(result[0]["_grouped_hits"]).toBeUndefined();
      });
    });
  });

  describe("Union Search Support", () => {
    describe("when union_request_params is present", () => {
      it("uses union_request_params instead of request_params for query and per_page", () => {
        const typesenseResponse = require("./support/data/typesense-union-search-response.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse,
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject.adapt();
        expect(result.query).toEqual("phone");
        expect(result.hitsPerPage).toEqual(10);
      });

      it("uses 0-based page numbering for union search", () => {
        const typesenseResponse = require("./support/data/typesense-union-search-response.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse,
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject.adapt();
        expect(result.page).toEqual(0); // Union search page should remain 0-based
      });

      it("includes collection and search_index metadata in hits", () => {
        const typesenseResponse = require("./support/data/typesense-union-search-response.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse,
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject.adapt();
        expect(result.hits[0].collection).toEqual("products");
        expect(result.hits[0].search_index).toEqual(0);
        expect(result.hits[2].collection).toEqual("laptops");
        expect(result.hits[2].search_index).toEqual(1);
      });
    });

    describe("when request_params is present (regular search)", () => {
      it("uses request_params for query and per_page", () => {
        const typesenseResponse = require("./support/data/typesense-search-response.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse["results"][0],
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject.adapt();
        expect(result.query).toEqual("prepaid phone");
        expect(result.hitsPerPage).toEqual(8);
      });

      it("converts 1-based page to 0-based for regular search", () => {
        const typesenseResponse = require("./support/data/typesense-search-response.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse["results"][0],
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject.adapt();
        expect(result.page).toEqual(0); // Page 1 converted to 0-based = 0
      });
    });
  });

  describe("._adaptFacets", () => {
    describe("when facet_counts is an array", () => {
      it("adapts facets correctly", () => {
        const typesenseResponse = require("./support/data/typesense-union-search-response.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse,
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject._adaptFacets(typesenseResponse.facet_counts);
        expect(result).toEqual({
          brand: {
            Apple: 10,
            Samsung: 8,
          },
          category: {
            Electronics: 15,
            Phones: 3,
          },
        });
      });
    });

    describe("when facet_counts is not an array", () => {
      it("returns empty object safely", () => {
        const typesenseResponse = require("./support/data/typesense-search-response-invalid-facets.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse,
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject._adaptFacets(typesenseResponse.facet_counts);
        expect(result).toEqual({});
      });
    });

    describe("when facet_counts is undefined", () => {
      it("returns empty object safely", () => {
        const subject = new SearchResponseAdapter(
          { hits: [], found: 0 },
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject._adaptFacets(undefined);
        expect(result).toEqual({});
      });
    });
  });

  describe("._adaptFacetStats", () => {
    describe("when facet_counts is an array with stats", () => {
      it("adapts facet stats correctly", () => {
        const typesenseResponse = require("./support/data/typesense-union-search-response.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse,
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject._adaptFacetStats(typesenseResponse.facet_counts);
        expect(result).toEqual({
          brand: {
            avg: 250.5,
            max: 999.99,
            min: 49.99,
          },
        });
      });
    });

    describe("when facet_counts is not an array", () => {
      it("returns empty object safely", () => {
        const typesenseResponse = require("./support/data/typesense-search-response-invalid-facets.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse,
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject._adaptFacetStats(typesenseResponse.facet_counts);
        expect(result).toEqual({});
      });
    });

    describe("when facet_counts is undefined", () => {
      it("returns empty object safely", () => {
        const subject = new SearchResponseAdapter(
          { hits: [], found: 0 },
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject._adaptFacetStats(undefined);
        expect(result).toEqual({});
      });
    });

    describe("when facet has no stats property", () => {
      it("skips facets without stats", () => {
        const facetCounts = [
          {
            field_name: "brand",
            counts: [{ value: "Apple", count: 10 }],
            stats: { avg: 250.5 },
          },
          {
            field_name: "category",
            counts: [{ value: "Electronics", count: 15 }],
            // No stats property
          },
        ];

        const subject = new SearchResponseAdapter(
          { hits: [], found: 0 },
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject._adaptFacetStats(facetCounts);
        expect(result).toEqual({
          brand: { avg: 250.5 },
        });
      });
    });
  });

  describe("adapt() method integration", () => {
    describe("with union search response", () => {
      it("handles all union search features correctly", () => {
        const typesenseResponse = require("./support/data/typesense-union-search-response.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse,
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject.adapt();

        // Basic response structure
        expect(result.nbHits).toEqual(25);
        expect(result.page).toEqual(0);
        expect(result.hitsPerPage).toEqual(10);
        expect(result.query).toEqual("phone");
        expect(result.processingTimeMS).toEqual(8);

        // Hits with union metadata
        expect(result.hits).toHaveLength(3);
        expect(result.hits[0].collection).toEqual("products");
        expect(result.hits[0].search_index).toEqual(0);
        expect(result.hits[2].collection).toEqual("laptops");
        expect(result.hits[2].search_index).toEqual(1);

        // Facets
        expect(result.facets.brand).toEqual({
          Apple: 10,
          Samsung: 8,
        });

        // Facet stats
        expect(result.facets_stats.brand).toEqual({
          avg: 250.5,
          max: 999.99,
          min: 49.99,
        });
      });
    });

    describe("with invalid facet_counts", () => {
      it("handles invalid facet structure gracefully", () => {
        const typesenseResponse = require("./support/data/typesense-search-response-invalid-facets.json");
        const subject = new SearchResponseAdapter(
          typesenseResponse,
          {
            params: {
              highlightPreTag: "<mark>",
              highlightPostTag: "</mark>",
            },
          },
          {},
        );

        const result = subject.adapt();

        expect(result.facets).toEqual({});
        expect(result.facets_stats).toEqual({});
        expect(result.nbHits).toEqual(0);
        expect(result.query).toEqual("nonexistent");
      });
    });
  });
});
