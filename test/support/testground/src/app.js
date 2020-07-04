/* global algoliasearch */
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

const additionalSearchParameters = {
  queryBy: "name,description,categories"
  // groupBy: "categories",
  // groupLimit: 1
  // pinnedHits: "23:2"
};

// Allow search params to be specified in the URL, for the test suite
const urlParams = new URLSearchParams(window.location.search);
["groupBy", "groupLimit", "pinnedHits"].forEach(attr => {
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
  additionalSearchParameters
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
  searchClient,
  indexName: "products",
  routing: true
});
const suggestions = instantsearch({
  indexName: "products",
  searchClient
});

// ======== Uncomment to use Algolia
// const searchClient = algoliasearch(
//   "B1G2GM9NG0",
//   "aadef574be1f9252bb48d4ea09b5cfe5"
// );
// const search = instantsearch({
//   indexName: "demo_ecommerce",
//   searchClient
// });
// const suggestions = instantsearch({
//   indexName: "demo_ecommerce",
//   searchClient,
//   routing: true
// });

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
    container: "#brand-list",
    attribute: "brand",
    searchable: true,
    showMore: true,
    sortBy: ["name:asc", "count:desc"]
  }),
  menu({
    container: "#categories-menu",
    attribute: "categories"
  }),
  hierarchicalMenu({
    container: "#categories-hierarchical-menu",
    attributes: [
      "categories.lvl0",
      "categories.lvl1",
      "categories.lvl2",
      "categories.lvl3"
    ]
  }),
  numericMenu({
    container: "#price-menu",
    attribute: "price",
    items: [
      { label: "All" },
      { label: "Less than 500$", end: 500 },
      { label: "Between 500$ - 1000$", start: 500, end: 1000 },
      { label: "More than 1000$", start: 1000 }
    ]
  }),
  toggleRefinement({
    container: "#toggle-refinement",
    attribute: "free_shipping",
    templates: {
      labelText: "Free shipping"
    }
  }),
  rangeInput({
    container: "#price-range-input",
    attribute: "price"
  }),
  rangeSlider({
    container: "#price-range-slider",
    attribute: "price"
  }),
  ratingMenu({
    container: "#rating-menu",
    attribute: "rating"
  }),
  sortBy({
    container: "#sort-by",
    items: [
      { label: "Default", value: "products" },
      { label: "Price (asc)", value: "products/sort/price:asc" },
      { label: "Price (desc)", value: "products/sort/price:desc" }
    ]
  }),
  hits({
    container: "#hits",
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
      `
    }
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
      `
    }
  }),
  hitsPerPage({
    container: "#hits-per-page",
    items: [
      { label: "8 hits per page", value: 8, default: true },
      { label: "16 hits per page", value: 16 }
    ]
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
  }),
  clearRefinements({
    container: "#clear-refinements"
  }),
  breadcrumb({
    container: "#breadcrumb",
    attributes: [
      "categories.lvl0",
      "categories.lvl1",
      "categories.lvl2",
      "categories.lvl3"
    ]
  })
]);

search.start();

// ======== Autocomplete

// Helper for the render function
const renderIndexListItem = ({ indexId, hits }) => `
  <ol class="autocomplete-list">
    ${hits
      .map(
        hit =>
          `<li class="autocomplete-list-item">${instantsearch.highlight({
            attribute: "name",
            hit
          })}</li>`
      )
      .join("")}
  </ol>
`;

// Create the render function
const renderAutocomplete = (renderOptions, isFirstRender) => {
  const {
    indices,
    currentRefinement,
    refine,
    widgetParams,
    ...rest
  } = renderOptions;

  if (isFirstRender) {
    const input = document.createElement("input");
    const ul = document.createElement("ul");

    input.addEventListener("input", event => {
      refine(event.currentTarget.value);
    });

    widgetParams.container.appendChild(input);
    widgetParams.container.appendChild(ul);
  }

  widgetParams.container.querySelector("input").value = currentRefinement;
  widgetParams.container.querySelector("ul").innerHTML = indices
    .map(renderIndexListItem)
    .join("");
};

// Create the custom widget
const customAutocomplete = connectAutocomplete(renderAutocomplete);

// Instantiate the custom widget
suggestions.addWidgets([
  customAutocomplete({
    container: document.querySelector("#autocomplete")
  })
]);

suggestions.start();
