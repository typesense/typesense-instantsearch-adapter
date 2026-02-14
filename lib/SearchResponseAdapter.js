"use strict";

import _typeof from "@babel/runtime/helpers/typeof";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import { utils } from "./support/utils";
export var SearchResponseAdapter = /*#__PURE__*/function () {
  function SearchResponseAdapter(typesenseResponse, instantsearchRequest, configuration) {
    var allTypesenseResults = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var fullTypesenseResponse = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    _classCallCheck(this, SearchResponseAdapter);
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
    this.configuration = configuration;
    this.allTypesenseResults = allTypesenseResults;
    this.fullTypesenseResponse = fullTypesenseResponse;
  }
  return _createClass(SearchResponseAdapter, [{
    key: "_adaptGroupedHits",
    value: function _adaptGroupedHits(typesenseGroupedHits) {
      var _this = this;
      var adaptedResult = [];
      adaptedResult = typesenseGroupedHits.map(function (groupedHit) {
        var adaptedHits = _this._adaptHits(groupedHit.hits);
        adaptedHits.forEach(function (hit) {
          hit["group_key"] = hit["_group_key"] = groupedHit.group_key;
          if (groupedHit.found) {
            hit["_group_found"] = groupedHit.found;
          }
        });
        return adaptedHits;
      });

      // adaptedResult is now in the form of [[{}, {}], [{}, {}], ...]
      //  where each element in the outermost array corresponds to a group.

      if (this.configuration.flattenGroupedHits) {
        // We flatten it to [{}, {}, {}]
        adaptedResult = adaptedResult.flat();
      } else {
        // We flatten it to [{ ..., grouped_hits: [{}, {}] }, {}, {}]
        // We set the first element in the group as the hit, and then add a new key called grouped_hits with the other hits
        adaptedResult = adaptedResult.map(function (adaptedGroupedHit) {
          return _objectSpread(_objectSpread({}, adaptedGroupedHit[0]), {}, {
            _grouped_hits: adaptedGroupedHit
          });
        });
      }
      return adaptedResult;
    }
  }, {
    key: "_adaptHits",
    value: function _adaptHits(typesenseHits) {
      var _this2 = this;
      var adaptedResult = [];
      adaptedResult = typesenseHits.map(function (typesenseHit) {
        var adaptedHit = _objectSpread({}, typesenseHit.document);
        adaptedHit.objectID = typesenseHit.document.id;
        adaptedHit._snippetResult = _this2._adaptHighlightResult(typesenseHit, "snippet");
        adaptedHit._highlightResult = _this2._adaptHighlightResult(typesenseHit, "value");
        adaptedHit._rawTypesenseHit = typesenseHit;

        // We're adding `conversation` into each hit, since there doesn't seem to be any other way to pass this up to Instantsearch outside of hits
        if (_this2.fullTypesenseResponse.conversation) {
          adaptedHit._rawTypesenseConversation = _this2.fullTypesenseResponse.conversation;
        }

        // Add metadata fields to result, if a field with that name doesn't already exist
        ["text_match", "geo_distance_meters", "curated", "text_match_info", "hybrid_search_info", "vector_distance", "collection",
        // Union search specific
        "search_index" // Union search specific
        ].forEach(function (metadataField) {
          if (Object.keys(typesenseHit).includes(metadataField) && !Object.keys(adaptedHit).includes(metadataField)) {
            adaptedHit[metadataField] = typesenseHit[metadataField];
          }
        });
        var geoLocationValue = adaptedHit[_this2.configuration.geoLocationField];
        if (geoLocationValue) {
          adaptedHit._geoloc = {
            lat: geoLocationValue[0],
            lng: geoLocationValue[1]
          };
        }
        return adaptedHit;
      });
      return adaptedResult;
    }
  }, {
    key: "_adaptHighlightResult",
    value: function _adaptHighlightResult(typesenseHit, snippetOrValue) {
      var result = {};

      // If there is a highlight object available (as of v0.24.0),
      // And the highlight object uses the highlight format available in v0.24.0.rcn32 and above
      //  use that instead of the highlights array, since it supports highlights of nested fields
      if (typesenseHit.highlight != null && this.isHighlightPost0240RCN32Format(typesenseHit.highlight)) {
        this.adaptHighlightObject(typesenseHit, result, snippetOrValue);
      } else {
        this.adaptHighlightsArray(typesenseHit, result, snippetOrValue);
      }
      return result;
    }
  }, {
    key: "isHighlightPost0240RCN32Format",
    value: function isHighlightPost0240RCN32Format(highlight) {
      return highlight.full == null && highlight.snippet == null;
    }
  }, {
    key: "adaptHighlightsArray",
    value: function adaptHighlightsArray(typesenseHit, result, snippetOrValue) {
      var _this3 = this;
      // Algolia lists all searchable attributes in this key, even if there are no matches
      // So do the same and then override highlights

      Object.assign.apply(Object, [result].concat(_toConsumableArray(Object.entries(typesenseHit.document).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          attribute = _ref2[0],
          value = _ref2[1];
        return _defineProperty({}, attribute, {
          value: value,
          matchLevel: "none",
          matchedWords: []
        });
      }))));
      typesenseHit.highlights.forEach(function (highlight) {
        result[highlight.field] = {
          value: highlight[snippetOrValue] || highlight["".concat(snippetOrValue, "s")],
          matchLevel: "full",
          matchedWords: highlight.matched_tokens
        };
        if (highlight.indices) {
          result[highlight.field]["matchedIndices"] = highlight.indices;
        }
      });

      // Now convert any values that have an array value
      // Also, replace highlight tag
      Object.entries(result).forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
          k = _ref5[0],
          v = _ref5[1];
        var attribute = k;
        var value = v.value,
          matchLevel = v.matchLevel,
          matchedWords = v.matchedWords,
          matchedIndices = v.matchedIndices;
        if (value == null) {
          result[attribute] = _this3._adaptHighlightNullValue();
        } else if (Array.isArray(value)) {
          // Algolia lists all values of the key in highlights, even those that don't have any highlights
          // So add all values of the array field, including highlights
          result[attribute] = [];
          typesenseHit.document[attribute].forEach(function (unhighlightedValueFromArray, index) {
            if (matchedIndices && matchedIndices.includes(index)) {
              result[attribute].push({
                value: _this3._adaptHighlightTag("".concat(value[matchedIndices.indexOf(index)]), _this3.instantsearchRequest.params.highlightPreTag, _this3.instantsearchRequest.params.highlightPostTag),
                matchLevel: matchLevel,
                matchedWords: matchedWords[index]
              });
            } else if (_typeof(unhighlightedValueFromArray) === "object") {
              // Handle arrays of objects
              // Side note: Typesense does not support highlights for nested objects in this `highlights` array,
              //  so we pass in an empty object below
              result[attribute].push(_this3._adaptHighlightInObjectValue(unhighlightedValueFromArray, {}, snippetOrValue));
            } else {
              result[attribute].push({
                value: "".concat(unhighlightedValueFromArray),
                matchLevel: "none",
                matchedWords: []
              });
            }
          });
        } else if (_typeof(value) === "object") {
          // Handle nested objects
          // Side note: Typesense does not support highlights for nested objects in this `highlights` array,
          //  so we pass in an empty object below
          result[attribute] = _this3._adaptHighlightInObjectValue(value, {}, snippetOrValue);
        } else {
          // Convert all values to strings
          result[attribute].value = _this3._adaptHighlightTag("".concat(value), _this3.instantsearchRequest.params.highlightPreTag, _this3.instantsearchRequest.params.highlightPostTag);
        }
      });
    }
  }, {
    key: "adaptHighlightObject",
    value: function adaptHighlightObject(typesenseHit, result, snippetOrValue) {
      Object.assign(result, this._adaptHighlightInObjectValue(typesenseHit.document, typesenseHit.highlight, snippetOrValue));
    }
  }, {
    key: "_adaptHighlightInObjectValue",
    value: function _adaptHighlightInObjectValue(objectValue, highlightObjectValue, snippetOrValue) {
      var _this4 = this;
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.entries(objectValue).map(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
          attribute = _ref7[0],
          value = _ref7[1];
        var adaptedValue;
        if (value == null) {
          adaptedValue = _this4._adaptHighlightNullValue();
        } else if (Array.isArray(value)) {
          var _highlightObjectValue;
          adaptedValue = _this4._adaptHighlightInArrayValue(value, (_highlightObjectValue = highlightObjectValue === null || highlightObjectValue === void 0 ? void 0 : highlightObjectValue[attribute]) !== null && _highlightObjectValue !== void 0 ? _highlightObjectValue : [], snippetOrValue);
        } else if (_typeof(value) === "object") {
          var _highlightObjectValue2;
          adaptedValue = _this4._adaptHighlightInObjectValue(value, (_highlightObjectValue2 = highlightObjectValue === null || highlightObjectValue === void 0 ? void 0 : highlightObjectValue[attribute]) !== null && _highlightObjectValue2 !== void 0 ? _highlightObjectValue2 : {}, snippetOrValue);
        } else {
          adaptedValue = _this4._adaptHighlightInPrimitiveValue(value, highlightObjectValue === null || highlightObjectValue === void 0 ? void 0 : highlightObjectValue[attribute], snippetOrValue);
        }
        return _defineProperty({}, attribute, adaptedValue);
      }))));
    }
  }, {
    key: "_adaptHighlightInArrayValue",
    value: function _adaptHighlightInArrayValue(arrayValue, highlightArrayValue, snippetOrValue) {
      var _this5 = this;
      return arrayValue.map(function (value, index) {
        var adaptedValue;
        if (value == null) {
          adaptedValue = _this5._adaptHighlightNullValue();
        } else if (Array.isArray(value)) {
          var _highlightArrayValue$;
          adaptedValue = _this5._adaptHighlightInArrayValue(value, (_highlightArrayValue$ = highlightArrayValue === null || highlightArrayValue === void 0 ? void 0 : highlightArrayValue[index]) !== null && _highlightArrayValue$ !== void 0 ? _highlightArrayValue$ : [], snippetOrValue);
        } else if (_typeof(value) === "object") {
          var _highlightArrayValue$2;
          adaptedValue = _this5._adaptHighlightInObjectValue(value, (_highlightArrayValue$2 = highlightArrayValue === null || highlightArrayValue === void 0 ? void 0 : highlightArrayValue[index]) !== null && _highlightArrayValue$2 !== void 0 ? _highlightArrayValue$2 : {}, snippetOrValue);
        } else {
          adaptedValue = _this5._adaptHighlightInPrimitiveValue(value, highlightArrayValue === null || highlightArrayValue === void 0 ? void 0 : highlightArrayValue[index], snippetOrValue);
        }
        return adaptedValue;
      });
    }
  }, {
    key: "_adaptHighlightInPrimitiveValue",
    value: function _adaptHighlightInPrimitiveValue(primitiveValue, highlightPrimitiveValue, snippetOrValue) {
      if (highlightPrimitiveValue != null) {
        var _ref9, _highlightPrimitiveVa;
        return {
          value: this._adaptHighlightTag("".concat((_ref9 = (_highlightPrimitiveVa = highlightPrimitiveValue[snippetOrValue]) !== null && _highlightPrimitiveVa !== void 0 ? _highlightPrimitiveVa : highlightPrimitiveValue["highlight"]) !== null && _ref9 !== void 0 ? _ref9 : highlightPrimitiveValue["snippet"]), this.instantsearchRequest.params.highlightPreTag, this.instantsearchRequest.params.highlightPostTag),
          matchLevel: (highlightPrimitiveValue.matched_tokens || []).length > 0 ? "full" : "none",
          matchedWords: highlightPrimitiveValue.matched_tokens || []
        };
      } else {
        return {
          // Convert all values to strings
          value: this._adaptHighlightTag("".concat(primitiveValue), this.instantsearchRequest.params.highlightPreTag, this.instantsearchRequest.params.highlightPostTag),
          matchLevel: "none",
          matchedWords: []
        };
      }
    }
  }, {
    key: "_adaptHighlightNullValue",
    value: function _adaptHighlightNullValue() {
      return {
        value: "",
        matchLevel: "none",
        matchedWords: []
      };
    }
  }, {
    key: "_adaptFacets",
    value: function _adaptFacets(typesenseFacetCounts) {
      var adaptedResult = {};
      if (Array.isArray(typesenseFacetCounts)) {
        typesenseFacetCounts.forEach(function (facet) {
          Object.assign(adaptedResult, _defineProperty({}, facet.field_name, Object.assign.apply(Object, [{}].concat(_toConsumableArray(facet.counts.map(function (count) {
            return _defineProperty({}, count.value, count.count);
          }))))));
        });
      }
      return adaptedResult;
    }
  }, {
    key: "_adaptFacetStats",
    value: function _adaptFacetStats(typesenseFacetCounts) {
      var adaptedResult = {};
      if (Array.isArray(typesenseFacetCounts)) {
        typesenseFacetCounts.forEach(function (facet) {
          if (facet.stats && Object.keys(facet.stats).length > 0) {
            Object.assign(adaptedResult, _defineProperty({}, facet.field_name, facet.stats));
          }
        });
      }
      return adaptedResult;
    }
  }, {
    key: "_adaptRenderingContent",
    value: function _adaptRenderingContent(typesenseFacetCounts) {
      var _adaptedResult$facetO;
      var adaptedResult = Object.assign({}, this.configuration.renderingContent);

      // Only set facet ordering if the user has not set one
      if (((_adaptedResult$facetO = adaptedResult.facetOrdering) === null || _adaptedResult$facetO === void 0 || (_adaptedResult$facetO = _adaptedResult$facetO.facets) === null || _adaptedResult$facetO === void 0 ? void 0 : _adaptedResult$facetO.order) == null) {
        adaptedResult.facetOrdering = adaptedResult.facetOrdering || {};
        adaptedResult.facetOrdering.facets = adaptedResult.facetOrdering.facets || {};
        adaptedResult.facetOrdering.facets.order = _toConsumableArray(new Set((Array.isArray(typesenseFacetCounts) ? typesenseFacetCounts : []).map(function (fc) {
          return fc["field_name"];
        }).concat(this.allTypesenseResults.map(function (r) {
          return r.facet_counts || [];
        }).flat().map(function (fc) {
          return fc["field_name"];
        }).filter(function (f) {
          return f;
        }))));
      }
      return adaptedResult;
    }
  }, {
    key: "_adaptUserData",
    value: function _adaptUserData(metadata) {
      if (!metadata) return [];
      return Array.isArray(metadata) ? metadata : [metadata];
    }
  }, {
    key: "adapt",
    value: function adapt() {
      var adaptedRenderingContent = this._adaptRenderingContent(this.typesenseResponse.facet_counts || []);

      // For union search, use union_request_params, otherwise use request_params
      var requestParams = this.typesenseResponse.union_request_params ? this.typesenseResponse.union_request_params[0] : this.typesenseResponse.request_params;
      var adaptedResult = _objectSpread({
        hits: this.typesenseResponse.grouped_hits ? this._adaptGroupedHits(this.typesenseResponse.grouped_hits) : this._adaptHits(this.typesenseResponse.hits),
        nbHits: this.typesenseResponse.found,
        page: this.typesenseResponse.union_request_params ? this.typesenseResponse.page // Union search already uses 0-based page
        : this.typesenseResponse.page - 1,
        // Regular search uses 1-based page, convert to 0-based
        nbPages: this._adaptNumberOfPages(),
        hitsPerPage: (requestParams === null || requestParams === void 0 ? void 0 : requestParams.per_page) || 10,
        facets: this._adaptFacets(this.typesenseResponse.facet_counts || []),
        facets_stats: this._adaptFacetStats(this.typesenseResponse.facet_counts || []),
        query: (requestParams === null || requestParams === void 0 ? void 0 : requestParams.q) || "",
        processingTimeMS: this.typesenseResponse.search_time_ms
      }, Object.keys(adaptedRenderingContent).length > 0 ? {
        renderingContent: adaptedRenderingContent
      } : null);

      // Add appliedRules if metadata is present
      if (this.typesenseResponse.metadata) {
        adaptedResult.appliedRules = ["typesense-override"];
        adaptedResult.userData = this._adaptUserData(this.typesenseResponse.metadata);
      }

      // Add parsed_nl_query if natural language search was used
      if (this.typesenseResponse.parsed_nl_query) {
        adaptedResult.parsed_nl_query = this.typesenseResponse.parsed_nl_query;
      }

      // If no results were found for the search, but there is still a conversation response,
      // still send that as a hit so the conversation is accessible via Instantsearch
      if (this.fullTypesenseResponse.conversation && adaptedResult.hits.length === 0) {
        adaptedResult.hits = [{
          _rawTypesenseConversation: this.fullTypesenseResponse.conversation
        }];
      }

      // console.log(adaptedResult);
      return adaptedResult;
    }
  }]);
}();
Object.assign(SearchResponseAdapter.prototype, utils);
//# sourceMappingURL=SearchResponseAdapter.js.map