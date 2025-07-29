import type { 
  Renderer, 
  Unmounter, 
  InstantSearch,
  UiState
} from 'instantsearch.js';

// Import SearchResults and Helper from algoliasearch-helper
import type { SearchResults, AlgoliaSearchHelper as Helper } from 'algoliasearch-helper';

// Types for the natural language data structures
export interface NaturalLanguageUiState {
  refinementList?: Record<string, string[]>;
  numericMenu?: Record<string, string>;
  sortBy?: string;
}

export interface ParsedNaturalLanguageQuery {
  generated_params?: {
    filter_by?: string;
    sort_by?: string;
    q?: string;
  };
  augmented_params?: {
    filter_by?: string;
    sort_by?: string;
    q?: string;
  };
  parse_time_ms?: number;
}

export interface NaturalLanguageSearchResults extends SearchResults {
  parsed_nl_query?: ParsedNaturalLanguageQuery;
  _naturalLanguageUiState?: NaturalLanguageUiState;
  _naturalLanguageParams?: any;
}

// Widget parameters
export interface NaturalLanguageSyncWidgetParams {
  /** Whether to enable debug logging */
  debug?: boolean;
  /** Custom handler for applying UI state changes */
  onStateChange?: (uiState: NaturalLanguageUiState) => void;
}

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
  widgetParams: NaturalLanguageSyncWidgetParams;
}

/**
 * Connector for natural language search synchronization
 * Handles the logic of detecting and applying natural language UI state
 */
export function connectNaturalLanguageSync(
  renderFn: Renderer<NaturalLanguageSyncRenderState, NaturalLanguageSyncWidgetParams>,
  unmountFn?: Unmounter
): (widgetParams?: NaturalLanguageSyncWidgetParams) => any;

/**
 * Natural Language Sync Widget
 * A headless widget that automatically synchronizes natural language search results 
 * with InstantSearch UI state
 */
export function naturalLanguageSync(params?: NaturalLanguageSyncWidgetParams): any;

export default naturalLanguageSync; 