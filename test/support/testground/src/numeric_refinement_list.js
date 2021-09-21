import instantsearch from "instantsearch.js";
import { searchBox, pagination, currentRefinements, refinementList, hits, stats } from "instantsearch.js/es/widgets";

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
    queryBy: "name,city,country,iata_code",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
  searchClient,
  indexName: "airports",
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
    container: "#price-refinement-list",
    attribute: "links_count",
    searchable: true,
    showMore: true,
    sortBy: ["name:asc", "count:desc"],
  }),
  hits({
    container: "#hits",
    templates: {
      item: `
      <h3>
        {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
      </h3>
      <p>{{#helpers.highlight}}{ "attribute": "iata_code" }{{/helpers.highlight}} -
      {{#helpers.highlight}}{ "attribute": "city" }{{/helpers.highlight}},
      {{#helpers.highlight}}{ "attribute": "country" }{{/helpers.highlight}} </p>
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
