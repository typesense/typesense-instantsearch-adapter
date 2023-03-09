import instantsearch from "instantsearch.js";
import {
  searchBox,
  pagination,
  currentRefinements,
  refinementList,
  hits,
  stats,
  sortBy,
  hierarchicalMenu,
  menu,
  dynamicWidgets,
  panel,
} from "instantsearch.js/es/widgets";

// ======= Uncomment to use typesense-instantsearch-adapter
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const additionalSearchParameters = {
  query_by: "name,description,categories",
  // group_by: "categories",
  // group_limit: 1
  // pinned_hits: "23:2"
};

// Allow search params to be specified in the URL, for the test suite
const urlParams = new URLSearchParams(window.location.search);
["groupBy", "groupLimit", "pinnedHits"].forEach((attr) => {
  if (urlParams.has(attr)) {
    additionalSearchParameters[attr] = urlParams.get(attr);
  }
});

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
  renderingContent: {
    // <<====== Required
    facetOrdering: {
      // <<====== Required: this controls the order in which the dynamic facets are displayed, and is *required* for the dynamicWidget to render
      facets: {
        order: ["categories", "brand"], // <<===== Change this as needed
      },
    },
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
  searchClient,
  indexName: "products",
  routing: true,
});

// ======== Uncomment to use Algolia
// const searchClient = algoliasearch("B1G2GM9NG0", "aadef574be1f9252bb48d4ea09b5cfe5");
// const search = instantsearch({
//   indexName: "demo_ecommerce",
//   searchClient,
// });
// const suggestions = instantsearch({
//   indexName: "demo_ecommerce",
//   searchClient,
//   routing: true,
// });

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
  dynamicWidgets({
    container: "#dynamic-widgets",
    widgets: [
      (container) => refinementList({ container, attribute: "brand" }),
      (container) =>
        menu({
          container,
          attribute: "categories",
        }),
      (container) =>
        hierarchicalMenu({
          container,
          attributes: ["hierarchicalCategories"],
        }),
    ],
    fallbackWidget: ({ container, attribute }) =>
      panel({ templates: { header: attribute } })(menu)({ container, attribute }),
  }),
  sortBy({
    container: "#sort-by",
    items: [
      { label: "Default", value: "products" },
      { label: "Price (asc)", value: "products/sort/price:asc" },
      { label: "Price (desc)", value: "products/sort/price:desc" },
    ],
  }),
  hits({
    container: "#hits",
    templates: {
      item(item) {
        return `
        <div>
          <img src="${item.image}" align="left" alt="${item.name}" />
          <div class="hit-name">
            ${item._highlightResult.name.value}
          </div>
          <div class="hit-description">
            ${item._highlightResult.description.value}
          </div>
          <div class="hit-price">$${item.price}</div>
          <div class="hit-categories">Categories:
            ${item._highlightResult.categories.map((c) => c.value).join(" > ")}
          </div>
          <div class="hit-rating">Rating: ${item.rating}</div>
          <div class="hit-free-shipping">Free Shipping: ${item.free_shipping}</div>
        </div>
      `;
      },
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
