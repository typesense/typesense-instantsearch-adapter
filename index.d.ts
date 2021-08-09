type SearchClient = object;

export interface TypesenseNode {
  host: string;
  port: string;
  protocol: string;
}

export interface TypesenseAdditionalSearchParameters {
  queryBy: string;
  queryByWeights?: string;
  prefix?: string;
  filterBy?: string;
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

export interface TypesenseInstantsearchAdapterOptions {
  server?: TypesenseServer;
  additionalSearchParameters: TypesenseAdditionalSearchParameters;
}

export default class TypesenseInstantsearchAdapter {
  readonly searchClient: SearchClient;

  constructor(options: TypesenseInstantsearchAdapterOptions);
}
