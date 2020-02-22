"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchResponseAdapter = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SearchResponseAdapter =
/*#__PURE__*/
function () {
  function SearchResponseAdapter(typesenseResponse, instantsearchRequest) {
    (0, _classCallCheck2["default"])(this, SearchResponseAdapter);
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
  }

  (0, _createClass2["default"])(SearchResponseAdapter, [{
    key: "_adaptHits",
    value: function _adaptHits(typesenseHits) {
      var _this = this;

      var adaptedResult = [];
      adaptedResult = typesenseHits.map(function (typesenseHit) {
        var adaptedHit = _objectSpread({}, typesenseHit.document);

        adaptedHit.objectID = typesenseHit.document.id;
        adaptedHit._highlightResult = _this._adaptHighlightResult(typesenseHit); // Todo: Fix Snippets and Highlights

        adaptedHit._snippetResult = adaptedHit._highlightResult;
        return adaptedHit;
      });
      return adaptedResult;
    }
  }, {
    key: "_adaptHighlightTag",
    value: function _adaptHighlightTag(value) {
      return value.replace(new RegExp("<mark>", "g"), this.instantsearchRequest.params.highlightPreTag).replace(new RegExp("</mark>", "g"), this.instantsearchRequest.params.highlightPostTag);
    }
  }, {
    key: "_adaptHighlightResult",
    value: function _adaptHighlightResult(typesenseHit) {
      var _this2 = this;

      // Algolia lists all searchable attributes in this key, even if there are no matches
      // So do the same and then override highlights
      var result = Object.assign.apply(Object, [{}].concat((0, _toConsumableArray2["default"])(Object.entries(typesenseHit.document).map(function (_ref) {
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
          value: highlight.snippet,
          matchLevel: "full",
          matchedWords: [] // Todo: Fix MatchedWords

        };
      }); // Now convert any values that have an array value
      // Also, replace highlight tag

      Object.entries(result).forEach(function (_ref4) {
        var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
            k = _ref5[0],
            v = _ref5[1];

        var attribute = k;
        var value = v.value,
            matchLevel = v.matchLevel,
            matchedWords = v.matchedWords;

        if (Array.isArray(value)) {
          result[attribute] = [];
          value.forEach(function (v) {
            result[attribute].push({
              value: _this2._adaptHighlightTag("".concat(v)),
              matchLevel: matchLevel,
              // TODO: Fix MatchLevel for array
              matchedWords: matchedWords // TODO: Fix MatchedWords for array

            });
          });
        } else {
          // Convert all values to strings
          result[attribute].value = _this2._adaptHighlightTag("".concat(value));
        }
      });
      return result;
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
    key: "_adaptNumberOfPages",
    value: function _adaptNumberOfPages() {
      var result = this.typesenseResponse.found / this.typesenseResponse.hits.length;

      if (Number.isFinite(result)) {
        return Math.ceil(result);
      } else {
        return 1;
      }
    }
  }, {
    key: "adapt",
    value: function adapt() {
      var adaptedResult = {
        hits: this._adaptHits(this.typesenseResponse.hits),
        nbHits: this.typesenseResponse.found,
        page: this.typesenseResponse.page,
        nbPages: this._adaptNumberOfPages(),
        hitsPerPage: this.typesenseResponse.hits.length,
        facets: this._adaptFacets(this.typesenseResponse.facet_counts || []),
        processingTimeMS: this.typesenseResponse.search_time_ms
      };
      return adaptedResult;
    }
  }]);
  return SearchResponseAdapter;
}();

exports.SearchResponseAdapter = SearchResponseAdapter;