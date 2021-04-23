import instantsearch from "instantsearch.js";
import {
  searchBox,
  pagination,
  currentRefinements,
  refinementList,
  hits,
  infiniteHits,
  stats,
  sortBy,
  hierarchicalMenu,
  menu,
  numericMenu,
  rangeInput,
  rangeSlider,
  ratingMenu,
  toggleRefinement,
  hitsPerPage,
  clearRefinements,
  breadcrumb
} from "instantsearch.js/es/widgets";
import { connectAutocomplete } from "instantsearch.js/es/connectors";

// ======= Uncomment to use typesense-instantsearch-adapter
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "xyz", // Be sure to use an API key that only has search permissions, since this is exposed in the browser
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http"
      }
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
    ]
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    queryBy: "title"
  }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
  searchClient,
  indexName: "recipes",
  routing: true
});

// ============ Begin Widget Configuration
search.addWidgets([
  searchBox({
    container: "#searchbox"
  }),
  pagination({
    container: "#pagination"
  }),
  currentRefinements({
    container: "#current-refinements"
  }),
  refinementList({
    limit: 50,
    showMoreLimit: 100,
    container: "#ingredients-list",
    attribute: "ingredient_names",
    searchable: true,
    showMore: true,
    sortBy: ["name:asc", "count:desc"],
    operator: "and"
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
      `
    }
  }),
  stats({
    container: "#stats",
    templates: {
      text: `
      {{#hasNoResults}}No results{{/hasNoResults}}
      {{#hasOneResult}}1 result{{/hasOneResult}}
      {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}}
      found in {{processingTimeMS}}ms for {{query}}
    `
    }
  })
]);

search.start();
