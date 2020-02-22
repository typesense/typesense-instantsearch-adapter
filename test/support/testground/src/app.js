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
  // rangeInput,
  // rangeSlider,
  hitsPerPage,
  clearRefinements,
  breadcrumb
} from "instantsearch.js/es/widgets";
import { connectAutocomplete } from "instantsearch.js/es/connectors";

// ======= Uncomment to use typesense-instantsearch-adapter
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    masterNode: {
      host: "localhost",
      port: "8108",
      protocol: "http",
      apiKey: "abcd"
    }
  },
  searchByFields: ["name", "description", "categories"]
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
  searchClient,
  indexName: "products"
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
//   searchClient
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
  // refinementList({
  //   container: "#categories-list",
  //   attribute: "categories",
  //   searchable: true,
  //   showMore: true,
  //   sortBy: ["name:asc", "count:desc"]
  // }),
  menu({
    container: "#categories-menu",
    attribute: "categories"
  }),
  hierarchicalMenu({
    // TODO: Document how to setup the index in Typesense to use the hierarchical menu
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
  // rangeInput({
  //   container: '#price-range-input', // TODO: Add support once server supports faceting by IntegerFields
  //   attribute: 'price',
  // }),
  // rangeSlider({
  //   container: '#price-range-slider', // TODO: Add support once server supports faceting by IntegerFields
  //   attribute: 'price',
  // }),
  sortBy({
    container: "#sort-by",
    items: [
      { label: "Default", value: "products" },
      { label: "Price (asc)", value: "products/sort/price:asc" }, // TODO Document the indexNaming convention in sortBy, we need to do this custom naming format, since Algolia uses different indices for sorts
      { label: "Price (desc)", value: "products/sort/price:desc" }
    ]
  }),
  hits({
    container: "#hits",
    templates: {
      item: `
        <div>
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>
          <div class="hit-description">
            {{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}
          </div>
          <div class="hit-price">\${{price}}</div>
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
