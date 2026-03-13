import { expectAssignable, expectError, expectNotAssignable } from "tsd";
import TypesenseInstantsearchAdapter, { TypesenseInstantsearchAdapterOptions } from ".";
import { NodeConfiguration } from "typesense/lib/Typesense/Configuration";

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: 1234, protocol: "http" }],
  },
  additionalSearchParameters: { query_by: "a,b,c" },
  collectionSpecificSearchParameters: {
    books: {
      query_by: "a, b, c",
    },
    books1: {
      query_by: "h, i, j",
    },
  },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: 1234, protocol: "http" }],
  },
  additionalSearchParameters: { hiddenHits: "1, 2, 3" },
  collectionSpecificSearchParameters: {
    books: {
      hiddenHits: "5160, 3780",
    },
  },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: 1234, protocol: "http" }],
  },
  additionalSearchParameters: { query_by: "a,b,c" },
  collectionSpecificSearchParameters: {
    books: {
      includeFields: "title",
    },
    books1: {
      excludeFields: "hello",
    },
  },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: 1234, protocol: "http" }],
  },
  additionalSearchParameters: { includeFields: "title" },
  collectionSpecificSearchParameters: {
    books: {
      query_by: "a,b,c",
    },
    books1: {
      query_by: "h,i,j",
    },
  },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: 1234, protocol: "http" }],
  },
  additionalSearchParameters: { includeFields: "title" },
  collectionSpecificSearchParameters: {
    books: {
      query_by: "a,b,c",
    },
    books1: {
      includeFields: "hello",
    },
  },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: 1234, protocol: "http" }],
  },
  additionalSearchParameters: { includeFields: "title", query_by: "a,b,c" },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: 1234, protocol: "http" }],
  },
  collectionSpecificSearchParameters: {
    books: {
      query_by: "title",
      includeFields: "title",
    },
    books1: {
      query_by: "title",
      excludeFields: "hello",
    },
  },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: 1234, protocol: "http" }],
  },
  additionalSearchParameters: { query_by: "a,b,c" },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: 1234, protocol: "http" }],
  },
  additionalSearchParameters: { query_by: "a,b,c", highlightFullFields: "abc" },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: 1234, protocol: "http" }],
  },
  additionalSearchParameters: { query_by: "a,b,c", sort_by: "a" },
});

const genericInfix = "off,yes,not";

new TypesenseInstantsearchAdapter({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: 1234, protocol: "http" }],
  },
  additionalSearchParameters: { query_by: "d", infix: "off,fallback, off, always" },
});

expectError(
  new TypesenseInstantsearchAdapter({
    server: {
      apiKey: "foo",
      nodes: [{ host: "example.com", port: 1234, protocol: "http" }],
    },
    additionalSearchParameters: { query_by: "d", infix: genericInfix },
  }),
);

expectError(
  new TypesenseInstantsearchAdapter({
    server: {
      apiKey: "foo",
      nodes: [{ host: "example.com", port: 1234, protocol: "http" }],
    },
    additionalSearchParameters: { query_by: "d", infix: "off,yes,not" },
  }),
);

expectNotAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    nodes: [
      {
        port: "443",
        host: "server.harisaran.live",
        protocol: "https",
      },
    ],
  },
});

expectNotAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    nodes: [
      {
        port: "443",
        host: "server.harisaran.live",
        protocol: "https",
      },
    ],
    apiKey: "foo",
  },
});
