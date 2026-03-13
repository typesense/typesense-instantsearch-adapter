import type { SearchClient as AlgoliaSearchClient, CompositionClient } from "instantsearch.js";

type SearchClient = CompositionClient | AlgoliaSearchClient;

import type { ConfigurationOptions } from "typesense/lib/Typesense/Configuration";
import type { DocumentSchema, SearchParamsWithPreset } from "typesense/lib/Typesense/Documents";
import { default as TypesenseSearchClient } from "typesense/lib/Typesense/SearchClient";

interface BaseSearchParameters<T extends DocumentSchema, Infix extends string = string>
  extends Partial<Omit<SearchParamsWithPreset<T, Infix>, "q" | "filter_by">> {
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
  /**
   * For Typesense versions before v30, set to true to use override_tags.
   * For v30+, leave as false (default) to use curation_tags.
   */
  useOverrideTags?: boolean;
  /**
   * Flips negative refinement encoding.
   * AND groups become `field:![a,b]`, OR groups become `field:!a || field:!b`.
   */
  flipNegativeRefinementOperator?: boolean;
}

type CollectionSearchParameters<Infix extends string = string> = Record<
  string,
  BaseSearchParameters<DocumentSchema, Infix>
>;

interface AdditionalSearchParametersWithQueryBy<T extends DocumentSchema, Infix extends string = string>
  extends BaseAdapterOptions {
  additionalSearchParameters: BaseSearchParameters<T, Infix>;
}

interface AdditionalSearchParametersOptionalQueryBy<T extends DocumentSchema, Infix extends string = string>
  extends BaseAdapterOptions {
  additionalSearchParameters?: BaseSearchParameters<T, Infix>;
}

interface CollectionSpecificSearchParametersWithQueryBy<Infix extends string = string> extends BaseAdapterOptions {
  collectionSpecificSearchParameters: CollectionSearchParameters<Infix>;
}

interface CollectionSpecificSearchParametersOptionalQueryBy<Infix extends string = string> extends BaseAdapterOptions {
  collectionSpecificSearchParameters?: CollectionSearchParameters<Infix>;
}

type AdapterOptionsWithQueryByInAdditionalSearchParameters<
  T extends DocumentSchema,
  Infix extends string = string,
> = AdditionalSearchParametersWithQueryBy<T, Infix> & CollectionSpecificSearchParametersOptionalQueryBy<Infix>;
type AdapterOptionWithQueryByInCollectionSpecificSearchParameters<
  T extends DocumentSchema,
  Infix extends string = string,
> = AdditionalSearchParametersOptionalQueryBy<T, Infix> & CollectionSpecificSearchParametersWithQueryBy<Infix>;

type TypesenseInstantsearchAdapterOptions<T extends DocumentSchema = DocumentSchema, Infix extends string = string> =
  | AdapterOptionWithQueryByInCollectionSpecificSearchParameters<T, Infix>
  | AdapterOptionsWithQueryByInAdditionalSearchParameters<T, Infix>;

export default class TypesenseInstantsearchAdapter<
  T extends DocumentSchema = DocumentSchema,
  Infix extends string = string,
> {
  readonly searchClient: SearchClient;
  readonly typesenseClient: TypesenseSearchClient;
  constructor(options: TypesenseInstantsearchAdapterOptions<T, Infix>);
  clearCache(): SearchClient;
  updateConfiguration(options: TypesenseInstantsearchAdapterOptions<T, Infix>): boolean;
}
