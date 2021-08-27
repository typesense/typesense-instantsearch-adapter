type SearchClient = object;

interface TypesenseNode {
  host: string;
  port: string;
  protocol: "https" | "http";
  path?: string;
}

interface TypesenseServer {
  apiKey: string;
  nodes: TypesenseNode[];
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
  preSegmentedQuery?: boolean;
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

interface BaseAdapterOptions {
  server: TypesenseServer;
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

type AdapterOptionsWithQueryByInAdditionalSearchParameters = AdditionalSearchParametersWithQueryBy &
  CollectionSpecificSearchParametersOptionalQueryBy;
type AdapterOptionWithQueryByInCollectionSpecificSearchParameters = AdditionalSearchParametersOptionalQueryBy &
  CollectionSpecificSearchParametersWithQueryBy;

type TypesenseInstantsearchAdapterOptions =
  | AdapterOptionWithQueryByInCollectionSpecificSearchParameters
  | AdapterOptionsWithQueryByInAdditionalSearchParameters;

export default class TypesenseInstantsearchAdapter {
  readonly searchClient: SearchClient;
  constructor(options: TypesenseInstantsearchAdapterOptions);
}
