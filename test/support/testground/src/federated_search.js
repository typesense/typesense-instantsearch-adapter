import instantsearch from "instantsearch.js";
import { searchBox, pagination, hits, stats, index, configure } from "instantsearch.js/es/widgets";

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "xyz", // Be sure to use an API key that only has search permissions, since this is exposed in the browser
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  // Parameters set in collectionSpecificSearchParameters override parameters set in additionalSearchParameters
  additionalSearchParameters: {
    query_by: "name",
  },
  collectionSpecificSearchParameters: {
    products: {
      queryBy: "name,description,categories",
    },
    brands: {
      query_by: "name",
    },
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
  searchClient,
  indexName: "products",
  routing: true,
});

// ============ Begin Widget Configuration
search.addWidgets([
  searchBox({
    container: "#searchbox",
  }),
  pagination({
    container: "#pagination",
  }),
  index({ indexName: "products" }).addWidgets([
    hits({
      container: "#product-hits",
      templates: {
        item: `
        <div>
          <img src="{{image}}" align="left" alt="{{name}}" />
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>
          <div class="hit-description">
            {{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}
          </div>
          <div class="hit-price">\${{price}}</div>
          <div class="hit-rating">Categories: {{categories}}</div>
          <div class="hit-rating">Rating: {{rating}}</div>
          <div class="hit-free-shipping">Free Shipping: {{free_shipping}}</div>
        </div>
      `,
      },
    }),
    stats({
      container: "#product-stats",
      templates: {
        text: `
      {{#hasNoResults}}No results{{/hasNoResults}}
      {{#hasOneResult}}1 result{{/hasOneResult}}
      {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}}
      found in {{processingTimeMS}}ms for {{query}}
    `,
      },
    }),
  ]),
  index({ indexName: "brands" }).addWidgets([
    configure({
      hitsPerPage: 4,
    }),
    hits({
      container: "#brand-hits",
      templates: {
        item: `
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>`,
      },
    }),
    stats({
      container: "#brand-stats",
      templates: {
        text: `
      {{#hasNoResults}}No results{{/hasNoResults}}
      {{#hasOneResult}}1 result{{/hasOneResult}}
      {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}}
      found in {{processingTimeMS}}ms for {{query}}
    `,
      },
    }),
  ]),
]);

search.start();
