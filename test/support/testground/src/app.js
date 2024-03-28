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
  breadcrumb,
} from "instantsearch.js/es/widgets";
import { connectAutocomplete } from "instantsearch.js/es/connectors";

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
    connectionTimeoutSeconds: 10000,
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
  //  query_by is required.
  additionalSearchParameters,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
  searchClient,
  indexName: "products",
  routing: true,
});
const suggestions = instantsearch({
  indexName: "products",
  searchClient,
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
  refinementList({
    limit: 50,
    showMoreLimit: 100,
    container: "#brand-list",
    attribute: "brand",
    searchable: true,
    showMore: true,
    sortBy: ["name:asc", "count:desc"],
  }),
  menu({
    container: "#categories-menu",
    attribute: "categories",
  }),
  hierarchicalMenu({
    container: "#categories-hierarchical-menu",
    attributes: [
      "hierarchicalCategories.lvl0",
      "hierarchicalCategories.lvl1",
      "hierarchicalCategories.lvl2",
      "hierarchicalCategories.lvl3",
    ],
  }),
  numericMenu({
    container: "#price-menu",
    attribute: "price",
    items: [
      { label: "All" },
      { label: "Less than 500$", end: 500 },
      { label: "Between 500$ - 1000$", start: 500, end: 1000 },
      { label: "More than 1000$", start: 1000 },
    ],
  }),
  toggleRefinement({
    container: "#free-shipping-toggle-refinement",
    attribute: "free_shipping",
    templates: {
      labelText: "Free shipping",
    },
  }),
  rangeInput({
    container: "#price-range-input",
    attribute: "price",
  }),
  rangeSlider({
    container: "#price-range-slider",
    attribute: "price",
  }),
  ratingMenu({
    container: "#rating-menu",
    attribute: "rating",
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
  infiniteHits({
    container: "#infinite-hits",
    templates: {
      item: `
        <div>
          <div class="infinite-hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>
          <div class="infinite-hit-price">\${{price}}</div>
        </div>
      `,
    },
  }),
  hitsPerPage({
    container: "#hits-per-page",
    items: [
      { label: "8 hits per page", value: 8, default: true },
      { label: "16 hits per page", value: 16 },
    ],
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
  clearRefinements({
    container: "#clear-refinements",
  }),
  breadcrumb({
    container: "#breadcrumb",
    attributes: [
      "hierarchicalCategories.lvl0",
      "hierarchicalCategories.lvl1",
      "hierarchicalCategories.lvl2",
      "hierarchicalCategories.lvl3",
    ],
  }),
]);

search.start();

// ======== Autocomplete

// Helper for the render function
const renderIndexListItem = ({ hits }) => `
  <ol class="autocomplete-list">
    ${hits
      .map(
        (hit) =>
          `<li class="autocomplete-list-item">${instantsearch.highlight({
            attribute: "name",
            hit,
          })}</li>`
      )
      .join("")}
  </ol>
`;

// Create the render function
const renderAutocomplete = (renderOptions, isFirstRender) => {
  const { indices, currentRefinement, refine, widgetParams } = renderOptions;

  if (isFirstRender) {
    const input = document.createElement("input");
    const ul = document.createElement("ul");

    input.addEventListener("input", (event) => {
      refine(event.currentTarget.value);
    });

    widgetParams.container.appendChild(input);
    widgetParams.container.appendChild(ul);
  }

  widgetParams.container.querySelector("input").value = currentRefinement;
  widgetParams.container.querySelector("ul").innerHTML = indices.map(renderIndexListItem).join("");
};

// Create the custom widget
const customAutocomplete = connectAutocomplete(renderAutocomplete);

// Instantiate the custom widget
suggestions.addWidgets([
  customAutocomplete({
    container: document.querySelector("#autocomplete"),
  }),
]);

suggestions.start();
