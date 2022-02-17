import instantsearch from "instantsearch.js";
import { searchBox, pagination, geoSearch, stats } from "instantsearch.js/es/widgets";

// ======= Uncomment to use typesense-instantsearch-adapter
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const additionalSearchParameters = {
  query_by: "name,city,country,iata_code",
};

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
  //  query_by is required.
  additionalSearchParameters,
  geoLocationField: "lat_lng",
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
  searchClient,
  indexName: "airports",
  routing: true,
});

// ======== Uncomment to use Algolia
// const searchClient = algoliasearch(
//   "latency",
//   "6be0576ff61c053d5f9a3225e2a90f76"
// );
// const search = instantsearch({
//   indexName: "demo-geosearch",
//   searchClient
// });

// ============ Begin Widget Configuration
// eslint-disable-next-line no-unused-vars
window.initMap = function () {
  search.addWidgets([
    searchBox({
      container: "#searchbox",
    }),
    pagination({
      container: "#pagination",
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
    geoSearch({
      container: "#map",
      googleReference: window.google,
    }),
  ]);

  search.start();
};
