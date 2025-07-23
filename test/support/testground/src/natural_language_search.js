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
  numericMenu,
  ratingMenu,
} from "instantsearch.js/es/widgets";

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { naturalLanguageSync } from "typesense-instantsearch-adapter/widgets";

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
    query_by: "name,description,categories",
    nl_query: true,
    nl_model_id: "model-test",
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
  searchClient,
  indexName: "products",
  routing: true,
});

function displayParsedNLQuery(results) {
  const parsedNLDiv = document.getElementById("parsed-nl-query");
  const parsedNLContent = document.getElementById("parsed-nl-content");

  if (results && results.parsed_nl_query) {
    parsedNLDiv.style.display = "block";
    parsedNLContent.textContent = JSON.stringify(results.parsed_nl_query, null, 2);
  } else {
    parsedNLDiv.style.display = "none";
  }
}

search.addWidgets([
  searchBox({
    container: "#searchbox",
    placeholder: "Try: 'best rated phones under 500 dollars'",
  }),

  naturalLanguageSync({
    debug: true,
    onStateChange: (uiState) => {
      console.log("[Natural Language] UI state change detected:", uiState);
    },
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
      { label: "Rating (desc)", value: "products/sort/rating:desc" },
      { label: "Rating (asc)", value: "products/sort/rating:asc" },
      { label: "Popularity (desc)", value: "products/sort/popularity:desc" },
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
        found in {{processingTimeMS}}ms
      `,
    },
  }),
]);

search.start();

search.on("render", () => {
  const results = search.helper.lastResults;

  if (results) {
    let resultToCheck = results;

    if (results.results && results.results[0]) {
      resultToCheck = results.results[0];
    } else if (results._rawResults && results._rawResults[0]) {
      resultToCheck = results._rawResults[0];
    }

    displayParsedNLQuery(resultToCheck);
  }
});
