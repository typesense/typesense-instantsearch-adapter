"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchResponseAdapter = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = require("./support/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var SearchResponseAdapter = /*#__PURE__*/function () {
  function SearchResponseAdapter(typesenseResponse, instantsearchRequest, configuration) {
    (0, _classCallCheck2["default"])(this, SearchResponseAdapter);
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
    this.configuration = configuration;
  }

  (0, _createClass2["default"])(SearchResponseAdapter, [{
    key: "_adaptGroupedHits",
    value: function _adaptGroupedHits(typesenseGroupedHits) {
      var _this = this;

      var adaptedResult = [];
      adaptedResult = typesenseGroupedHits.map(function (groupedHit) {
        var adaptedHits = _this._adaptHits(groupedHit.hits);

        adaptedHits.forEach(function (hit) {
          return hit["group_key"] = groupedHit.group_key;
        });
        return adaptedHits;
      }); // adaptedResult is now in the form of [[{}, {}], [{}, {}], ...]
      //  where each element in the outermost array corresponds to a group.
      // We now flatten it to [{}, {}, {}]

      adaptedResult = adaptedResult.flat();
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
        adaptedHit._highlightResult = _this2._adaptHighlightResult(typesenseHit, "value"); // Add metadata fields to result, if a field with that name doesn't already exist

        ["text_match", "geo_distance_meters", "curated", "text_match_info"].forEach(function (metadataField) {
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
      var result = {}; // If there is a highlight object available (as of v0.24.0),
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
      Object.assign.apply(Object, [result].concat((0, _toConsumableArray2["default"])(Object.entries(typesenseHit.document).map(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            attribute = _ref2[0],
            value = _ref2[1];

        return (0, _defineProperty2["default"])({}, attribute, {
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
      }); // Now convert any values that have an array value
      // Also, replace highlight tag

      Object.entries(result).forEach(function (_ref4) {
        var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
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
            } else if ((0, _typeof2["default"])(unhighlightedValueFromArray) === "object") {
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
        } else if ((0, _typeof2["default"])(value) === "object") {
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

      return Object.assign.apply(Object, [{}].concat((0, _toConsumableArray2["default"])(Object.entries(objectValue).map(function (_ref6) {
        var _ref7 = (0, _slicedToArray2["default"])(_ref6, 2),
            attribute = _ref7[0],
            value = _ref7[1];

        var adaptedValue;

        if (value == null) {
          adaptedValue = _this4._adaptHighlightNullValue();
        } else if (Array.isArray(value)) {
          var _highlightObjectValue;

          adaptedValue = _this4._adaptHighlightInArrayValue(value, (_highlightObjectValue = highlightObjectValue === null || highlightObjectValue === void 0 ? void 0 : highlightObjectValue[attribute]) !== null && _highlightObjectValue !== void 0 ? _highlightObjectValue : [], snippetOrValue);
        } else if ((0, _typeof2["default"])(value) === "object") {
          var _highlightObjectValue2;

          adaptedValue = _this4._adaptHighlightInObjectValue(value, (_highlightObjectValue2 = highlightObjectValue === null || highlightObjectValue === void 0 ? void 0 : highlightObjectValue[attribute]) !== null && _highlightObjectValue2 !== void 0 ? _highlightObjectValue2 : {}, snippetOrValue);
        } else {
          adaptedValue = _this4._adaptHighlightInPrimitiveValue(value, highlightObjectValue === null || highlightObjectValue === void 0 ? void 0 : highlightObjectValue[attribute], snippetOrValue);
        }

        return (0, _defineProperty2["default"])({}, attribute, adaptedValue);
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
        } else if ((0, _typeof2["default"])(value) === "object") {
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
      typesenseFacetCounts.forEach(function (facet) {
        Object.assign(adaptedResult, (0, _defineProperty2["default"])({}, facet.field_name, Object.assign.apply(Object, [{}].concat((0, _toConsumableArray2["default"])(facet.counts.map(function (count) {
          return (0, _defineProperty2["default"])({}, count.value, count.count);
        }))))));
      });
      return adaptedResult;
    }
  }, {
    key: "_adaptFacetStats",
    value: function _adaptFacetStats(typesenseFacetCounts) {
      var adaptedResult = {};
      typesenseFacetCounts.forEach(function (facet) {
        if (Object.keys(facet.stats).length > 0) {
          Object.assign(adaptedResult, (0, _defineProperty2["default"])({}, facet.field_name, facet.stats));
        }
      });
      return adaptedResult;
    }
  }, {
    key: "adapt",
    value: function adapt() {
      var adaptedResult = {
        hits: this.typesenseResponse.grouped_hits ? this._adaptGroupedHits(this.typesenseResponse.grouped_hits) : this._adaptHits(this.typesenseResponse.hits),
        nbHits: this.typesenseResponse.found,
        page: this.typesenseResponse.page - 1,
        nbPages: this._adaptNumberOfPages(),
        hitsPerPage: this.typesenseResponse.request_params.per_page,
        facets: this._adaptFacets(this.typesenseResponse.facet_counts || []),
        facets_stats: this._adaptFacetStats(this.typesenseResponse.facet_counts || {}),
        query: this.typesenseResponse.request_params.q,
        processingTimeMS: this.typesenseResponse.search_time_ms
      }; // console.log(adaptedResult);

      return adaptedResult;
    }
  }]);
  return SearchResponseAdapter;
}();

exports.SearchResponseAdapter = SearchResponseAdapter;
Object.assign(SearchResponseAdapter.prototype, _utils.utils);
//# sourceMappingURL=SearchResponseAdapter.js.map