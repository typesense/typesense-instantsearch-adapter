# Typesense Instantsearch Adapter

An adapter to use the awesome [Instantsearch.js](https://github.com/algolia/instantsearch.js) library with a [Typesense](https://typesense.org) Search Server, to build rich search interfaces.

[![NPM version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/typesense/typesense-instantsearch-adapter.svg?style=shield)](https://circleci.com/gh/typesense/typesense-instantsearch-adapter)

Here is an example of UI you can build with this adapater: [songs-search.typesense.org](https://songs-search.typesense.org)

**Note:** If your search interface is built on a custom autocomplete component, or is based on [@algolia/autocomplete-js](https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/what-is-autocomplete/), then you don't need this adapter to use it with Typesense, as [typesense-js](https://github.com/typesense/typesense-js) library already supports client-side fetching data from any async data sources. Read more [here](https://github.com/typesense/typesense-instantsearch-adapter/issues/88#issuecomment-1021597634).

## Quick Links

- [Background](#background)
- [Quick Start](#quick-start)
  - [Starter App](#starter-app)
- [Installation](#installation)
- [Usage](#usage)
  - [With instantsearch.js](#with-instantsearchjs)
  - [With react-instantsearch](#with-react-instantsearch) (also works with React Native)
  - [With vue-instantsearch](#with-vue-instantsearch)
  - [With angular-instantsearch](#with-angular-instantsearch)
- [Widget Specific Instructions](#widget-specific-instructions)
- [Compatibility](#compatibility)
- [Development](#development)
- [Help](#help)

## Background

The good folks over at Algolia have built and open-sourced [Instantsearch.js](https://github.com/algolia/instantsearch.js) which is a collection of out-of-the-box components that you can use to build interactive search experiences swiftly.

With the adapter in this repository, you'll be able to use [Instantsearch](https://github.com/algolia/instantsearch.js) (and its [React](https://github.com/algolia/react-instantsearch), [Vue](https://github.com/algolia/vue-instantsearch) and [Angular](https://github.com/algolia/angular-instantsearch) cousins) with data indexed in a Typesense search server.

If you haven't used Instantsearch before, we recommend going through their Getting Started guide [here](https://www.algolia.com/doc/guides/building-search-ui/getting-started/js/#build-a-simple-ui).
Once you go through the guide, follow the instructions below to plug the Typesense adapter into Instantsearch.

## Quick Start

Here's a guide on building a quick search interface with Typesense and InstantSearch.js: [https://typesense.org/docs/0.20.0/guide/search-ui-components.html](https://typesense.org/docs/0.20.0/guide/search-ui-components.html)

### Starter App

Here's a demo starter app that shows you how to use the adapter: [https://github.com/typesense/typesense-instantsearch-demo](https://github.com/typesense/typesense-instantsearch-demo)

## Installation

```shell
$ npm install --save typesense-instantsearch-adapter @babel/runtime
```

or

```shell
$ yarn add typesense-instantsearch-adapter @babel/runtime
```

or, you can also directly include the adapter via a script tag in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/typesense-instantsearch-adapter@2/dist/typesense-instantsearch-adapter.min.js"></script>

<!-- You might want to pin the version of the adapter used if you don't want to always receive the latest minor version -->
```

Since this is an adapter, it **will not install** the Instantsearch library automatically for you. You need to install one of the following in your application directly:

- [instantsearch.js](https://github.com/algolia/instantsearch.js)
- [react-instantsearch](https://github.com/algolia/react-instantsearch)
- [vue-instantsearch](https://github.com/algolia/vue-instantsearch)
- [angular-instantsearch](https://github.com/algolia/angular-instantsearch)

You'll find information on how to get started with each of the above libraries in their respective repos.

We'd also recommend checking out [create-instantsearch-app](https://github.com/algolia/create-instantsearch-app) to create your Search UI from a starter template.

## Usage

### With [instantsearch.js](https://github.com/algolia/instantsearch.js)

```javascript
import instantsearch from "instantsearch.js";
import { searchBox, hits } from "instantsearch.js/es/widgets";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "abcd", // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: "localhost",
        path: '', // Optional. Example: If you have your typesense mounted in localhost:8108/typesense, path should be equal to '/typesense'
        port: "8108",
        protocol: "http",
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters: {
    query_by: "name,description,categories",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const search = instantsearch({
  searchClient,
  indexName: "products",
});
search.addWidgets([
  searchBox({
    container: "#searchbox",
  }),
  hits({
    container: "#hits",
    templates: {
      item: `
        <div class="hit-name">
          {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
        </div>
      `,
    },
  }),
]);

search.start();
```

You can add any of the Instantsearch widgets [here](https://www.algolia.com/doc/guides/building-search-ui/widgets/showcase/js/) that are [supported](#widget-compatibility) by the adapter.

You'll also find a working example in [test/support/testground](test/support/testground). To run it, run `npm run testground` from the project root folder.

### With [react-instantsearch](https://github.com/algolia/react-instantsearch)

```jsx harmony
import React from "react";
import ReactDOM from "react-dom";
import { SearchBox } from "react-instantsearch-dom";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "abcd", // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: "localhost",
        port: "8108",
        path: '', // Optional. Example: If you have your typesense mounted in localhost:8108/typesense, path should be equal to '/typesense'
        protocol: "http",
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters: {
    query_by: "name,description,categories",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const App = () => (
  <InstantSearch indexName="products" searchClient={searchClient}>
    <SearchBox />
    <Hits />
  </InstantSearch>
);
```

You can then add any of the Instantsearch-React widgets [here](https://www.algolia.com/doc/guides/building-search-ui/widgets/showcase/react/) that are [supported](#widget-compatibility) by the adapter.

The instructions above also apply to React Native.

### With [vue-instantsearch](https://github.com/algolia/vue-instantsearch)

App.vue:

```vue
<template>
  <ais-instant-search :search-client="searchClient" index-name="products">
    <ais-search-box />
    <ais-hits>
      <div slot="item" slot-scope="{ item }">
        <h2>{{ item.name }}</h2>
      </div>
    </ais-hits>
  </ais-instant-search>
</template>

<script>
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "abcd", // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: "localhost",
        path: '', // Optional. Example: If you have your typesense mounted in localhost:8108/typesense, path should be equal to '/typesense'
        port: "8108",
        protocol: "http",
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters: {
    query_by: "name,description,categories",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

export default {
  data() {
    return {
      searchClient,
    };
  },
};
</script>
```

You can then add any of the Instantsearch widgets [here](https://www.algolia.com/doc/guides/building-search-ui/widgets/showcase/vue/) that are [supported](#widget-compatibility) by the adapter.

### With [angular-instantsearch](https://github.com/algolia/angular-instantsearch)

```javascript
// app.component.ts
import { Component } from "@angular/core";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "abcd", // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: "localhost",
        path: '', // Optional. Example: If you have your typesense mounted in localhost:8108/typesense, path should be equal to '/typesense'
        port: "8108",
        protocol: "http",
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters: {
    query_by: "name,description,categories",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  config = {
    indexName: "products",
    searchClient,
  };
}
```

You can then add any of the Instantsearch widgets [here](https://www.algolia.com/doc/guides/building-search-ui/widgets/showcase/angular/) that are [supported](#widget-compatibility) by the adapter.

## Widget Specific Instructions

### `hierarchicalMenu`

For this widget, you want to create independent fields in the collection's schema with this specific naming convention:

- `field.lvl0`
- `field.lvl1`
- `field.lvl2`

for a nested hierarchy of `field.lvl0 > field.lvl1 > field.lvl2`

Each of these fields can also hold an array of values. This is useful for handling multiple hierarchies.

### `sortBy`

When instantiating this widget, you want to set the value of the index name to this particular format:

```javascript
search.addWidgets([
  sortBy({
    container: "#sort-by",
    items: [
      { label: "Default", value: "products" },
      { label: "Price (asc)", value: "products/sort/price:asc" },
      { label: "Price (desc)", value: "products/sort/price:desc" },
    ],
  }),
]);
```

The generalized pattern for the value attribute is: `<index_name>[/sort/<sort_by>]`. The adapter will use the value in `<sort_by>` as the value for the `sort_by` search parameter.

### `configure`

If you need to specify a `filter_by` search parameter for Typesense, you want to use the `configure` InstantSearch widget, along with `facetFilters`, `numericFilters` or `filters`.

The format for `facetFilters` and `numericFilters` is the same as Algolia's as described [here](https://www.algolia.com/doc/api-reference/api-parameters/facetFilters/).
But `filters` needs to be in Typesense's `filter_by` format as described in this table [here](https://typesense.org/docs/latest/api/documents.html#query-parameters).

Setting `filter_by` inside the `additionalQueryParameters` config only works when the widgets are loaded initially, because InstantSearch internally overrides the `filter_by` field subsequently.
Read more [here](https://github.com/typesense/typesense-instantsearch-adapter/issues/17#issuecomment-746912375).

### `index`

For Federated / Multi-Index Search, you'd need to use the `index` widget. To then be able to specify different search parameters for each index/collection, you can specify them using the `collectionSpecificSearchParameters` configuration:

```js
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "abcd", // Be sure to use an API key that only allows search operations
    nodes: [{ host: "localhost", path:'/', port: "8108", protocol: "http" }],
  },
  // Search parameters that are common to all collections/indices go here:
  additionalSearchParameters: {
    numTypos: 3,
  },
  // Search parameters that need to be *overridden* on a per-collection-basis go here:
  collectionSpecificSearchParameters: {
    products: {
      query_by: "name,description,categories",
    },
    brands: {
      query_by: "name",
    },
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
```

Essentially, any parameters set in `collectionSpecificSearchParameters` will be merged with the values in `additionalSearchParameters` when querying Typesense, effectively overriding values in `additionalSearchParameters` on a per-collection-basis.

### `geoSearch`

Algolia uses `_geoloc` by default for the name of the field that stores the lat long values for a record.
In Typesense, you can name the geo location field anything. If you use a name other than `_geoloc`, you need to specify it when initializing the adapter like below, so InstantSearch can access it:

```js
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "xyz",
    nodes: [
      {
        host: "localhost",
        port: "8108",
        path: "/",
        protocol: "http",
      },
    ],
  },
  geoLocationField: "lat_lng_field", // <<======
  additionalSearchParameters,
});
```

## Compatibility

| Typesense Server | typesense-instantsearch-adapter | instantsearch.js | react-instantsearch | vue-instantsearch | angular-instantsearch |
| ---------------- | ------------------------------- | ---------------- | ------------------- | ----------------- | --------------------- |
| \>= v0.21        | \>= v2.0.0                      | \>= 4.2.0        | \>= 6.0.0           | \>= 2.2.1         | \>= 3.0.0             |
| \>= v0.19        | \>= v1.0.0                      | \>= 4.2.0        | \>= 6.0.0           | \>= 2.2.1         | \>= 3.0.0             |
| \>= v0.15        | \>= v0.3.0                      | \>= 4.2.0        | \>= 6.0.0           | \>= 2.2.1         | \>= 3.0.0             |
| \>= v0.14        | \>= v0.2.0                      | \>= 4.2.0        | \>= 6.0.0           | \>= 2.2.1         | \>= 3.0.0             |
| \>= v0.13        | \>= v0.1.0                      | \>= 4.2.0        | \>= 6.0.0           | \>= 2.2.1         | \>= 3.0.0             |
| \>= v0.12        | \>= v0.0.4                      | \>= 4.2.0        | \>= 6.0.0           | \>= 2.2.1         | \>= 3.0.0             |

If a particular version of the above libraries don't work with the adapter, please open a Github issue with details.

### Widget Compatibility

This adapter works with all widgets in [this list](https://www.algolia.com/doc/api-reference/widgets/js/), _except_ for the following:

- `queryRuleCustomData`
- `queryRuleContext`

## Development

```shell
$ npm install
$ npm run typesenseServer
$ FORCE_REINDEX=true npm run indexTestData

$ npm link typesense-instantsearch-adapter
$ npm run testground

$ npm test
```

To release a new version, we use the [np](https://github.com/sindresorhus/np) package:

```shell
$ npm install --global np
$ np

# Follow instructions that np shows you

```

## Help

If you have any questions or run into any problems, please create a Github issue and we'll try our best to help.

© 2020-present Typesense, Inc.

[npm-image]: https://badge.fury.io/js/typesense-instantsearch-adapter.svg
[npm-url]: https://npmjs.org/package/typesense-instantsearch-adapter
