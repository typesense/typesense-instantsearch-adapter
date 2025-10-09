import instantsearch from "instantsearch.js";
import {
  searchBox,
  pagination,
  currentRefinements,
  refinementList,
  hits,
  stats,
  rangeInput,
  rangeSlider,
  clearRefinements,
} from "instantsearch.js/es/widgets";

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "xyz",
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "name,description,brand",
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
  currentRefinements({
    container: "#current-refinements",
  }),
  // RefinementList with join relation - filtering by retailer from the prices collection
  refinementList({
    container: "#retailer-list",
    attribute: "$product_prices(retailer)",
    limit: 10,
    showMore: true,
    showMoreLimit: 20,
  }),
  // Range input with join relation - filtering by price from the prices collection
  rangeInput({
    container: "#price-range-input",
    attribute: "$product_prices(price)",
  }),
  // Range slider with join relation - filtering by price from the prices collection
  rangeSlider({
    container: "#price-range-slider",
    attribute: "$product_prices(price)",
  }),
  clearRefinements({
    container: "#clear-refinements",
  }),
  hits({
    container: "#hits",
    templates: {
      item: `
        <div>
          <h3>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h3>
          <p><strong>Brand:</strong> {{brand}}</p>
          <p><strong>Category:</strong> {{category}}</p>
          <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
        </div>
      `,
    },
  }),
  stats({
    container: "#stats",
    templates: {
      text: `
        {{#hasNoResults}}No results{{/hasNoResults}}
        {{#hasOneResult}}1 result{{/hasOneResult}}
        {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}}
        found in {{processingTimeMS}}ms
      `,
    },
  }),
]);

search.start();
