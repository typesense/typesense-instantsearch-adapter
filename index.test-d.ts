import { expectAssignable } from "tsd";
import {
  TypesenseInstantsearchAdapterOptions,
  TypesenseNode,
  TypesenseServer,
} from ".";

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
  additionalSearchParameters: { queryBy: "a,b,c" },
  collectionSpecificSearchParameters: {
    books: {
      queryBy: "a, b, c"
    },
    books1: {
      queryBy: "h, i, j",
    }
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
