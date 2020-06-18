# Typesense Instantsearch Adapter

An adapter to use the awesome [Instantsearch.js](https://github.com/algolia/instantsearch.js) library with a [Typesense](https://typesense.org) Search Server, to build rich search interfaces.

[![NPM version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/typesense/typesense-instantsearch-adapter.svg?style=shield)](https://circleci.com/gh/typesense/typesense-instantsearch-adapter)

## Background

The good folks over at Algolia have built and open-sourced [Instantsearch.js](https://github.com/algolia/instantsearch.js) which is a collection of out-of-the-box components that you can use to build interactive search experiences swiftly.

With the adapter in this repository, you'll be able to use [Instantsearch](https://github.com/algolia/instantsearch.js) (and its [React](https://github.com/algolia/react-instantsearch), [Vue](https://github.com/algolia/vue-instantsearch) and [Angular](https://github.com/algolia/angular-instantsearch) cousins) with data indexed in a Typesense search server.

If you haven't used Instantsearch before, we recommend going through their Getting Started guide [here](https://www.algolia.com/doc/guides/building-search-ui/getting-started/js/#build-a-simple-ui).
Once you go through the guide, follow the instructions below to plug the Typesense adapter into Instantsearch.

## Quick Start

Here's a guide on building a quick search interface with Typesense and InstantSearch.js: [https://typesense.org/docs/0.12.0/guide/#search-ui](https://typesense.org/docs/0.12.0/guide/#search-ui)

Here's a demo app that showcases the adapter in action: [https://github.com/typesense/typesense-instantsearch-demo](https://github.com/typesense/typesense-instantsearch-demo)

## Installation

```shell
$ npm install --save typesense-instantsearch-adapter
```

or

```shell
$ yarn add typesense-instantsearch-adapter
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
    apiKey: "abcd", // Be sure to use the search-only-api-key
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http"
      }
    ]
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below. 
  //  queryBy is required. 
  additionalSearchParameters: {
    queryBy: "name,description,categories"
  }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;


const search = instantsearch({
  searchClient,
  indexName: "products"
});
search.addWidgets([
  searchBox({
    container: "#searchbox"
  }),
  hits({
    container: "#hits",
    templates: {
      item: `
        <div class="hit-name">
          {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
        </div>
      `
    }
  })
]);
```

You can add any of the Instantsearch widgets [here](https://www.algolia.com/doc/guides/building-search-ui/widgets/showcase/js/) that are [supported](#widget-compatibility) by the adapter.

You'll also find a working example in [test/support/testground](test/support/testground). To run it, run `npm run testground` from the project root folder.

### With [react-instantsearch](https://github.com/algolia/react-instantsearch)
```jsx harmony
import React from 'react';
import ReactDOM from 'react-dom';
import { SearchBox } from 'react-instantsearch-dom';
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "abcd", // Be sure to use the search-only-api-key
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http"
      }
    ]
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below. 
  //  queryBy is required. 
  additionalSearchParameters: {
    queryBy: "name,description,categories"
  }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const App = () => (
  <InstantSearch
    indexName="products"
    searchClient={searchClient}
  >
    <SearchBox />
    <Hits />
  </InstantSearch>
);
```

You can then add any of the Instantsearch-React widgets [here](https://www.algolia.com/doc/guides/building-search-ui/widgets/showcase/react/) that are [supported](#widget-compatibility) by the adapter.

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
    apiKey: "abcd", // Be sure to use the search-only-api-key
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http"
      }
    ]
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below. 
  //  queryBy is required. 
  additionalSearchParameters: {
    queryBy: "name,description,categories"
  }
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
import { Component } from '@angular/core';
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "abcd", // Be sure to use the search-only-api-key
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http"
      }
    ]
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below. 
  //  queryBy is required. 
  additionalSearchParameters: {
    queryBy: "name,description,categories"
  }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  config = {
    indexName: 'products',
    searchClient
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
        { label: "Price (desc)", value: "products/sort/price:desc" }
      ]
    })
])
```

The generalized pattern for the value attribute is: `<index_name>[/sort/<sort_by>]`. The adapter will use the value in `<sort_by>` as the value for the `sort_by` search parameter.  

## Compatibility

| Typesense Server | typesense-instantsearch-adapter | instantsearch.js | react-instantsearch | vue-instantsearch | angular-instantsearch |
|------------------|----------------|----------------|----------------|----------------|----------------|
| \>= v0.14 | \>= v0.2.0 | \>= 4.2.0 | \>= 6.0.0 | \>= 2.2.1 | \>= 3.0.0 |
| \>= v0.13 | \>= v0.1.0 | \>= 4.2.0 | \>= 6.0.0 | \>= 2.2.1 | \>= 3.0.0 |
| \>= v0.12 | \>= v0.0.4 | \>= 4.2.0 | \>= 6.0.0 | \>= 2.2.1 | \>= 3.0.0 |

If a particular version of the above libraries don't work with the adapter, please open a Github issue with details.

### Widget Compatibility

This adapter works with all widgets in [this list](https://www.algolia.com/doc/api-reference/widgets/js/), _except_ for the following:

- `geoSearch`
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

© 2020 Typesense, Inc.

[npm-image]: https://badge.fury.io/js/typesense-instantsearch-adapter.svg
[npm-url]: https://npmjs.org/package/typesense-instantsearch-adapter
