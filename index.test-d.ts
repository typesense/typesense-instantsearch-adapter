import { expectAssignable, expectNotAssignable } from "tsd";
import { TypesenseInstantsearchAdapterOptions, TypesenseNode, TypesenseServer } from ".";

expectAssignable<TypesenseNode>({
  host: "example.com",
  port: "1234",
  protocol: "http",
});

expectAssignable<TypesenseServer>({
  apiKey: "foo",
  nodes: [{ host: "example.com", port: "1234", protocol: "http" }],
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: "1234", protocol: "http" }],
  },
  additionalSearchParameters: { queryBy: "a,b,c" },
  collectionSpecificSearchParameters: {
    books: {
      queryBy: "a, b, c",
    },
    books1: {
      queryBy: "h, i, j",
    },
  },
});

expectNotAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: "1234", protocol: "http" }],
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
    nodes: [{ host: "example.com", port: "1234", protocol: "http" }],
  },
  additionalSearchParameters: { queryBy: "a,b,c" },
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
    nodes: [{ host: "example.com", port: "1234", protocol: "http" }],
  },
  additionalSearchParameters: { includeFields: "title" },
  collectionSpecificSearchParameters: {
    books: {
      queryBy: "a,b,c",
    },
    books1: {
      queryBy: "h,i,j",
    },
  },
});

expectNotAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: "1234", protocol: "http" }],
  },
  additionalSearchParameters: { includeFields: "title" },
  collectionSpecificSearchParameters: {
    books: {
      queryBy: "a,b,c",
    },
    books1: {
      includeFields: "hello",
    },
  },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: "1234", protocol: "http" }],
  },
  additionalSearchParameters: { includeFields: "title", queryBy: "a,b,c" },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: "1234", protocol: "http" }],
  },
  collectionSpecificSearchParameters: {
    books: {
      queryBy: "title",
      includeFields: "title",
    },
    books1: {
      queryBy: "title",
      excludeFields: "hello",
    },
  },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: "1234", protocol: "http" }],
  },
  additionalSearchParameters: { queryBy: "a,b,c" },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: "1234", protocol: "http" }],
  },
  additionalSearchParameters: { queryBy: "a,b,c", highlightFullFields: "abc" },
});

expectAssignable<TypesenseInstantsearchAdapterOptions>({
  server: {
    apiKey: "foo",
    nodes: [{ host: "example.com", port: "1234", protocol: "http" }],
  },
  additionalSearchParameters: { queryBy: "a,b,c", sortBy: "a" },
});
