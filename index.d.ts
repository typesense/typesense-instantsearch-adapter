type SearchClient = any;

import type { ConfigurationOptions } from "typesense/lib/Typesense/Configuration";
import type { SearchParams } from "typesense/lib/Typesense/Documents";

interface BaseSearchParameters extends Omit<SearchParams, "q" | "query_by" | "filter_by"> {
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  queryByWeights?: string;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  sortBy?: string;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  maxFacetValues?: number;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  perPage?: number;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  includeFields?: string;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  excludeFields?: string;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  highlightFields?: string;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  highlightFullFields?: string;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  numTypos?: string;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  typoTokensThreshold?: number;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  dropTokensThreshold?: number;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  pinnedHits?: string;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  hiddenHits?: string;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  enableOverrides?: boolean;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  preSegmentedQuery?: boolean;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  limitHits?: number;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  groupBy?: string;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  groupLimit?: number;
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  exhaustiveSearch?: boolean;
}

interface SearchParametersWithQueryBy extends BaseSearchParameters {
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  queryBy?: string;
  query_by: string;
}

interface SearchParametersOptionalQueryBy extends BaseSearchParameters {
  /**
   * @deprecated Please use the snake_cased version of this parameter
   */
  queryBy?: string;
  query_by?: string;
}

interface CollectionSearchParametersWithQueryBy {
  [key: string]: SearchParametersWithQueryBy;
}

interface CollectionSearchParametersOptionalQueryBy {
  [key: string]: SearchParametersOptionalQueryBy;
}

interface BaseAdapterOptions {
  server: ConfigurationOptions;
  geoLocationField?: string;
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
  clearCache(): SearchClient;
  updateConfiguration(options: TypesenseInstantsearchAdapterOptions): boolean;
}
