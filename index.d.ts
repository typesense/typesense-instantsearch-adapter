import type { SearchClient as AlgoliaSearchClient, CompositionClient } from "instantsearch.js";

type SearchClient = CompositionClient | AlgoliaSearchClient;

import type { ConfigurationOptions } from "typesense/lib/Typesense/Configuration";
import type { SearchParamsWithPreset } from "typesense/lib/Typesense/Documents";
import { default as TypesenseSearchClient } from "typesense/lib/Typesense/SearchClient";

interface BaseSearchParameters extends Partial<Omit<SearchParamsWithPreset, "q" | "filter_by">> {
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

interface BaseAdapterOptions {
  server: ConfigurationOptions;
  geoLocationField?: string;
  facetableFieldsWithSpecialCharacters?: string[];
  renderingContent?: object;
  flattenGroupedHits?: boolean;
  facetByOptions?: object;
  collectionSpecificFacetByOptions?: object;
  filterByOptions?: object;
  collectionSpecificFilterByOptions?: object;
  sortByOptions?: object;
  collectionSpecificSortByOptions?: object;
}

interface CollectionSearchParameters {
  [key: string]: BaseSearchParameters;
}

interface AdditionalSearchParametersWithQueryBy extends BaseAdapterOptions {
  additionalSearchParameters: BaseSearchParameters;
}

interface AdditionalSearchParametersOptionalQueryBy extends BaseAdapterOptions {
  additionalSearchParameters?: BaseSearchParameters;
}

interface CollectionSpecificSearchParametersWithQueryBy extends BaseAdapterOptions {
  collectionSpecificSearchParameters: CollectionSearchParameters;
}

interface CollectionSpecificSearchParametersOptionalQueryBy extends BaseAdapterOptions {
  collectionSpecificSearchParameters?: CollectionSearchParameters;
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
  readonly typesenseClient: TypesenseSearchClient;
  constructor(options: TypesenseInstantsearchAdapterOptions);
  clearCache(): SearchClient;
  updateConfiguration(options: TypesenseInstantsearchAdapterOptions): boolean;
}
