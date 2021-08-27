import instantsearch from "instantsearch.js";
import { searchBox, pagination, stats, hits, configure, sortBy, refinementList } from "instantsearch.js/es/widgets";

// ======= Uncomment to use typesense-instantsearch-adapter
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const additionalSearchParameters = {
  queryBy: "iata_code,name,city,country",
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
  //  queryBy is required.
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
  sortBy({
    container: "#sort-by",
    items: [
      { label: "Default", value: "airports" },
      { label: "Distance (asc)", value: "airports/sort/lat_lng(34.0522, -118.2437):asc" },
      { label: "Distance (desc)", value: "airports/sort/lat_lng(34.0522, -118.2437):desc" },
    ],
  }),
  refinementList({
    attribute: "country",
    container: "#country-filter",
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
]);

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("insideBoundingBox")) {
  search.addWidgets([
    configure({
      insideBoundingBox: [[47.6062, -122.3321, 32.7767, -96.797]],
    }),
  ]);
} else if (urlParams.has("insidePolygon")) {
  search.addWidgets([
    configure({
      insidePolygon: [[41.8781, -87.6298, 40.7128, -74.006, 40.7608, -111.891]],
    }),
  ]);
} else {
  search.addWidgets([
    configure({
      aroundLatLng: "34.0522, -118.2437",
      aroundRadius: "1000000", // (or "all"),
    }),
  ]);
}

search.start();
