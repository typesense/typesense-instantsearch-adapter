import { expectAssignable, expectNotAssignable } from "tsd";
import { TypesenseInstantsearchAdapterOptions } from ".";
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

expectNotAssignable<TypesenseInstantsearchAdapterOptions>({
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

expectNotAssignable<TypesenseInstantsearchAdapterOptions>({
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
