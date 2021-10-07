import instantsearch from "instantsearch.js";
import {
  searchBox,
  pagination,
  currentRefinements,
  refinementList,
  hits,
  stats,
  configure,
} from "instantsearch.js/es/widgets";

// Allow search params to be specified in the URL, for the test suite
const urlParams = new URLSearchParams(window.location.search);
let facetFilters;

if (urlParams.has("array")) {
  facetFilters = [["ingredient_names:-Cheddar cheese", "ingredient_names:-Tater", "ingredient_names:bananas"]];
} else {
  facetFilters = ["ingredient_names:-cinnamon"];
}

// ======= Uncomment to use typesense-instantsearch-adapter
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
      // {
      //   host: "localhost",
      //   port: "7108",
      //   protocol: "http"
      // },
      // {
      //   host: "localhost",
      //   port: "9108",
      //   protocol: "http"
      // }
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    queryBy: "title",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
  searchClient,
  indexName: "recipes",
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
  refinementList({
    limit: 50,
    showMoreLimit: 100,
    container: "#ingredients-list",
    attribute: "ingredient_names",
    searchable: true,
    showMore: true,
    sortBy: ["name:asc", "count:desc"],
  }),
  configure({
    facetFilters: facetFilters,
  }),
  hits({
    container: "#hits",
    templates: {
      item: `
        <div>
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
          </div>
          <div class="hit-description">
            {{ ingredient_names }}
          </div>
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
      found in {{processingTimeMS}}ms for {{query}}
    `,
    },
  }),
]);

search.start();
