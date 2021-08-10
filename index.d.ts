type SearchClient = object;

interface TypesenseNode {
  host: string;
  port: string;
  protocol: string;
  path?: string;
}

interface BaseSearchParameters {
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

interface SearchParametersWithQueryBy extends BaseSearchParameters {
  queryBy: string;
}

interface SearchParametersOptionalQueryBy extends BaseSearchParameters {
  queryBy?: string;
}

interface CollectionSearchParametersWithQueryBy {
  [key: string]: SearchParametersWithQueryBy;
}

interface CollectionSearchParametersOptionalQueryBy {
  [key: string]: SearchParametersOptionalQueryBy;
}

interface TypesenseServer {
  apiKey: string;
  nodes: TypesenseNode[];
}

interface BaseAdapterOptions {
  server?: TypesenseServer;
  geoLocationField?: string;
  cacheSearchResultsForSeconds?: number;
}

interface AdditionalSearchParametersWithQueryBy extends BaseAdapterOptions {
  additionalSearchParameters: SearchParametersWithQueryBy;
}

interface AdditionalSearchParametersOptionalQueryBy extends BaseAdapterOptions {
  additionalSearchParameters?: SearchParametersOptionalQueryBy;
}


interface CollectionSpecificSearchParametersWithQueryBy extends BaseAdapterOptions {
  collectionSpecificSearchParameters: CollectionSearchParametersWithQueryBy;
}

interface CollectionSpecificSearchParametersOptionalQueryBy extends BaseAdapterOptions {
  collectionSpecificSearchParameters?: CollectionSearchParametersOptionalQueryBy;
}

type AdapterOptions1 = AdditionalSearchParametersWithQueryBy & CollectionSpecificSearchParametersOptionalQueryBy;
type AdapterOption2 = AdditionalSearchParametersOptionalQueryBy & CollectionSpecificSearchParametersWithQueryBy;

type TypesenseInstantsearchAdapterOptions = AdapterOption2 | AdapterOptions1;

export default class TypesenseInstantsearchAdapter {
  readonly searchClient: SearchClient;
  constructor(options: TypesenseInstantsearchAdapterOptions);
}
