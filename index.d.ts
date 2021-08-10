type SearchClient = object;

export interface TypesenseNode {
  host: string;
  port: string;
  protocol: string;
  path?: string;
}

export interface TypesenseAdditionalSearchParameters {
  queryBy: string;
  queryByWeights?: string;
  prefix?: string;
  sortBy?: string;
  maxFacetValues?: number;
  perPage?: number;
  includeFields?: string;
  excludeFields?: string;
  highlightFields?: string;
  highlightFullFields?: string;
  numTypos?: number;
  typoTokensThreshold?: number;
  dropTokensThreshold?: number;
  pinnedHits?: string;
  hiddenHits?: string;
  enableOverrides?: boolean;
  perSegmentedQuery?: boolean;
  limitHits?: number;
}

export interface TypesenseServer {
  apiKey: string;
  nodes: TypesenseNode[];
}

export interface BaseTypesenseInstantsearchAdapterOptions {
  server?: TypesenseServer;
  geoLocationField?: string;
  cacheSearchResultsForSeconds?: number;
}

export interface AdditionalSearchParameters extends BaseTypesenseInstantsearchAdapterOptions {
  additionalSearchParameters: TypesenseAdditionalSearchParameters;
}

export interface CollectionSpecificSearchParameters extends BaseTypesenseInstantsearchAdapterOptions {
  collectionSpecificSearchParameters: TypesenseCollectionSearchParameters;
}

export type TypesenseInstantsearchAdapterOptions = AdditionalSearchParameters | CollectionSpecificSearchParameters;

export interface TypesenseCollectionSearchParameters {
  [key: string]: TypesenseAdditionalSearchParameters;
}

export default class TypesenseInstantsearchAdapter {
  readonly searchClient: SearchClient;
  constructor(options: TypesenseInstantsearchAdapterOptions);
}
