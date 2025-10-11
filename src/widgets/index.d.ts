import type { 
  Connector,
  WidgetFactory,
  WidgetRenderState
} from 'instantsearch.js';

import type { SearchResponse, DocumentSchema} from 'typesense/lib/Typesense/Documents';

import type { SearchResults, AlgoliaSearchHelper as Helper } from 'algoliasearch-helper';

export interface NaturalLanguageUiState {
  refinementList?: Record<string, string[]>;
  numericMenu?: Record<string, string>;
  sortBy?: string;
}


export interface NaturalLanguageSearchResults extends SearchResults {
  parsed_nl_query?: SearchResponse<DocumentSchema>['parsed_nl_query'];
  _naturalLanguageUiState?: NaturalLanguageUiState;
}

// Widget parameters
export interface NaturalLanguageSyncConnectorParams {
  /** Whether to enable debug logging */
  debug?: boolean;
  /** Custom handler for applying UI state changes */
  onStateChange?: (uiState: NaturalLanguageUiState) => void;
}

// For backward compatibility
export interface NaturalLanguageSyncWidgetParams extends NaturalLanguageSyncConnectorParams {}

// Render state for the connector
export interface NaturalLanguageSyncRenderState {
  /** The last natural language UI state that was applied */
  appliedState: NaturalLanguageUiState | null;
  /** Whether natural language parsing is active */
  isActive: boolean;
  /** Debug information if debug mode is enabled */
  debug?: {
    lastParsedQuery?: ParsedNaturalLanguageQuery;
    lastAppliedState?: NaturalLanguageUiState;
    applicationCount?: number;
  };
  /** Widget parameters */
  widgetParams: NaturalLanguageSyncConnectorParams;
}

// Widget description following InstantSearch.js patterns
export interface NaturalLanguageSyncWidgetDescription {
  $$type: 'typesense.naturalLanguageSync';
  renderState: NaturalLanguageSyncRenderState;
  indexRenderState: {
    naturalLanguageSync: WidgetRenderState<
      NaturalLanguageSyncRenderState,
      NaturalLanguageSyncConnectorParams
    >;
  };
  indexUiState: {
    naturalLanguageSync: NaturalLanguageUiState;
  };
}

// Connector type
export type NaturalLanguageSyncConnector = Connector<
  NaturalLanguageSyncWidgetDescription,
  NaturalLanguageSyncConnectorParams
>;

/**
 * Connector for natural language search synchronization
 * Handles the logic of detecting and applying natural language UI state
 */
export const connectNaturalLanguageSync: NaturalLanguageSyncConnector;

// Widget type  
export type NaturalLanguageSyncWidget = WidgetFactory<
  NaturalLanguageSyncWidgetDescription & {
    $$widgetType: 'typesense.naturalLanguageSync';
  },
  NaturalLanguageSyncConnectorParams,
  NaturalLanguageSyncWidgetParams
>;

/**
 * Natural Language Sync Widget
 * A headless widget that automatically synchronizes natural language search results 
 * with InstantSearch UI state
 */
export const naturalLanguageSync: NaturalLanguageSyncWidget;

export default naturalLanguageSync; 