import type { SearchClient as AlgoliaSearchClient, CompositionClient } from "instantsearch.js";

type SearchClient = CompositionClient | AlgoliaSearchClient;

import type { ConfigurationOptions } from "typesense/lib/Typesense/Configuration";
import type { DocumentSchema, SearchParams, SearchParamsWithPreset } from "typesense/lib/Typesense/Documents";
import { OperationMode } from "typesense/lib/Typesense/Documents";
import { default as TypesenseSearchClient } from "typesense/lib/Typesense/SearchClient";
import { arrayableParams } from "typesense/lib/Typesense/Types";

type SearchParamsWithoutArray<TDoc extends DocumentSchema, Infix extends string> = {
  [K in keyof SearchParams<TDoc, Infix>]: K extends keyof typeof arrayableParams
    ? Exclude<SearchParams<TDoc, Infix>[K], any[]>
    : SearchParams<TDoc, Infix>[K];
};

interface BaseSearchParameters<T extends DocumentSchema = DocumentSchema, Infix extends string = string>
  extends Partial<Omit<SearchParamsWithoutArray<T, Infix>, "q" | "filter_by" | "infix">> {
  preset?: string;
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

  infix?: OperationMode | (string & {});
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

type CollectionSearchParameters = Record<string, BaseSearchParameters<DocumentSchema>>;

interface AdditionalSearchParametersWithQueryBy<T extends DocumentSchema> extends BaseAdapterOptions {
  additionalSearchParameters: BaseSearchParameters<T>;
}

interface AdditionalSearchParametersOptionalQueryBy<T extends DocumentSchema> extends BaseAdapterOptions {
  additionalSearchParameters?: BaseSearchParameters<T>;
}

interface CollectionSpecificSearchParametersWithQueryBy extends BaseAdapterOptions {
  collectionSpecificSearchParameters: CollectionSearchParameters;
}

interface CollectionSpecificSearchParametersOptionalQueryBy extends BaseAdapterOptions {
  collectionSpecificSearchParameters?: CollectionSearchParameters;
}

type AdapterOptionsWithQueryByInAdditionalSearchParameters<T extends DocumentSchema> =
  AdditionalSearchParametersWithQueryBy<T> & CollectionSpecificSearchParametersOptionalQueryBy;
type AdapterOptionWithQueryByInCollectionSpecificSearchParameters<T extends DocumentSchema> =
  AdditionalSearchParametersOptionalQueryBy<T> & CollectionSpecificSearchParametersWithQueryBy;

type TypesenseInstantsearchAdapterOptions<T extends DocumentSchema = DocumentSchema> =
  | AdapterOptionWithQueryByInCollectionSpecificSearchParameters<T>
  | AdapterOptionsWithQueryByInAdditionalSearchParameters<T>;

export default class TypesenseInstantsearchAdapter<T extends DocumentSchema = DocumentSchema> {
  readonly searchClient: SearchClient;
  readonly typesenseClient: TypesenseSearchClient;
  constructor(options: TypesenseInstantsearchAdapterOptions<T>);
  clearCache(): SearchClient;
  updateConfiguration(options: TypesenseInstantsearchAdapterOptions<T>): boolean;
}
