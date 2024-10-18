(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TypesenseInstantSearchAdapter"] = factory();
	else
		root["TypesenseInstantSearchAdapter"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Configuration.js":
/*!******************************!*\
  !*** ./src/Configuration.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Configuration: () => (/* binding */ Configuration)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");




var Configuration = /*#__PURE__*/function () {
  function Configuration() {
    var _this$server$cacheSea,
      _options$additionalSe,
      _ref,
      _this$additionalSearc,
      _ref2,
      _this$additionalSearc2,
      _ref3,
      _this$additionalSearc3,
      _ref4,
      _this$additionalSearc4,
      _options$geoLocationF,
      _options$facetableFie,
      _options$collectionSp,
      _this = this,
      _options$flattenGroup,
      _options$facetByOptio,
      _options$filterByOpti,
      _options$sortByOption,
      _options$collectionSp2,
      _options$collectionSp3,
      _options$collectionSp4;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Configuration);
    this.server = options.server || {
      nodes: [{
        host: "localhost",
        port: "8108",
        path: "",
        protocol: "http"
      }]
    };
    this.server.cacheSearchResultsForSeconds = (_this$server$cacheSea = this.server.cacheSearchResultsForSeconds) !== null && _this$server$cacheSea !== void 0 ? _this$server$cacheSea : 2 * 60;
    this.additionalSearchParameters = (_options$additionalSe = options.additionalSearchParameters) !== null && _options$additionalSe !== void 0 ? _options$additionalSe : {};
    this.additionalSearchParameters.query_by = (_ref = (_this$additionalSearc = this.additionalSearchParameters.queryBy) !== null && _this$additionalSearc !== void 0 ? _this$additionalSearc : this.additionalSearchParameters.query_by) !== null && _ref !== void 0 ? _ref : "";
    this.additionalSearchParameters.preset = (_ref2 = (_this$additionalSearc2 = this.additionalSearchParameters.preset) !== null && _this$additionalSearc2 !== void 0 ? _this$additionalSearc2 : this.additionalSearchParameters.preset) !== null && _ref2 !== void 0 ? _ref2 : "";
    this.additionalSearchParameters.sort_by = (_ref3 = (_this$additionalSearc3 = this.additionalSearchParameters.sortBy) !== null && _this$additionalSearc3 !== void 0 ? _this$additionalSearc3 : this.additionalSearchParameters.sort_by) !== null && _ref3 !== void 0 ? _ref3 : "";
    this.additionalSearchParameters.highlight_full_fields = (_ref4 = (_this$additionalSearc4 = this.additionalSearchParameters.highlightFullFields) !== null && _this$additionalSearc4 !== void 0 ? _this$additionalSearc4 : this.additionalSearchParameters.highlight_full_fields) !== null && _ref4 !== void 0 ? _ref4 : this.additionalSearchParameters.query_by;
    this.geoLocationField = (_options$geoLocationF = options.geoLocationField) !== null && _options$geoLocationF !== void 0 ? _options$geoLocationF : "_geoloc";
    this.facetableFieldsWithSpecialCharacters = (_options$facetableFie = options.facetableFieldsWithSpecialCharacters) !== null && _options$facetableFie !== void 0 ? _options$facetableFie : [];
    this.collectionSpecificSearchParameters = (_options$collectionSp = options.collectionSpecificSearchParameters) !== null && _options$collectionSp !== void 0 ? _options$collectionSp : {};
    Object.keys(this.collectionSpecificSearchParameters).forEach(function (collection) {
      var _params$queryBy, _params$preset, _params$sortBy, _ref5, _ref6, _params$highlightFull;
      var params = _this.collectionSpecificSearchParameters[collection];
      params.query_by = (_params$queryBy = params.queryBy) !== null && _params$queryBy !== void 0 ? _params$queryBy : params.query_by;
      params.preset = (_params$preset = params.preset) !== null && _params$preset !== void 0 ? _params$preset : params.preset;
      params.sort_by = (_params$sortBy = params.sortBy) !== null && _params$sortBy !== void 0 ? _params$sortBy : params.sort_by;
      params.highlight_full_fields = (_ref5 = (_ref6 = (_params$highlightFull = params.highlightFullFields) !== null && _params$highlightFull !== void 0 ? _params$highlightFull : params.highlight_full_fields) !== null && _ref6 !== void 0 ? _ref6 : _this.additionalSearchParameters.highlight_full_fields) !== null && _ref5 !== void 0 ? _ref5 : params.query_by;

      // Remove undefined values
      Object.keys(params).forEach(function (key) {
        return params[key] === undefined ? delete params[key] : {};
      });
    });
    this.renderingContent = options.renderingContent;
    this.flattenGroupedHits = (_options$flattenGroup = options.flattenGroupedHits) !== null && _options$flattenGroup !== void 0 ? _options$flattenGroup : true;
    this.facetByOptions = (_options$facetByOptio = options.facetByOptions) !== null && _options$facetByOptio !== void 0 ? _options$facetByOptio : {};
    this.filterByOptions = (_options$filterByOpti = options.filterByOptions) !== null && _options$filterByOpti !== void 0 ? _options$filterByOpti : {};
    this.sortByOptions = (_options$sortByOption = options.sortByOptions) !== null && _options$sortByOption !== void 0 ? _options$sortByOption : {};
    this.collectionSpecificFacetByOptions = (_options$collectionSp2 = options.collectionSpecificFacetByOptions) !== null && _options$collectionSp2 !== void 0 ? _options$collectionSp2 : {};
    this.collectionSpecificFilterByOptions = (_options$collectionSp3 = options.collectionSpecificFilterByOptions) !== null && _options$collectionSp3 !== void 0 ? _options$collectionSp3 : {};
    this.collectionSpecificSortByOptions = (_options$collectionSp4 = options.collectionSpecificSortByOptions) !== null && _options$collectionSp4 !== void 0 ? _options$collectionSp4 : {};
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Configuration, [{
    key: "validate",
    value: function validate() {
      // Warn if camelCased parameters are used, suggest using snake_cased parameters instead
      if (this.additionalSearchParameters.queryBy || Object.values(this.collectionSpecificSearchParameters).some(function (c) {
        return c.queryBy;
      })) {
        console.warn("[typesense-instantsearch-adapter] Please use snake_cased versions of parameters in additionalSearchParameters instead of camelCased parameters. For example: Use query_by instead of queryBy. camelCased parameters will be deprecated in a future version." + " We're making this change so that parameter names are identical to the ones sent to Typesense (which are all snake_cased), and to also keep the types for these parameters in sync with the types defined in typesense-js.");
      }

      /*
       * Either additionalSearchParameters.query_by or additionalSearchParameters.preset needs to be set, or
       *   All collectionSpecificSearchParameters need to have query_by or preset
       *
       * */
      if (this.additionalSearchParameters.query_by.length === 0 && this.additionalSearchParameters.preset.length === 0 && (Object.keys(this.collectionSpecificSearchParameters).length === 0 || Object.values(this.collectionSpecificSearchParameters).some(function (c) {
        return (c.query_by || "").length === 0 && (c.preset || "").length === 0;
      }))) {
        throw new Error("[typesense-instantsearch-adapter] Missing parameter: One of additionalSearchParameters.query_by or additionalSearchParameters.preset needs to be set, or all collectionSpecificSearchParameters need to have either .query_by or .preset set.");
      }
    }
  }]);
}();

/***/ }),

/***/ "./src/FacetSearchResponseAdapter.js":
/*!*******************************************!*\
  !*** ./src/FacetSearchResponseAdapter.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FacetSearchResponseAdapter: () => (/* binding */ FacetSearchResponseAdapter)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _support_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./support/utils */ "./src/support/utils.js");





var FacetSearchResponseAdapter = /*#__PURE__*/function () {
  function FacetSearchResponseAdapter(typesenseResponse, instantsearchRequest) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, FacetSearchResponseAdapter);
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(FacetSearchResponseAdapter, [{
    key: "_adaptFacetHits",
    value: function _adaptFacetHits(typesenseFacetCounts) {
      var _this = this;
      var adaptedResult = {};
      var facet = typesenseFacetCounts.find(function (facet) {
        return facet.field_name === _this.instantsearchRequest.params.facetName;
      });
      adaptedResult = facet.counts.map(function (facetCount) {
        return {
          value: facetCount.value,
          highlighted: _this._adaptHighlightTag(facetCount.highlighted, _this.instantsearchRequest.params.highlightPreTag, _this.instantsearchRequest.params.highlightPostTag),
          count: facetCount.count
        };
      });
      return adaptedResult;
    }
  }, {
    key: "adapt",
    value: function adapt() {
      var adaptedResult = {
        facetHits: this._adaptFacetHits(this.typesenseResponse.facet_counts),
        exhaustiveFacetsCount: true,
        processingTimeMS: this.typesenseResponse.search_time_ms
      };
      return adaptedResult;
    }
  }]);
}();
Object.assign(FacetSearchResponseAdapter.prototype, _support_utils__WEBPACK_IMPORTED_MODULE_2__.utils);

/***/ }),

/***/ "./src/SearchRequestAdapter.js":
/*!*************************************!*\
  !*** ./src/SearchRequestAdapter.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchRequestAdapter: () => (/* binding */ SearchRequestAdapter)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__);







var _excluded = ["q", "conversation", "conversation_id", "conversation_model_id"];

var SearchRequestAdapter = /*#__PURE__*/function () {
  function SearchRequestAdapter(instantsearchRequests, typesenseClient, configuration) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, SearchRequestAdapter);
    this.instantsearchRequests = instantsearchRequests;
    this.typesenseClient = typesenseClient;
    this.configuration = configuration;
    this.additionalSearchParameters = configuration.additionalSearchParameters;
    this.collectionSpecificSearchParameters = configuration.collectionSpecificSearchParameters;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(SearchRequestAdapter, [{
    key: "_shouldUseExactMatchForField",
    value: function _shouldUseExactMatchForField(fieldName, collectionName) {
      var _this$configuration$c, _this$configuration$f;
      if (((_this$configuration$c = this.configuration.collectionSpecificFilterByOptions) === null || _this$configuration$c === void 0 || (_this$configuration$c = _this$configuration$c[collectionName]) === null || _this$configuration$c === void 0 || (_this$configuration$c = _this$configuration$c[fieldName]) === null || _this$configuration$c === void 0 ? void 0 : _this$configuration$c.exactMatch) === false || ((_this$configuration$f = this.configuration.filterByOptions) === null || _this$configuration$f === void 0 || (_this$configuration$f = _this$configuration$f[fieldName]) === null || _this$configuration$f === void 0 ? void 0 : _this$configuration$f.exactMatch) === false) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: "_adaptFacetFilters",
    value: function _adaptFacetFilters(facetFilters, collectionName) {
      var _this = this;
      var adaptedResult = "";
      if (!facetFilters) {
        return adaptedResult;
      }

      /**
       * Need to transform:
       *  facetFilters = [["field1:value1", "field1:value2"], "field2:value3", "field2:value4"]
       *
       * Into this:
       *  field1:=[value1,value2] && field2:=value3 && field2:=value4
       *
       * Steps:
       *  - For each item in facetFilters
       *    - If item is array
       *      - OR values together.
       *      - Warn if field names are not the same
       *    - If item is string, convert to facet:=value format
       *  - Join strings by &&
       */

      var transformedTypesenseFilters = facetFilters.map(function (item) {
        if (Array.isArray(item)) {
          // Need to transform:
          // facetFilters = ["field1:value1", "field1:value2", "facetN:valueN"]
          //
          // Into this:
          // intermediateFacetFilters = {
          //     "field1": ["value1", "value2"],
          //     "fieldN": ["valueN"]
          // }

          var intermediateFacetFilters = {};
          item.forEach(function (facetFilter) {
            var _this$_parseFacetFilt = _this._parseFacetFilter(facetFilter),
              fieldName = _this$_parseFacetFilt.fieldName,
              fieldValue = _this$_parseFacetFilt.fieldValue;
            intermediateFacetFilters[fieldName] = intermediateFacetFilters[fieldName] || [];
            intermediateFacetFilters[fieldName].push(fieldValue);
          });
          if (Object.keys(intermediateFacetFilters).length > 1) {
            console.error("[Typesense-Instantsearch-Adapter] Typesense does not support cross-field ORs at the moment. The adapter could not OR values between these fields: ".concat(Object.keys(intermediateFacetFilters).join(",")));
          }

          // Pick first value from intermediateFacetFilters
          var fieldName = Object.keys(intermediateFacetFilters)[0];
          var fieldValues = intermediateFacetFilters[fieldName];

          // Need to transform:
          // intermediateFacetFilters = {
          //     "field1": ["value1", "value2"],
          // }
          //
          // Into this:
          // field1:=[value1,value2]

          // Partition values into included and excluded values
          var _fieldValues$reduce = fieldValues.reduce(function (result, fieldValue) {
              if (fieldValue.startsWith("-") && !_this._isNumber(fieldValue)) {
                result[0].push(fieldValue.substring(1));
              } else {
                result[1].push(fieldValue);
              }
              return result;
            }, [[], []]),
            _fieldValues$reduce2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_fieldValues$reduce, 2),
            excludedFieldValues = _fieldValues$reduce2[0],
            includedFieldValues = _fieldValues$reduce2[1];
          var typesenseFilterStringComponents = [];
          if (includedFieldValues.length > 0) {
            var operator = _this._shouldUseExactMatchForField(fieldName, collectionName) ? ":=" : ":";
            typesenseFilterStringComponents.push("".concat(fieldName).concat(operator, "[").concat(includedFieldValues.map(function (v) {
              return _this._escapeFacetValue(v);
            }).join(","), "]"));
          }
          if (excludedFieldValues.length > 0) {
            var _operator = _this._shouldUseExactMatchForField(fieldName, collectionName) ? ":!=" : ":!";
            typesenseFilterStringComponents.push("".concat(fieldName).concat(_operator, "[").concat(excludedFieldValues.map(function (v) {
              return _this._escapeFacetValue(v);
            }).join(","), "]"));
          }
          var typesenseFilterString = typesenseFilterStringComponents.filter(function (f) {
            return f;
          }).join(" && ");
          return typesenseFilterString;
        } else {
          // Need to transform:
          //  fieldName:fieldValue
          // Into
          //  fieldName:=fieldValue

          var _this$_parseFacetFilt2 = _this._parseFacetFilter(item),
            _fieldName = _this$_parseFacetFilt2.fieldName,
            fieldValue = _this$_parseFacetFilt2.fieldValue;
          var _typesenseFilterString;
          if (fieldValue.startsWith("-") && !_this._isNumber(fieldValue)) {
            var _operator2 = _this._shouldUseExactMatchForField(_fieldName, collectionName) ? ":!=" : ":!";
            _typesenseFilterString = "".concat(_fieldName).concat(_operator2, "[").concat(_this._escapeFacetValue(fieldValue.substring(1)), "]");
          } else {
            var _operator3 = _this._shouldUseExactMatchForField(_fieldName, collectionName) ? ":=" : ":";
            _typesenseFilterString = "".concat(_fieldName).concat(_operator3, "[").concat(_this._escapeFacetValue(fieldValue), "]");
          }
          return _typesenseFilterString;
        }
      });
      adaptedResult = transformedTypesenseFilters.join(" && ");
      // console.log(`${JSON.stringify(facetFilters)} => ${adaptedResult}`);

      return adaptedResult;
    }
  }, {
    key: "_parseFacetFilter",
    value: function _parseFacetFilter(facetFilter) {
      var _this$configuration$f2;
      var filterStringMatchingRegex, facetFilterMatches, fieldName, fieldValue;

      // This is helpful when the filter looks like `facetName:with:colons:facetValue:with:colons` and the default regex above parses the filter as `facetName:with:colons:facetValue:with` and `colon`.
      // So if a facetValue can contain a colon, we ask users to pass in all possible facetable fields in `facetableFieldsWithSpecialCharacters` when instantiating the adapter, so we can explicitly match against that.
      if (((_this$configuration$f2 = this.configuration.facetableFieldsWithSpecialCharacters) === null || _this$configuration$f2 === void 0 ? void 0 : _this$configuration$f2.length) > 0) {
        // escape any Regex special characters, source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
        var sanitizedFacetableFieldsWithSpecialCharacters = this.configuration.facetableFieldsWithSpecialCharacters.flat().map(function (f) {
          return f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        });
        filterStringMatchingRegex = new RegExp("^(".concat(sanitizedFacetableFieldsWithSpecialCharacters.join("|"), "):(.*)$"));
        facetFilterMatches = facetFilter.match(filterStringMatchingRegex);
        if (facetFilterMatches != null) {
          fieldName = "".concat(facetFilterMatches[1]);
          fieldValue = "".concat(facetFilterMatches[2]);
          return {
            fieldName: fieldName,
            fieldValue: fieldValue
          };
        }
      }

      // If we haven't found any matches yet
      // Use the default filter parsing regex, which assumes that only facet names have colons, and not facet values
      filterStringMatchingRegex = this.constructor.DEFAULT_FACET_FILTER_STRING_MATCHING_REGEX;
      facetFilterMatches = facetFilter.match(filterStringMatchingRegex);

      // console.log(filterStringMatchingRegex);
      // console.log(facetFilter);
      // console.log(facetFilterMatches);

      if (facetFilterMatches == null) {
        console.error("[Typesense-Instantsearch-Adapter] Parsing failed for a facet filter `".concat(facetFilter, "` with the Regex `").concat(filterStringMatchingRegex, "`. If you have field names with special characters, be sure to add them to a parameter called `facetableFieldsWithSpecialCharacters` when instantiating the adapter."));
      } else {
        fieldName = "".concat(facetFilterMatches[1]).concat(facetFilterMatches[2]);
        fieldValue = "".concat(facetFilterMatches[3]);
      }
      return {
        fieldName: fieldName,
        fieldValue: fieldValue
      };
    }
  }, {
    key: "_escapeFacetValue",
    value: function _escapeFacetValue(value) {
      // Don't escape booleans, integers or floats
      if (typeof value === "boolean" || value === "true" || value === "false" || this._isNumber(value)) {
        return value;
      }
      return "`".concat(value, "`");
    }
  }, {
    key: "_isNumber",
    value: function _isNumber(value) {
      return Number.isInteger(value % 1) ||
      // Mod 1 will automatically try converting string values to integer/float
      !!(value % 1); // Is Float
    }
  }, {
    key: "_adaptNumericFilters",
    value: function _adaptNumericFilters(numericFilters) {
      var _this2 = this;
      // Need to transform this:
      // ["field1<=634", "field1>=289", "field2<=5", "field3>=3"]
      // to:
      // "field1:=[634..289] && field2:<=5 && field3:>=3"
      var adaptedResult = "";
      if (!numericFilters) {
        return adaptedResult;
      }

      // Transform to intermediate structure:
      // {
      //   field1: {
      //     "<=": 634,
      //     ">=": 289
      //   },
      //   field2: {
      //     "<=": 5
      //   },
      //   field3: {
      //     ">=": 3
      //   }
      // };
      var filtersHash = {};
      numericFilters.forEach(function (filter) {
        var _this2$_parseNumericF = _this2._parseNumericFilter(filter),
          fieldName = _this2$_parseNumericF.fieldName,
          operator = _this2$_parseNumericF.operator,
          fieldValue = _this2$_parseNumericF.fieldValue;
        filtersHash[fieldName] = filtersHash[fieldName] || {};
        filtersHash[fieldName][operator] = fieldValue;
      });

      // Transform that to:
      //  "field1:=[634..289] && field2:<=5 && field3:>=3"
      var adaptedFilters = [];
      Object.keys(filtersHash).forEach(function (field) {
        if (filtersHash[field]["<="] != null && filtersHash[field][">="] != null) {
          adaptedFilters.push("".concat(field, ":=[").concat(filtersHash[field][">="], "..").concat(filtersHash[field]["<="], "]"));
        } else if (filtersHash[field]["<="] != null) {
          adaptedFilters.push("".concat(field, ":<=").concat(filtersHash[field]["<="]));
        } else if (filtersHash[field][">="] != null) {
          adaptedFilters.push("".concat(field, ":>=").concat(filtersHash[field][">="]));
        } else if (filtersHash[field]["="] != null) {
          adaptedFilters.push("".concat(field, ":=").concat(filtersHash[field]["="]));
        } else {
          console.warn("[Typesense-Instantsearch-Adapter] Unsupported operator found ".concat(JSON.stringify(filtersHash[field])));
        }
      });
      adaptedResult = adaptedFilters.join(" && ");
      return adaptedResult;
    }
  }, {
    key: "_parseNumericFilter",
    value: function _parseNumericFilter(numericFilter) {
      var _this$configuration$f3;
      var filterStringMatchingRegex, numericFilterMatches;
      var fieldName, operator, fieldValue;

      // The following is helpful when the facetName has special characters like > and the default regex fails to parse it properly.
      // So we ask users to pass in facetable fields in `facetableFieldsWithSpecialCharactersWithSpecialCharacters` when instantiating the adapter, so we can explicitly match against that.
      if (((_this$configuration$f3 = this.configuration.facetableFieldsWithSpecialCharacters) === null || _this$configuration$f3 === void 0 ? void 0 : _this$configuration$f3.length) > 0) {
        // escape any Regex special characters, source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
        var sanitizedFacetableFieldsWithSpecialCharacters = this.configuration.facetableFieldsWithSpecialCharacters.map(function (f) {
          return f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        });
        filterStringMatchingRegex = new RegExp("^(".concat(sanitizedFacetableFieldsWithSpecialCharacters.join("|"), ")(<=|>=|>|<|=)(.*)$"));
        numericFilterMatches = numericFilter.match(filterStringMatchingRegex);
        if (numericFilterMatches != null) {
          // If no matches are found or if the above didn't trigger, fall back to the default regex
          var _numericFilterMatches = numericFilterMatches;
          var _numericFilterMatches2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_numericFilterMatches, 4);
          fieldName = _numericFilterMatches2[1];
          operator = _numericFilterMatches2[2];
          fieldValue = _numericFilterMatches2[3];
          return {
            fieldName: fieldName,
            operator: operator,
            fieldValue: fieldValue
          };
        }
      }

      // If we haven't found any matches yet, fall back to the default regex
      filterStringMatchingRegex = this.constructor.DEFAULT_NUMERIC_FILTER_STRING_MATCHING_REGEX;
      numericFilterMatches = numericFilter.match(filterStringMatchingRegex);

      // console.log(filterStringMatchingRegex);
      // console.log(numericFilter);
      // console.log(numericFilterMatches);

      if (numericFilterMatches == null) {
        console.error("[Typesense-Instantsearch-Adapter] Parsing failed for a numeric filter `".concat(numericFilter, "` with the Regex `").concat(filterStringMatchingRegex, "`. If you have field names with special characters, be sure to add them to a parameter called `facetableFieldsWithSpecialCharacters` when instantiating the adapter."));
      } else {
        var _numericFilterMatches3 = numericFilterMatches;
        var _numericFilterMatches4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_numericFilterMatches3, 4);
        fieldName = _numericFilterMatches4[1];
        operator = _numericFilterMatches4[2];
        fieldValue = _numericFilterMatches4[3];
      }
      return {
        fieldName: fieldName,
        operator: operator,
        fieldValue: fieldValue
      };
    }
  }, {
    key: "_adaptGeoFilter",
    value: function _adaptGeoFilter(_ref) {
      var insideBoundingBox = _ref.insideBoundingBox,
        aroundRadius = _ref.aroundRadius,
        aroundLatLng = _ref.aroundLatLng,
        insidePolygon = _ref.insidePolygon;
      // Give this parameter first priority if it exists, since
      if (insideBoundingBox) {
        var x1, y1, x2, y2;
        if (Array.isArray(insideBoundingBox)) {
          var _insideBoundingBox$fl = insideBoundingBox.flat();
          var _insideBoundingBox$fl2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_insideBoundingBox$fl, 4);
          x1 = _insideBoundingBox$fl2[0];
          y1 = _insideBoundingBox$fl2[1];
          x2 = _insideBoundingBox$fl2[2];
          y2 = _insideBoundingBox$fl2[3];
        } else {
          var _insideBoundingBox$sp = insideBoundingBox.split(",");
          var _insideBoundingBox$sp2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_insideBoundingBox$sp, 4);
          x1 = _insideBoundingBox$sp2[0];
          y1 = _insideBoundingBox$sp2[1];
          x2 = _insideBoundingBox$sp2[2];
          y2 = _insideBoundingBox$sp2[3];
        }
        return "".concat(this.configuration.geoLocationField, ":(").concat(x1, ", ").concat(y1, ", ").concat(x1, ", ").concat(y2, ", ").concat(x2, ", ").concat(y2, ", ").concat(x2, ", ").concat(y1, ")");
      }
      if (aroundLatLng || aroundRadius) {
        if (!aroundRadius || aroundRadius === "all") {
          throw new Error("[Typesense-Instantsearch-Adapter] In Typesense, geo-filtering around a lat/lng also requires a numerical radius. " + "So the `aroundRadius` parameter is required when `aroundLatLng` is used. " + "If you intend to just geo-sort around a lat/long, you want to use the sortBy InstantSearch widget (or a virtual sortBy custom widget).");
        }
        var adaptedAroundRadius = "".concat(parseFloat(aroundRadius) / 1000, " km"); // aroundRadius is in meters
        return "".concat(this.configuration.geoLocationField, ":(").concat(aroundLatLng, ", ").concat(adaptedAroundRadius, ")");
      }
      if (insidePolygon) {
        var coordinates = insidePolygon;
        if (Array.isArray(insidePolygon)) {
          coordinates = insidePolygon.flat().join(",");
        }
        return "".concat(this.configuration.geoLocationField, ":(").concat(coordinates, ")");
      }
    }
  }, {
    key: "_adaptFilters",
    value: function _adaptFilters(instantsearchParams, collectionName) {
      var adaptedFilters = [];

      // `filters` can be used with the `Configure` widget
      // However the format needs to be in the Typesense filter_by format, instead of Algolia filter format.
      if (instantsearchParams.filters) {
        adaptedFilters.push(instantsearchParams.filters);
      }
      adaptedFilters.push(this._adaptFacetFilters(instantsearchParams.facetFilters, collectionName));
      adaptedFilters.push(this._adaptNumericFilters(instantsearchParams.numericFilters));
      adaptedFilters.push(this._adaptGeoFilter(instantsearchParams));
      return adaptedFilters.filter(function (filter) {
        return filter && filter !== "";
      }).join(" && ");
    }
  }, {
    key: "_adaptIndexName",
    value: function _adaptIndexName(indexName) {
      return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[1];
    }
  }, {
    key: "_adaptSortBy",
    value: function _adaptSortBy(indexName) {
      return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[3];
    }
  }, {
    key: "_adaptFacetBy",
    value: function _adaptFacetBy(facets, collectionName) {
      var _this3 = this;
      return [facets].flat().map(function (facet) {
        var _this3$configuration$;
        if ((_this3$configuration$ = _this3.configuration.collectionSpecificFacetByOptions) !== null && _this3$configuration$ !== void 0 && (_this3$configuration$ = _this3$configuration$[collectionName]) !== null && _this3$configuration$ !== void 0 && _this3$configuration$[facet]) {
          return "".concat(facet).concat(_this3.configuration.collectionSpecificFacetByOptions[collectionName][facet]);
        } else if (_this3.configuration.facetByOptions[facet]) {
          return "".concat(facet).concat(_this3.configuration.facetByOptions[facet]);
        } else {
          return facet;
        }
      }).join(",");
    }
  }, {
    key: "_adaptRulesContextsToOverrideTags",
    value: function _adaptRulesContextsToOverrideTags(ruleContexts) {
      return ruleContexts.join(",");
    }
  }, {
    key: "_buildSearchParameters",
    value: function _buildSearchParameters(instantsearchRequest) {
      var _this$configuration$c2, _this$configuration$s;
      var params = instantsearchRequest.params;
      var indexName = instantsearchRequest.indexName;
      var adaptedCollectionName = this._adaptIndexName(indexName);

      // Convert all common parameters to snake case
      var snakeCasedAdditionalSearchParameters = {};
      for (var _i = 0, _Object$entries = Object.entries(this.additionalSearchParameters); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];
        snakeCasedAdditionalSearchParameters[this._camelToSnakeCase(key)] = value;
      }

      // Override, collection specific parameters
      if (this.collectionSpecificSearchParameters[adaptedCollectionName]) {
        for (var _i2 = 0, _Object$entries2 = Object.entries(this.collectionSpecificSearchParameters[adaptedCollectionName]); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_Object$entries2[_i2], 2),
            _key = _Object$entries2$_i[0],
            _value = _Object$entries2$_i[1];
          snakeCasedAdditionalSearchParameters[this._camelToSnakeCase(_key)] = _value;
        }
      }
      var typesenseSearchParams = Object.assign({}, snakeCasedAdditionalSearchParameters);
      var adaptedSortBy = this._adaptSortBy(indexName);
      Object.assign(typesenseSearchParams, {
        collection: adaptedCollectionName,
        q: params.query === "" || params.query === undefined ? "*" : params.query,
        facet_by: snakeCasedAdditionalSearchParameters.facet_by || this._adaptFacetBy(params.facets, adaptedCollectionName),
        filter_by: this._adaptFilters(params, adaptedCollectionName) || snakeCasedAdditionalSearchParameters.filter_by,
        sort_by: adaptedSortBy || snakeCasedAdditionalSearchParameters.sort_by,
        max_facet_values: params.maxValuesPerFacet,
        page: (params.page || 0) + 1
      });
      if (params.hitsPerPage) {
        typesenseSearchParams.per_page = params.hitsPerPage;
      }
      if (params.facetQuery) {
        typesenseSearchParams.facet_query = "".concat(params.facetName, ":").concat(params.facetQuery);
        typesenseSearchParams.per_page = 0;
      }
      if (params.ruleContexts && params.ruleContexts.length > 0) {
        typesenseSearchParams.override_tags = this._adaptRulesContextsToOverrideTags(params.ruleContexts);
      }

      // If a custom vector query is specified, set q=*
      if (params.typesenseVectorQuery) {
        typesenseSearchParams.vector_query = params.typesenseVectorQuery;
      }

      // Allow for conditional disabling of overrides, for particular sort orders
      var sortByOption = ((_this$configuration$c2 = this.configuration.collectionSpecificSortByOptions) === null || _this$configuration$c2 === void 0 || (_this$configuration$c2 = _this$configuration$c2[adaptedCollectionName]) === null || _this$configuration$c2 === void 0 ? void 0 : _this$configuration$c2[typesenseSearchParams["sort_by"]]) || ((_this$configuration$s = this.configuration.sortByOptions) === null || _this$configuration$s === void 0 ? void 0 : _this$configuration$s[typesenseSearchParams["sort_by"]]);
      if ((sortByOption === null || sortByOption === void 0 ? void 0 : sortByOption["enable_overrides"]) != null) {
        typesenseSearchParams["enable_overrides"] = sortByOption["enable_overrides"];
      }

      // console.log(params);
      // console.log(typesenseSearchParams);

      // Filter out empty or null values, so we don't accidentally override values set in presets
      // eslint-disable-next-line no-unused-vars
      return Object.fromEntries(Object.entries(typesenseSearchParams).filter(function (_ref2) {
        var _ref3 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref2, 2),
          _ = _ref3[0],
          v = _ref3[1];
        return v != null && v !== "";
      }));
    }
  }, {
    key: "_camelToSnakeCase",
    value: function _camelToSnakeCase(str) {
      return str.split(/(?=[A-Z])/).join("_").toLowerCase();
    }
  }, {
    key: "request",
    value: function () {
      var _request = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().mark(function _callee() {
        var _this4 = this,
          _searches$,
          _searches$2;
        var searches, commonParams, _searches$3, q, conversation, conversation_id, conversation_model_id;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // console.log(this.instantsearchRequests);
              searches = this.instantsearchRequests.map(function (instantsearchRequest) {
                return _this4._buildSearchParameters(instantsearchRequest);
              }); // If this is a conversational search, then move conversation related params to query params
              commonParams = {};
              if (((_searches$ = searches[0]) === null || _searches$ === void 0 ? void 0 : _searches$.conversation) === true || ((_searches$2 = searches[0]) === null || _searches$2 === void 0 ? void 0 : _searches$2.conversation) === "true") {
                _searches$3 = searches[0], q = _searches$3.q, conversation = _searches$3.conversation, conversation_id = _searches$3.conversation_id, conversation_model_id = _searches$3.conversation_model_id;
                commonParams = {
                  q: q,
                  conversation: conversation,
                  conversation_id: conversation_id,
                  conversation_model_id: conversation_model_id
                };
                searches = searches.map(function (searchParams) {
                  // eslint-disable-next-line no-unused-vars
                  var q = searchParams.q,
                    conversation = searchParams.conversation,
                    conversation_id = searchParams.conversation_id,
                    conversation_model_id = searchParams.conversation_model_id,
                    modifiedSearchParams = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(searchParams, _excluded);
                  return modifiedSearchParams;
                });
              }
              return _context.abrupt("return", this.typesenseClient.multiSearch.perform({
                searches: searches
              }, commonParams));
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function request() {
        return _request.apply(this, arguments);
      }
      return request;
    }()
  }], [{
    key: "INDEX_NAME_MATCHING_REGEX",
    get: function get() {
      return new RegExp("^(.+?)(?=(/sort/(.*))|$)");
    }
  }, {
    key: "DEFAULT_FACET_FILTER_STRING_MATCHING_REGEX",
    get: function get() {
      return new RegExp("(.*)((?!:).):(?!:)(.*)");
    }
  }, {
    key: "DEFAULT_NUMERIC_FILTER_STRING_MATCHING_REGEX",
    get: function get() {
      return new RegExp("(.*?)(<=|>=|>|<|=)(.*)");
    }
  }]);
}();

/***/ }),

/***/ "./src/SearchResponseAdapter.js":
/*!**************************************!*\
  !*** ./src/SearchResponseAdapter.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchResponseAdapter: () => (/* binding */ SearchResponseAdapter)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _support_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./support/utils */ "./src/support/utils.js");








function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

var SearchResponseAdapter = /*#__PURE__*/function () {
  function SearchResponseAdapter(typesenseResponse, instantsearchRequest, configuration) {
    var allTypesenseResults = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var fullTypesenseResponse = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, SearchResponseAdapter);
    this.typesenseResponse = typesenseResponse;
    this.instantsearchRequest = instantsearchRequest;
    this.configuration = configuration;
    this.allTypesenseResults = allTypesenseResults;
    this.fullTypesenseResponse = fullTypesenseResponse;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(SearchResponseAdapter, [{
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
        ["text_match", "geo_distance_meters", "curated", "text_match_info", "hybrid_search_info", "vector_distance"].forEach(function (metadataField) {
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

      Object.assign.apply(Object, [result].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Object.entries(typesenseHit.document).map(function (_ref) {
        var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, 2),
          attribute = _ref2[0],
          value = _ref2[1];
        return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])({}, attribute, {
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
        var _ref5 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref4, 2),
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
            } else if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(unhighlightedValueFromArray) === "object") {
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
        } else if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(value) === "object") {
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
      return Object.assign.apply(Object, [{}].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Object.entries(objectValue).map(function (_ref6) {
        var _ref7 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref6, 2),
          attribute = _ref7[0],
          value = _ref7[1];
        var adaptedValue;
        if (value == null) {
          adaptedValue = _this4._adaptHighlightNullValue();
        } else if (Array.isArray(value)) {
          var _highlightObjectValue;
          adaptedValue = _this4._adaptHighlightInArrayValue(value, (_highlightObjectValue = highlightObjectValue === null || highlightObjectValue === void 0 ? void 0 : highlightObjectValue[attribute]) !== null && _highlightObjectValue !== void 0 ? _highlightObjectValue : [], snippetOrValue);
        } else if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(value) === "object") {
          var _highlightObjectValue2;
          adaptedValue = _this4._adaptHighlightInObjectValue(value, (_highlightObjectValue2 = highlightObjectValue === null || highlightObjectValue === void 0 ? void 0 : highlightObjectValue[attribute]) !== null && _highlightObjectValue2 !== void 0 ? _highlightObjectValue2 : {}, snippetOrValue);
        } else {
          adaptedValue = _this4._adaptHighlightInPrimitiveValue(value, highlightObjectValue === null || highlightObjectValue === void 0 ? void 0 : highlightObjectValue[attribute], snippetOrValue);
        }
        return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])({}, attribute, adaptedValue);
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
        } else if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(value) === "object") {
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
        Object.assign(adaptedResult, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])({}, facet.field_name, Object.assign.apply(Object, [{}].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(facet.counts.map(function (count) {
          return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])({}, count.value, count.count);
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
          Object.assign(adaptedResult, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])({}, facet.field_name, facet.stats));
        }
      });
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
        adaptedResult.facetOrdering.facets.order = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(new Set(typesenseFacetCounts.map(function (fc) {
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
      var adaptedResult = _objectSpread({
        hits: this.typesenseResponse.grouped_hits ? this._adaptGroupedHits(this.typesenseResponse.grouped_hits) : this._adaptHits(this.typesenseResponse.hits),
        nbHits: this.typesenseResponse.found,
        page: this.typesenseResponse.page - 1,
        nbPages: this._adaptNumberOfPages(),
        hitsPerPage: this.typesenseResponse.request_params.per_page,
        facets: this._adaptFacets(this.typesenseResponse.facet_counts || []),
        facets_stats: this._adaptFacetStats(this.typesenseResponse.facet_counts || {}),
        query: this.typesenseResponse.request_params.q,
        processingTimeMS: this.typesenseResponse.search_time_ms
      }, Object.keys(adaptedRenderingContent).length > 0 ? {
        renderingContent: adaptedRenderingContent
      } : null);

      // Add appliedRules if metadata is present
      if (this.typesenseResponse.metadata) {
        adaptedResult.appliedRules = ["typesense-override"];
        adaptedResult.userData = this._adaptUserData(this.typesenseResponse.metadata);
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
Object.assign(SearchResponseAdapter.prototype, _support_utils__WEBPACK_IMPORTED_MODULE_6__.utils);

/***/ }),

/***/ "./src/support/utils.js":
/*!******************************!*\
  !*** ./src/support/utils.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   utils: () => (/* binding */ utils)
/* harmony export */ });
var utils = {
  _adaptHighlightTag: function _adaptHighlightTag(value, highlightPreTag, highlightPostTag) {
    return value.replace(new RegExp("<mark>", "g"), highlightPreTag || "<mark>").replace(new RegExp("</mark>", "g"), highlightPostTag || "</mark>");
  },
  _adaptNumberOfPages: function _adaptNumberOfPages() {
    var result = this.typesenseResponse.found / this.typesenseResponse.request_params.per_page;
    if (Number.isFinite(result)) {
      return Math.ceil(result);
    } else {
      return 1;
    }
  }
};

/***/ }),

/***/ "./node_modules/loglevel/lib/loglevel.js":
/*!***********************************************!*\
  !*** ./node_modules/loglevel/lib/loglevel.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      defaultLevel = defaultLevel == null ? "WARN" : defaultLevel;

      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType || !storageKey) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      function clearPersistedLevel() {
          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage.removeItem(storageKey);
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch (ignore) {}
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          defaultLevel = level;
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.resetLevel = function () {
          self.setLevel(defaultLevel, false);
          clearPersistedLevel();
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;

    return defaultLogger;
}));


/***/ }),

/***/ "./node_modules/typesense/lib/Typesense.js":
/*!*************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Errors = exports.SearchClient = exports.Client = void 0;
var Client_1 = __importDefault(__webpack_require__(/*! ./Typesense/Client */ "./node_modules/typesense/lib/Typesense/Client.js"));
exports.Client = Client_1.default;
var SearchClient_1 = __importDefault(__webpack_require__(/*! ./Typesense/SearchClient */ "./node_modules/typesense/lib/Typesense/SearchClient.js"));
exports.SearchClient = SearchClient_1.default;
var Errors = __importStar(__webpack_require__(/*! ./Typesense/Errors */ "./node_modules/typesense/lib/Typesense/Errors/index.js"));
exports.Errors = Errors;
exports["default"] = { Client: Client_1.default, SearchClient: SearchClient_1.default, Errors: Errors };
//# sourceMappingURL=Typesense.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Alias.js":
/*!*******************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Alias.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Aliases_1 = __importDefault(__webpack_require__(/*! ./Aliases */ "./node_modules/typesense/lib/Typesense/Aliases.js"));
var Alias = /** @class */ (function () {
    function Alias(name, apiCall) {
        this.name = name;
        this.apiCall = apiCall;
    }
    Alias.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Alias.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Alias.prototype.endpointPath = function () {
        return "".concat(Aliases_1.default.RESOURCEPATH, "/").concat(this.name);
    };
    return Alias;
}());
exports["default"] = Alias;
//# sourceMappingURL=Alias.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Aliases.js":
/*!*********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Aliases.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var RESOURCEPATH = "/aliases";
var Aliases = /** @class */ (function () {
    function Aliases(apiCall) {
        this.apiCall = apiCall;
    }
    Aliases.prototype.upsert = function (name, mapping) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(name), mapping)];
            });
        });
    };
    Aliases.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    Aliases.prototype.endpointPath = function (aliasName) {
        return "".concat(Aliases.RESOURCEPATH, "/").concat(aliasName);
    };
    Object.defineProperty(Aliases, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Aliases;
}());
exports["default"] = Aliases;
//# sourceMappingURL=Aliases.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Analytics.js":
/*!***********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Analytics.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var AnalyticsRules_1 = __importDefault(__webpack_require__(/*! ./AnalyticsRules */ "./node_modules/typesense/lib/Typesense/AnalyticsRules.js"));
var AnalyticsRule_1 = __importDefault(__webpack_require__(/*! ./AnalyticsRule */ "./node_modules/typesense/lib/Typesense/AnalyticsRule.js"));
var RESOURCEPATH = "/analytics";
var Analytics = /** @class */ (function () {
    function Analytics(apiCall) {
        this.apiCall = apiCall;
        this.individualAnalyticsRules = {};
        this.apiCall = apiCall;
        this._analyticsRules = new AnalyticsRules_1.default(this.apiCall);
    }
    Analytics.prototype.rules = function (id) {
        if (id === undefined) {
            return this._analyticsRules;
        }
        else {
            if (this.individualAnalyticsRules[id] === undefined) {
                this.individualAnalyticsRules[id] = new AnalyticsRule_1.default(id, this.apiCall);
            }
            return this.individualAnalyticsRules[id];
        }
    };
    Object.defineProperty(Analytics, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Analytics;
}());
exports["default"] = Analytics;
//# sourceMappingURL=Analytics.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/AnalyticsRule.js":
/*!***************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/AnalyticsRule.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var AnalyticsRules_1 = __importDefault(__webpack_require__(/*! ./AnalyticsRules */ "./node_modules/typesense/lib/Typesense/AnalyticsRules.js"));
var AnalyticsRule = /** @class */ (function () {
    function AnalyticsRule(name, apiCall) {
        this.name = name;
        this.apiCall = apiCall;
    }
    AnalyticsRule.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    AnalyticsRule.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    AnalyticsRule.prototype.endpointPath = function () {
        return "".concat(AnalyticsRules_1.default.RESOURCEPATH, "/").concat(this.name);
    };
    return AnalyticsRule;
}());
exports["default"] = AnalyticsRule;
//# sourceMappingURL=AnalyticsRule.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/AnalyticsRules.js":
/*!****************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/AnalyticsRules.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var RESOURCEPATH = "/analytics/rules";
var AnalyticsRules = /** @class */ (function () {
    function AnalyticsRules(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    AnalyticsRules.prototype.upsert = function (name, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(name), params)];
            });
        });
    };
    AnalyticsRules.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    AnalyticsRules.prototype.endpointPath = function (operation) {
        return "".concat(AnalyticsRules.RESOURCEPATH).concat(operation === undefined ? "" : "/" + operation);
    };
    Object.defineProperty(AnalyticsRules, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return AnalyticsRules;
}());
exports["default"] = AnalyticsRules;
//# sourceMappingURL=AnalyticsRules.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/ApiCall.js":
/*!*********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/ApiCall.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var axios_1 = __importDefault(__webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs"));
var Errors_1 = __webpack_require__(/*! ./Errors */ "./node_modules/typesense/lib/Typesense/Errors/index.js");
var TypesenseError_1 = __importDefault(__webpack_require__(/*! ./Errors/TypesenseError */ "./node_modules/typesense/lib/Typesense/Errors/TypesenseError.js"));
var APIKEYHEADERNAME = "X-TYPESENSE-API-KEY";
var HEALTHY = true;
var UNHEALTHY = false;
var ApiCall = /** @class */ (function () {
    function ApiCall(configuration) {
        this.configuration = configuration;
        this.apiKey = this.configuration.apiKey;
        this.nodes =
            this.configuration.nodes == null
                ? this.configuration.nodes
                : JSON.parse(JSON.stringify(this.configuration.nodes)); // Make a copy, since we'll be adding additional metadata to the nodes
        this.nearestNode =
            this.configuration.nearestNode == null
                ? this.configuration.nearestNode
                : JSON.parse(JSON.stringify(this.configuration.nearestNode));
        this.connectionTimeoutSeconds = this.configuration.connectionTimeoutSeconds;
        this.healthcheckIntervalSeconds =
            this.configuration.healthcheckIntervalSeconds;
        this.numRetriesPerRequest = this.configuration.numRetries;
        this.retryIntervalSeconds = this.configuration.retryIntervalSeconds;
        this.sendApiKeyAsQueryParam = this.configuration.sendApiKeyAsQueryParam;
        this.additionalUserHeaders = this.configuration.additionalHeaders;
        this.logger = this.configuration.logger;
        this.initializeMetadataForNodes();
        this.currentNodeIndex = -1;
    }
    ApiCall.prototype.get = function (endpoint, queryParameters, _a) {
        if (queryParameters === void 0) { queryParameters = {}; }
        var _b = _a === void 0 ? {} : _a, _c = _b.abortSignal, abortSignal = _c === void 0 ? null : _c, _d = _b.responseType, responseType = _d === void 0 ? undefined : _d;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_e) {
                return [2 /*return*/, this.performRequest("get", endpoint, {
                        queryParameters: queryParameters,
                        abortSignal: abortSignal,
                        responseType: responseType,
                    })];
            });
        });
    };
    ApiCall.prototype.delete = function (endpoint, queryParameters) {
        if (queryParameters === void 0) { queryParameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.performRequest("delete", endpoint, { queryParameters: queryParameters })];
            });
        });
    };
    ApiCall.prototype.post = function (endpoint, bodyParameters, queryParameters, additionalHeaders) {
        if (bodyParameters === void 0) { bodyParameters = {}; }
        if (queryParameters === void 0) { queryParameters = {}; }
        if (additionalHeaders === void 0) { additionalHeaders = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.performRequest("post", endpoint, {
                        queryParameters: queryParameters,
                        bodyParameters: bodyParameters,
                        additionalHeaders: additionalHeaders,
                    })];
            });
        });
    };
    ApiCall.prototype.put = function (endpoint, bodyParameters, queryParameters) {
        if (bodyParameters === void 0) { bodyParameters = {}; }
        if (queryParameters === void 0) { queryParameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.performRequest("put", endpoint, {
                        queryParameters: queryParameters,
                        bodyParameters: bodyParameters,
                    })];
            });
        });
    };
    ApiCall.prototype.patch = function (endpoint, bodyParameters, queryParameters) {
        if (bodyParameters === void 0) { bodyParameters = {}; }
        if (queryParameters === void 0) { queryParameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.performRequest("patch", endpoint, {
                        queryParameters: queryParameters,
                        bodyParameters: bodyParameters,
                    })];
            });
        });
    };
    ApiCall.prototype.performRequest = function (requestType, endpoint, _a) {
        var _b, _c, _d;
        var _e = _a.queryParameters, queryParameters = _e === void 0 ? null : _e, _f = _a.bodyParameters, bodyParameters = _f === void 0 ? null : _f, _g = _a.additionalHeaders, additionalHeaders = _g === void 0 ? {} : _g, _h = _a.abortSignal, abortSignal = _h === void 0 ? null : _h, _j = _a.responseType, responseType = _j === void 0 ? undefined : _j, _k = _a.skipConnectionTimeout, skipConnectionTimeout = _k === void 0 ? false : _k;
        return __awaiter(this, void 0, void 0, function () {
            var requestNumber, lastException, _loop_1, this_1, numTries, state_1;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        this.configuration.validate();
                        requestNumber = Date.now();
                        this.logger.debug("Request #".concat(requestNumber, ": Performing ").concat(requestType.toUpperCase(), " request: ").concat(endpoint));
                        _loop_1 = function (numTries) {
                            var node, abortListener, requestOptions, cancelToken, source_1, response, error_1;
                            return __generator(this, function (_m) {
                                switch (_m.label) {
                                    case 0:
                                        node = this_1.getNextNode(requestNumber);
                                        this_1.logger.debug("Request #".concat(requestNumber, ": Attempting ").concat(requestType.toUpperCase(), " request Try #").concat(numTries, " to Node ").concat(node.index));
                                        if (abortSignal && abortSignal.aborted) {
                                            return [2 /*return*/, { value: Promise.reject(new Error("Request aborted by caller.")) }];
                                        }
                                        abortListener = void 0;
                                        _m.label = 1;
                                    case 1:
                                        _m.trys.push([1, 3, 5, 6]);
                                        requestOptions = {
                                            method: requestType,
                                            url: this_1.uriFor(endpoint, node),
                                            headers: Object.assign({}, this_1.defaultHeaders(), additionalHeaders, this_1.additionalUserHeaders),
                                            maxContentLength: Infinity,
                                            maxBodyLength: Infinity,
                                            responseType: responseType,
                                            validateStatus: function (status) {
                                                /* Override default validateStatus, which only considers 2xx a success.
                                                    In our case, if the server returns any HTTP code, we will handle it below.
                                                    We do this to be able to raise custom errors based on response code.
                                                 */
                                                return status > 0;
                                            },
                                            transformResponse: [
                                                function (data, headers) {
                                                    var transformedData = data;
                                                    if (headers !== undefined &&
                                                        typeof data === "string" &&
                                                        headers["content-type"] &&
                                                        headers["content-type"].startsWith("application/json")) {
                                                        transformedData = JSON.parse(data);
                                                    }
                                                    return transformedData;
                                                },
                                            ],
                                        };
                                        if (skipConnectionTimeout !== true) {
                                            requestOptions.timeout = this_1.connectionTimeoutSeconds * 1000;
                                        }
                                        if (queryParameters && Object.keys(queryParameters).length !== 0) {
                                            requestOptions.params = queryParameters;
                                        }
                                        if (this_1.sendApiKeyAsQueryParam) {
                                            requestOptions.params = requestOptions.params || {};
                                            requestOptions.params["x-typesense-api-key"] = this_1.apiKey;
                                        }
                                        if (this_1.configuration.httpAgent) {
                                            this_1.logger.debug("Request #".concat(requestNumber, ": Using custom httpAgent"));
                                            requestOptions.httpAgent = this_1.configuration.httpAgent;
                                        }
                                        if (this_1.configuration.httpsAgent) {
                                            this_1.logger.debug("Request #".concat(requestNumber, ": Using custom httpsAgent"));
                                            requestOptions.httpsAgent = this_1.configuration.httpsAgent;
                                        }
                                        if (bodyParameters &&
                                            ((typeof bodyParameters === "string" &&
                                                bodyParameters.length !== 0) ||
                                                (typeof bodyParameters === "object" &&
                                                    Object.keys(bodyParameters).length !== 0))) {
                                            requestOptions.data = bodyParameters;
                                        }
                                        // Translate from user-provided AbortController to the Axios request cancel mechanism.
                                        if (abortSignal) {
                                            cancelToken = axios_1.default.CancelToken;
                                            source_1 = cancelToken.source();
                                            abortListener = function () { return source_1.cancel(); };
                                            abortSignal.addEventListener("abort", abortListener);
                                            requestOptions.cancelToken = source_1.token;
                                        }
                                        return [4 /*yield*/, (0, axios_1.default)(requestOptions)];
                                    case 2:
                                        response = _m.sent();
                                        if (response.status >= 1 && response.status <= 499) {
                                            // Treat any status code > 0 and < 500 to be an indication that node is healthy
                                            // We exclude 0 since some clients return 0 when request fails
                                            this_1.setNodeHealthcheck(node, HEALTHY);
                                        }
                                        this_1.logger.debug("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " was made. Response Code was ").concat(response.status, "."));
                                        if (response.status >= 200 && response.status < 300) {
                                            return [2 /*return*/, { value: Promise.resolve(response.data) }];
                                        }
                                        else if (response.status < 500) {
                                            return [2 /*return*/, { value: Promise.reject(this_1.customErrorForResponse(response, (_b = response.data) === null || _b === void 0 ? void 0 : _b.message)) }];
                                        }
                                        else {
                                            // Retry all other HTTP errors (HTTPStatus > 500)
                                            // This will get caught by the catch block below
                                            throw this_1.customErrorForResponse(response, (_c = response.data) === null || _c === void 0 ? void 0 : _c.message);
                                        }
                                        return [3 /*break*/, 6];
                                    case 3:
                                        error_1 = _m.sent();
                                        // This block handles retries for HTTPStatus > 500 and network layer issues like connection timeouts
                                        this_1.setNodeHealthcheck(node, UNHEALTHY);
                                        lastException = error_1;
                                        this_1.logger.warn("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " failed due to \"").concat(error_1.code, " ").concat(error_1.message).concat(error_1.response == null
                                            ? ""
                                            : " - " + JSON.stringify((_d = error_1.response) === null || _d === void 0 ? void 0 : _d.data), "\""));
                                        // this.logger.debug(error.stack)
                                        this_1.logger.warn("Request #".concat(requestNumber, ": Sleeping for ").concat(this_1.retryIntervalSeconds, "s and then retrying request..."));
                                        return [4 /*yield*/, this_1.timer(this_1.retryIntervalSeconds)];
                                    case 4:
                                        _m.sent();
                                        return [3 /*break*/, 6];
                                    case 5:
                                        if (abortSignal && abortListener) {
                                            abortSignal.removeEventListener("abort", abortListener);
                                        }
                                        return [7 /*endfinally*/];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        numTries = 1;
                        _l.label = 1;
                    case 1:
                        if (!(numTries <= this.numRetriesPerRequest + 1)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(numTries)];
                    case 2:
                        state_1 = _l.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _l.label = 3;
                    case 3:
                        numTries++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.logger.debug("Request #".concat(requestNumber, ": No retries left. Raising last error"));
                        return [2 /*return*/, Promise.reject(lastException)];
                }
            });
        });
    };
    // Attempts to find the next healthy node, looping through the list of nodes once.
    //   But if no healthy nodes are found, it will just return the next node, even if it's unhealthy
    //     so we can try the request for good measure, in case that node has become healthy since
    ApiCall.prototype.getNextNode = function (requestNumber) {
        if (requestNumber === void 0) { requestNumber = 0; }
        // Check if nearestNode is set and is healthy, if so return it
        if (this.nearestNode != null) {
            this.logger.debug("Request #".concat(requestNumber, ": Nodes Health: Node ").concat(this.nearestNode.index, " is ").concat(this.nearestNode.isHealthy === true ? "Healthy" : "Unhealthy"));
            if (this.nearestNode.isHealthy === true ||
                this.nodeDueForHealthcheck(this.nearestNode, requestNumber)) {
                this.logger.debug("Request #".concat(requestNumber, ": Updated current node to Node ").concat(this.nearestNode.index));
                return this.nearestNode;
            }
            this.logger.debug("Request #".concat(requestNumber, ": Falling back to individual nodes"));
        }
        // Fallback to nodes as usual
        this.logger.debug("Request #".concat(requestNumber, ": Nodes Health: ").concat(this.nodes
            .map(function (node) {
            return "Node ".concat(node.index, " is ").concat(node.isHealthy === true ? "Healthy" : "Unhealthy");
        })
            .join(" || ")));
        var candidateNode = this.nodes[0];
        for (var i = 0; i <= this.nodes.length; i++) {
            this.currentNodeIndex = (this.currentNodeIndex + 1) % this.nodes.length;
            candidateNode = this.nodes[this.currentNodeIndex];
            if (candidateNode.isHealthy === true ||
                this.nodeDueForHealthcheck(candidateNode, requestNumber)) {
                this.logger.debug("Request #".concat(requestNumber, ": Updated current node to Node ").concat(candidateNode.index));
                return candidateNode;
            }
        }
        // None of the nodes are marked healthy, but some of them could have become healthy since last health check.
        //  So we will just return the next node.
        this.logger.debug("Request #".concat(requestNumber, ": No healthy nodes were found. Returning the next node, Node ").concat(candidateNode.index));
        return candidateNode;
    };
    ApiCall.prototype.nodeDueForHealthcheck = function (node, requestNumber) {
        if (requestNumber === void 0) { requestNumber = 0; }
        var isDueForHealthcheck = Date.now() - node.lastAccessTimestamp >
            this.healthcheckIntervalSeconds * 1000;
        if (isDueForHealthcheck) {
            this.logger.debug("Request #".concat(requestNumber, ": Node ").concat(node.index, " has exceeded healtcheckIntervalSeconds of ").concat(this.healthcheckIntervalSeconds, ". Adding it back into rotation."));
        }
        return isDueForHealthcheck;
    };
    ApiCall.prototype.initializeMetadataForNodes = function () {
        var _this = this;
        if (this.nearestNode != null) {
            this.nearestNode.index = "nearestNode";
            this.setNodeHealthcheck(this.nearestNode, HEALTHY);
        }
        this.nodes.forEach(function (node, i) {
            node.index = i;
            _this.setNodeHealthcheck(node, HEALTHY);
        });
    };
    ApiCall.prototype.setNodeHealthcheck = function (node, isHealthy) {
        node.isHealthy = isHealthy;
        node.lastAccessTimestamp = Date.now();
    };
    ApiCall.prototype.uriFor = function (endpoint, node) {
        if (node.url != null) {
            return "".concat(node.url).concat(endpoint);
        }
        return "".concat(node.protocol, "://").concat(node.host, ":").concat(node.port).concat(node.path).concat(endpoint);
    };
    ApiCall.prototype.defaultHeaders = function () {
        var defaultHeaders = {};
        if (!this.sendApiKeyAsQueryParam) {
            defaultHeaders[APIKEYHEADERNAME] = this.apiKey;
        }
        defaultHeaders["Content-Type"] = "application/json";
        return defaultHeaders;
    };
    ApiCall.prototype.timer = function (seconds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, seconds * 1000); })];
            });
        });
    };
    ApiCall.prototype.customErrorForResponse = function (response, messageFromServer) {
        var errorMessage = "Request failed with HTTP code ".concat(response.status);
        if (typeof messageFromServer === "string" &&
            messageFromServer.trim() !== "") {
            errorMessage += " | Server said: ".concat(messageFromServer);
        }
        var error = new TypesenseError_1.default(errorMessage);
        if (response.status === 400) {
            error = new Errors_1.RequestMalformed(errorMessage);
        }
        else if (response.status === 401) {
            error = new Errors_1.RequestUnauthorized(errorMessage);
        }
        else if (response.status === 404) {
            error = new Errors_1.ObjectNotFound(errorMessage);
        }
        else if (response.status === 409) {
            error = new Errors_1.ObjectAlreadyExists(errorMessage);
        }
        else if (response.status === 422) {
            error = new Errors_1.ObjectUnprocessable(errorMessage);
        }
        else if (response.status >= 500 && response.status <= 599) {
            error = new Errors_1.ServerError(errorMessage);
        }
        else {
            error = new Errors_1.HTTPError(errorMessage);
        }
        error.httpStatus = response.status;
        return error;
    };
    return ApiCall;
}());
exports["default"] = ApiCall;
//# sourceMappingURL=ApiCall.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Client.js":
/*!********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Client.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/* eslint-disable no-dupe-class-members */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Configuration_1 = __importDefault(__webpack_require__(/*! ./Configuration */ "./node_modules/typesense/lib/Typesense/Configuration.js"));
var ApiCall_1 = __importDefault(__webpack_require__(/*! ./ApiCall */ "./node_modules/typesense/lib/Typesense/ApiCall.js"));
var Collections_1 = __importDefault(__webpack_require__(/*! ./Collections */ "./node_modules/typesense/lib/Typesense/Collections.js"));
var Collection_1 = __importDefault(__webpack_require__(/*! ./Collection */ "./node_modules/typesense/lib/Typesense/Collection.js"));
var Aliases_1 = __importDefault(__webpack_require__(/*! ./Aliases */ "./node_modules/typesense/lib/Typesense/Aliases.js"));
var Alias_1 = __importDefault(__webpack_require__(/*! ./Alias */ "./node_modules/typesense/lib/Typesense/Alias.js"));
var Keys_1 = __importDefault(__webpack_require__(/*! ./Keys */ "./node_modules/typesense/lib/Typesense/Keys.js"));
var Key_1 = __importDefault(__webpack_require__(/*! ./Key */ "./node_modules/typesense/lib/Typesense/Key.js"));
var Debug_1 = __importDefault(__webpack_require__(/*! ./Debug */ "./node_modules/typesense/lib/Typesense/Debug.js"));
var Metrics_1 = __importDefault(__webpack_require__(/*! ./Metrics */ "./node_modules/typesense/lib/Typesense/Metrics.js"));
var Health_1 = __importDefault(__webpack_require__(/*! ./Health */ "./node_modules/typesense/lib/Typesense/Health.js"));
var Operations_1 = __importDefault(__webpack_require__(/*! ./Operations */ "./node_modules/typesense/lib/Typesense/Operations.js"));
var MultiSearch_1 = __importDefault(__webpack_require__(/*! ./MultiSearch */ "./node_modules/typesense/lib/Typesense/MultiSearch.js"));
var Presets_1 = __importDefault(__webpack_require__(/*! ./Presets */ "./node_modules/typesense/lib/Typesense/Presets.js"));
var Preset_1 = __importDefault(__webpack_require__(/*! ./Preset */ "./node_modules/typesense/lib/Typesense/Preset.js"));
var Analytics_1 = __importDefault(__webpack_require__(/*! ./Analytics */ "./node_modules/typesense/lib/Typesense/Analytics.js"));
var Stopwords_1 = __importDefault(__webpack_require__(/*! ./Stopwords */ "./node_modules/typesense/lib/Typesense/Stopwords.js"));
var Stopword_1 = __importDefault(__webpack_require__(/*! ./Stopword */ "./node_modules/typesense/lib/Typesense/Stopword.js"));
var Conversations_1 = __importDefault(__webpack_require__(/*! ./Conversations */ "./node_modules/typesense/lib/Typesense/Conversations.js"));
var Conversation_1 = __importDefault(__webpack_require__(/*! ./Conversation */ "./node_modules/typesense/lib/Typesense/Conversation.js"));
var Client = /** @class */ (function () {
    function Client(options) {
        var _a;
        options.sendApiKeyAsQueryParam = (_a = options.sendApiKeyAsQueryParam) !== null && _a !== void 0 ? _a : false;
        this.configuration = new Configuration_1.default(options);
        this.apiCall = new ApiCall_1.default(this.configuration);
        this.debug = new Debug_1.default(this.apiCall);
        this.metrics = new Metrics_1.default(this.apiCall);
        this.health = new Health_1.default(this.apiCall);
        this.operations = new Operations_1.default(this.apiCall);
        this.multiSearch = new MultiSearch_1.default(this.apiCall, this.configuration);
        this._collections = new Collections_1.default(this.apiCall);
        this.individualCollections = {};
        this._aliases = new Aliases_1.default(this.apiCall);
        this.individualAliases = {};
        this._keys = new Keys_1.default(this.apiCall);
        this.individualKeys = {};
        this._presets = new Presets_1.default(this.apiCall);
        this.individualPresets = {};
        this._stopwords = new Stopwords_1.default(this.apiCall);
        this.individualStopwords = {};
        this.analytics = new Analytics_1.default(this.apiCall);
        this._conversations = new Conversations_1.default(this.apiCall);
        this.individualConversations = {};
    }
    Client.prototype.collections = function (collectionName) {
        if (collectionName === undefined) {
            return this._collections;
        }
        else {
            if (this.individualCollections[collectionName] === undefined) {
                this.individualCollections[collectionName] = new Collection_1.default(collectionName, this.apiCall, this.configuration);
            }
            return this.individualCollections[collectionName];
        }
    };
    Client.prototype.aliases = function (aliasName) {
        if (aliasName === undefined) {
            return this._aliases;
        }
        else {
            if (this.individualAliases[aliasName] === undefined) {
                this.individualAliases[aliasName] = new Alias_1.default(aliasName, this.apiCall);
            }
            return this.individualAliases[aliasName];
        }
    };
    Client.prototype.keys = function (id) {
        if (id === undefined) {
            return this._keys;
        }
        else {
            if (this.individualKeys[id] === undefined) {
                this.individualKeys[id] = new Key_1.default(id, this.apiCall);
            }
            return this.individualKeys[id];
        }
    };
    Client.prototype.presets = function (id) {
        if (id === undefined) {
            return this._presets;
        }
        else {
            if (this.individualPresets[id] === undefined) {
                this.individualPresets[id] = new Preset_1.default(id, this.apiCall);
            }
            return this.individualPresets[id];
        }
    };
    Client.prototype.stopwords = function (id) {
        if (id === undefined) {
            return this._stopwords;
        }
        else {
            if (this.individualStopwords[id] === undefined) {
                this.individualStopwords[id] = new Stopword_1.default(id, this.apiCall);
            }
            return this.individualStopwords[id];
        }
    };
    Client.prototype.conversations = function (id) {
        if (id === undefined) {
            return this._conversations;
        }
        else {
            if (this.individualConversations[id] === undefined) {
                this.individualConversations[id] = new Conversation_1.default(id, this.apiCall);
            }
            return this.individualConversations[id];
        }
    };
    return Client;
}());
exports["default"] = Client;
//# sourceMappingURL=Client.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Collection.js":
/*!************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Collection.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Collections_1 = __importDefault(__webpack_require__(/*! ./Collections */ "./node_modules/typesense/lib/Typesense/Collections.js"));
var Documents_1 = __importDefault(__webpack_require__(/*! ./Documents */ "./node_modules/typesense/lib/Typesense/Documents.js"));
var Errors_1 = __webpack_require__(/*! ./Errors */ "./node_modules/typesense/lib/Typesense/Errors/index.js");
var Overrides_1 = __importDefault(__webpack_require__(/*! ./Overrides */ "./node_modules/typesense/lib/Typesense/Overrides.js"));
var Override_1 = __importDefault(__webpack_require__(/*! ./Override */ "./node_modules/typesense/lib/Typesense/Override.js"));
var Synonyms_1 = __importDefault(__webpack_require__(/*! ./Synonyms */ "./node_modules/typesense/lib/Typesense/Synonyms.js"));
var Synonym_1 = __importDefault(__webpack_require__(/*! ./Synonym */ "./node_modules/typesense/lib/Typesense/Synonym.js"));
var Document_1 = __webpack_require__(/*! ./Document */ "./node_modules/typesense/lib/Typesense/Document.js");
var Collection = /** @class */ (function () {
    function Collection(name, apiCall, configuration) {
        this.name = name;
        this.apiCall = apiCall;
        this.configuration = configuration;
        this.individualDocuments = {};
        this.individualOverrides = {};
        this.individualSynonyms = {};
        this.name = name;
        this.apiCall = apiCall;
        this.configuration = configuration;
        this._documents = new Documents_1.default(this.name, this.apiCall, this.configuration);
        this._overrides = new Overrides_1.default(this.name, this.apiCall);
        this._synonyms = new Synonyms_1.default(this.name, this.apiCall);
    }
    Collection.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Collection.prototype.update = function (schema) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.patch(this.endpointPath(), schema)];
            });
        });
    };
    Collection.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Collection.prototype.exists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.retrieve()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof Errors_1.ObjectNotFound)
                            return [2 /*return*/, false];
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Collection.prototype.documents = function (documentId) {
        if (!documentId) {
            return this._documents;
        }
        else {
            if (this.individualDocuments[documentId] === undefined) {
                this.individualDocuments[documentId] = new Document_1.Document(this.name, documentId, this.apiCall);
            }
            return this.individualDocuments[documentId];
        }
    };
    Collection.prototype.overrides = function (overrideId) {
        if (overrideId === undefined) {
            return this._overrides;
        }
        else {
            if (this.individualOverrides[overrideId] === undefined) {
                this.individualOverrides[overrideId] = new Override_1.default(this.name, overrideId, this.apiCall);
            }
            return this.individualOverrides[overrideId];
        }
    };
    Collection.prototype.synonyms = function (synonymId) {
        if (synonymId === undefined) {
            return this._synonyms;
        }
        else {
            if (this.individualSynonyms[synonymId] === undefined) {
                this.individualSynonyms[synonymId] = new Synonym_1.default(this.name, synonymId, this.apiCall);
            }
            return this.individualSynonyms[synonymId];
        }
    };
    Collection.prototype.endpointPath = function () {
        return "".concat(Collections_1.default.RESOURCEPATH, "/").concat(this.name);
    };
    return Collection;
}());
exports["default"] = Collection;
//# sourceMappingURL=Collection.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Collections.js":
/*!*************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Collections.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var RESOURCEPATH = "/collections";
var Collections = /** @class */ (function () {
    function Collections(apiCall) {
        this.apiCall = apiCall;
    }
    Collections.prototype.create = function (schema, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post(RESOURCEPATH, schema, options)];
            });
        });
    };
    Collections.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    Object.defineProperty(Collections, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Collections;
}());
exports["default"] = Collections;
//# sourceMappingURL=Collections.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Configuration.js":
/*!***************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Configuration.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var logger = __importStar(__webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js"));
var Errors_1 = __webpack_require__(/*! ./Errors */ "./node_modules/typesense/lib/Typesense/Errors/index.js");
var Configuration = /** @class */ (function () {
    function Configuration(options) {
        var _this = this;
        this.nodes = options.nodes || [];
        this.nodes = this.nodes
            .map(function (node) { return _this.setDefaultPathInNode(node); })
            .map(function (node) { return _this.setDefaultPortInNode(node); })
            .map(function (node) { return (__assign({}, node)); }); // Make a deep copy
        if (options.randomizeNodes == null) {
            options.randomizeNodes = true;
        }
        if (options.randomizeNodes === true) {
            this.shuffleArray(this.nodes);
        }
        this.nearestNode = options.nearestNode;
        this.nearestNode = this.setDefaultPathInNode(this.nearestNode);
        this.nearestNode = this.setDefaultPortInNode(this.nearestNode);
        this.connectionTimeoutSeconds =
            options.connectionTimeoutSeconds || options.timeoutSeconds || 5;
        this.healthcheckIntervalSeconds = options.healthcheckIntervalSeconds || 60;
        this.numRetries =
            options.numRetries ||
                this.nodes.length + (this.nearestNode == null ? 0 : 1) ||
                3;
        this.retryIntervalSeconds = options.retryIntervalSeconds || 0.1;
        this.apiKey = options.apiKey;
        this.sendApiKeyAsQueryParam = options.sendApiKeyAsQueryParam; // We will set a default for this in Client and SearchClient
        this.cacheSearchResultsForSeconds =
            options.cacheSearchResultsForSeconds || 0; // Disable client-side cache by default
        this.useServerSideSearchCache = options.useServerSideSearchCache || false;
        this.logger = options.logger || logger;
        this.logLevel = options.logLevel || "warn";
        this.logger.setLevel(this.logLevel);
        this.additionalHeaders = options.additionalHeaders;
        this.httpAgent = options.httpAgent;
        this.httpsAgent = options.httpsAgent;
        this.showDeprecationWarnings(options);
        this.validate();
    }
    Configuration.prototype.validate = function () {
        if (this.nodes == null || this.nodes.length === 0 || this.validateNodes()) {
            throw new Errors_1.MissingConfigurationError("Ensure that nodes[].protocol, nodes[].host and nodes[].port are set");
        }
        if (this.nearestNode != null &&
            this.isNodeMissingAnyParameters(this.nearestNode)) {
            throw new Errors_1.MissingConfigurationError("Ensure that nearestNodes.protocol, nearestNodes.host and nearestNodes.port are set");
        }
        if (this.apiKey == null) {
            throw new Errors_1.MissingConfigurationError("Ensure that apiKey is set");
        }
        return true;
    };
    Configuration.prototype.validateNodes = function () {
        var _this = this;
        return this.nodes.some(function (node) {
            return _this.isNodeMissingAnyParameters(node);
        });
    };
    Configuration.prototype.isNodeMissingAnyParameters = function (node) {
        return (!["protocol", "host", "port", "path"].every(function (key) {
            return node.hasOwnProperty(key);
        }) && node["url"] == null);
    };
    Configuration.prototype.setDefaultPathInNode = function (node) {
        if (node != null && !node.hasOwnProperty("path")) {
            node["path"] = "";
        }
        return node;
    };
    Configuration.prototype.setDefaultPortInNode = function (node) {
        if (node != null &&
            !node.hasOwnProperty("port") &&
            node.hasOwnProperty("protocol")) {
            switch (node["protocol"]) {
                case "https":
                    node["port"] = 443;
                    break;
                case "http":
                    node["port"] = 80;
                    break;
            }
        }
        return node;
    };
    Configuration.prototype.showDeprecationWarnings = function (options) {
        if (options.timeoutSeconds) {
            this.logger.warn("Deprecation warning: timeoutSeconds is now renamed to connectionTimeoutSeconds");
        }
        if (options.masterNode) {
            this.logger.warn("Deprecation warning: masterNode is now consolidated to nodes, starting with Typesense Server v0.12");
        }
        if (options.readReplicaNodes) {
            this.logger.warn("Deprecation warning: readReplicaNodes is now consolidated to nodes, starting with Typesense Server v0.12");
        }
    };
    Configuration.prototype.shuffleArray = function (array) {
        var _a;
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
        }
    };
    return Configuration;
}());
exports["default"] = Configuration;
//# sourceMappingURL=Configuration.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Conversation.js":
/*!**************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Conversation.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Conversations_1 = __importDefault(__webpack_require__(/*! ./Conversations */ "./node_modules/typesense/lib/Typesense/Conversations.js"));
var Conversation = /** @class */ (function () {
    function Conversation(id, apiCall) {
        this.id = id;
        this.apiCall = apiCall;
    }
    Conversation.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Conversation.prototype.update = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(), params)];
            });
        });
    };
    Conversation.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Conversation.prototype.endpointPath = function () {
        return "".concat(Conversations_1.default.RESOURCEPATH, "/").concat(this.id);
    };
    return Conversation;
}());
exports["default"] = Conversation;
//# sourceMappingURL=Conversation.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/ConversationModel.js":
/*!*******************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/ConversationModel.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ConversationModels_1 = __importDefault(__webpack_require__(/*! ./ConversationModels */ "./node_modules/typesense/lib/Typesense/ConversationModels.js"));
var ConversationModel = /** @class */ (function () {
    function ConversationModel(id, apiCall) {
        this.id = id;
        this.apiCall = apiCall;
    }
    ConversationModel.prototype.update = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(), params)];
            });
        });
    };
    ConversationModel.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    ConversationModel.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    ConversationModel.prototype.endpointPath = function () {
        return "".concat(ConversationModels_1.default.RESOURCEPATH, "/").concat(this.id);
    };
    return ConversationModel;
}());
exports["default"] = ConversationModel;
//# sourceMappingURL=ConversationModel.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/ConversationModels.js":
/*!********************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/ConversationModels.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var RESOURCEPATH = "/conversations/models";
var ConversationModels = /** @class */ (function () {
    function ConversationModels(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    ConversationModels.prototype.create = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post(this.endpointPath(), params)];
            });
        });
    };
    ConversationModels.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    ConversationModels.prototype.endpointPath = function (operation) {
        return "".concat(ConversationModels.RESOURCEPATH).concat(operation === undefined ? "" : "/" + operation);
    };
    Object.defineProperty(ConversationModels, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return ConversationModels;
}());
exports["default"] = ConversationModels;
//# sourceMappingURL=ConversationModels.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Conversations.js":
/*!***************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Conversations.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ConversationModels_1 = __importDefault(__webpack_require__(/*! ./ConversationModels */ "./node_modules/typesense/lib/Typesense/ConversationModels.js"));
var ConversationModel_1 = __importDefault(__webpack_require__(/*! ./ConversationModel */ "./node_modules/typesense/lib/Typesense/ConversationModel.js"));
var RESOURCEPATH = "/conversations";
var Conversations = /** @class */ (function () {
    function Conversations(apiCall) {
        this.apiCall = apiCall;
        this.individualConversationModels = {};
        this.apiCall = apiCall;
        this._conversationsModels = new ConversationModels_1.default(this.apiCall);
    }
    Conversations.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    Conversations.prototype.models = function (id) {
        if (id === undefined) {
            return this._conversationsModels;
        }
        else {
            if (this.individualConversationModels[id] === undefined) {
                this.individualConversationModels[id] = new ConversationModel_1.default(id, this.apiCall);
            }
            return this.individualConversationModels[id];
        }
    };
    Object.defineProperty(Conversations, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Conversations;
}());
exports["default"] = Conversations;
//# sourceMappingURL=Conversations.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Debug.js":
/*!*******************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Debug.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var RESOURCEPATH = "/debug";
var Debug = /** @class */ (function () {
    function Debug(apiCall) {
        this.apiCall = apiCall;
    }
    Debug.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    return Debug;
}());
exports["default"] = Debug;
//# sourceMappingURL=Debug.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Document.js":
/*!**********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Document.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Document = void 0;
var Collections_1 = __importDefault(__webpack_require__(/*! ./Collections */ "./node_modules/typesense/lib/Typesense/Collections.js"));
var Documents_1 = __importDefault(__webpack_require__(/*! ./Documents */ "./node_modules/typesense/lib/Typesense/Documents.js"));
var Document = /** @class */ (function () {
    function Document(collectionName, documentId, apiCall) {
        this.collectionName = collectionName;
        this.documentId = documentId;
        this.apiCall = apiCall;
    }
    Document.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Document.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Document.prototype.update = function (partialDocument, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.patch(this.endpointPath(), partialDocument, options)];
            });
        });
    };
    Document.prototype.endpointPath = function () {
        return "".concat(Collections_1.default.RESOURCEPATH, "/").concat(this.collectionName).concat(Documents_1.default.RESOURCEPATH, "/").concat(this.documentId);
    };
    return Document;
}());
exports.Document = Document;
//# sourceMappingURL=Document.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Documents.js":
/*!***********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Documents.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Errors_1 = __webpack_require__(/*! ./Errors */ "./node_modules/typesense/lib/Typesense/Errors/index.js");
var SearchOnlyDocuments_1 = __webpack_require__(/*! ./SearchOnlyDocuments */ "./node_modules/typesense/lib/Typesense/SearchOnlyDocuments.js");
var Documents = /** @class */ (function (_super) {
    __extends(Documents, _super);
    function Documents(collectionName, apiCall, configuration) {
        return _super.call(this, collectionName, apiCall, configuration) || this;
    }
    Documents.prototype.create = function (document, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!document)
                    throw new Error("No document provided");
                return [2 /*return*/, this.apiCall.post(this.endpointPath(), document, options)];
            });
        });
    };
    Documents.prototype.upsert = function (document, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!document)
                    throw new Error("No document provided");
                return [2 /*return*/, this.apiCall.post(this.endpointPath(), document, Object.assign({}, options, { action: "upsert" }))];
            });
        });
    };
    Documents.prototype.update = function (document, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!document)
                    throw new Error("No document provided");
                if (options["filter_by"] != null) {
                    return [2 /*return*/, this.apiCall.patch(this.endpointPath(), document, Object.assign({}, options))];
                }
                else {
                    return [2 /*return*/, this.apiCall.post(this.endpointPath(), document, Object.assign({}, options, { action: "update" }))];
                }
                return [2 /*return*/];
            });
        });
    };
    Documents.prototype.delete = function (query) {
        if (query === void 0) { query = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath(), query)];
            });
        });
    };
    Documents.prototype.createMany = function (documents, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.configuration.logger.warn("createMany is deprecated and will be removed in a future version. Use import instead, which now takes both an array of documents or a JSONL string of documents");
                return [2 /*return*/, this.import(documents, options)];
            });
        });
    };
    Documents.prototype.import = function (documents, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var documentsInJSONLFormat, resultsInJSONLFormat, resultsInJSONFormat, failedItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Array.isArray(documents)) {
                            try {
                                documentsInJSONLFormat = documents
                                    .map(function (document) { return JSON.stringify(document); })
                                    .join("\n");
                            }
                            catch (error) {
                                // if rangeerror, throw custom error message
                                if (RangeError instanceof error &&
                                    (error === null || error === void 0 ? void 0 : error.includes("Too many properties to enumerate"))) {
                                    throw new Error("".concat(error, "\n          It looks like you have reached a Node.js limit that restricts the number of keys in an Object: https://stackoverflow.com/questions/9282869/are-there-limits-to-the-number-of-properties-in-a-javascript-object\n\n          Please try reducing the number of keys in your document, or using CURL to import your data.\n          "));
                                }
                                // else, throw the non-range error anyways
                                throw new Error(error);
                            }
                        }
                        else {
                            documentsInJSONLFormat = documents;
                        }
                        return [4 /*yield*/, this.apiCall.performRequest("post", this.endpointPath("import"), {
                                queryParameters: options,
                                bodyParameters: documentsInJSONLFormat,
                                additionalHeaders: { "Content-Type": "text/plain" },
                                skipConnectionTimeout: true, // We never want to client-side-timeout on an import and retry, since imports are syncronous and we want to let them take as long as it takes to complete fully
                            })];
                    case 1:
                        resultsInJSONLFormat = _a.sent();
                        if (Array.isArray(documents)) {
                            resultsInJSONFormat = resultsInJSONLFormat
                                .split("\n")
                                .map(function (r) { return JSON.parse(r); });
                            failedItems = resultsInJSONFormat.filter(function (r) { return r.success === false; });
                            if (failedItems.length > 0) {
                                throw new Errors_1.ImportError("".concat(resultsInJSONFormat.length - failedItems.length, " documents imported successfully, ").concat(failedItems.length, " documents failed during import. Use `error.importResults` from the raised exception to get a detailed error reason for each document."), resultsInJSONFormat);
                            }
                            else {
                                return [2 /*return*/, resultsInJSONFormat];
                            }
                        }
                        else {
                            return [2 /*return*/, resultsInJSONLFormat];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns a JSONL string for all the documents in this collection
     */
    Documents.prototype.export = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath("export"), options)];
            });
        });
    };
    /**
     * Returns a NodeJS readable stream of JSONL for all the documents in this collection.
     */
    Documents.prototype.exportStream = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath("export"), options, {
                        responseType: "stream",
                    })];
            });
        });
    };
    return Documents;
}(SearchOnlyDocuments_1.SearchOnlyDocuments));
exports["default"] = Documents;
//# sourceMappingURL=Documents.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Errors/HTTPError.js":
/*!******************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Errors/HTTPError.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var TypesenseError_1 = __importDefault(__webpack_require__(/*! ./TypesenseError */ "./node_modules/typesense/lib/Typesense/Errors/TypesenseError.js"));
var HTTPError = /** @class */ (function (_super) {
    __extends(HTTPError, _super);
    function HTTPError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HTTPError;
}(TypesenseError_1.default));
exports["default"] = HTTPError;
//# sourceMappingURL=HTTPError.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Errors/ImportError.js":
/*!********************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Errors/ImportError.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var TypesenseError_1 = __importDefault(__webpack_require__(/*! ./TypesenseError */ "./node_modules/typesense/lib/Typesense/Errors/TypesenseError.js"));
var ImportError = /** @class */ (function (_super) {
    __extends(ImportError, _super);
    function ImportError(message, importResults) {
        var _this = _super.call(this, message) || this;
        _this.importResults = importResults;
        return _this;
    }
    return ImportError;
}(TypesenseError_1.default));
exports["default"] = ImportError;
//# sourceMappingURL=ImportError.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Errors/MissingConfigurationError.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Errors/MissingConfigurationError.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var TypesenseError_1 = __importDefault(__webpack_require__(/*! ./TypesenseError */ "./node_modules/typesense/lib/Typesense/Errors/TypesenseError.js"));
var MissingConfigurationError = /** @class */ (function (_super) {
    __extends(MissingConfigurationError, _super);
    function MissingConfigurationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MissingConfigurationError;
}(TypesenseError_1.default));
exports["default"] = MissingConfigurationError;
//# sourceMappingURL=MissingConfigurationError.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Errors/ObjectAlreadyExists.js":
/*!****************************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Errors/ObjectAlreadyExists.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var TypesenseError_1 = __importDefault(__webpack_require__(/*! ./TypesenseError */ "./node_modules/typesense/lib/Typesense/Errors/TypesenseError.js"));
var ObjectAlreadyExists = /** @class */ (function (_super) {
    __extends(ObjectAlreadyExists, _super);
    function ObjectAlreadyExists() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ObjectAlreadyExists;
}(TypesenseError_1.default));
exports["default"] = ObjectAlreadyExists;
//# sourceMappingURL=ObjectAlreadyExists.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Errors/ObjectNotFound.js":
/*!***********************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Errors/ObjectNotFound.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var TypesenseError_1 = __importDefault(__webpack_require__(/*! ./TypesenseError */ "./node_modules/typesense/lib/Typesense/Errors/TypesenseError.js"));
var ObjectNotFound = /** @class */ (function (_super) {
    __extends(ObjectNotFound, _super);
    function ObjectNotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ObjectNotFound;
}(TypesenseError_1.default));
exports["default"] = ObjectNotFound;
//# sourceMappingURL=ObjectNotFound.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Errors/ObjectUnprocessable.js":
/*!****************************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Errors/ObjectUnprocessable.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var TypesenseError_1 = __importDefault(__webpack_require__(/*! ./TypesenseError */ "./node_modules/typesense/lib/Typesense/Errors/TypesenseError.js"));
var ObjectUnprocessable = /** @class */ (function (_super) {
    __extends(ObjectUnprocessable, _super);
    function ObjectUnprocessable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ObjectUnprocessable;
}(TypesenseError_1.default));
exports["default"] = ObjectUnprocessable;
//# sourceMappingURL=ObjectUnprocessable.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Errors/RequestMalformed.js":
/*!*************************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Errors/RequestMalformed.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var TypesenseError_1 = __importDefault(__webpack_require__(/*! ./TypesenseError */ "./node_modules/typesense/lib/Typesense/Errors/TypesenseError.js"));
var RequestMalformed = /** @class */ (function (_super) {
    __extends(RequestMalformed, _super);
    function RequestMalformed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RequestMalformed;
}(TypesenseError_1.default));
exports["default"] = RequestMalformed;
//# sourceMappingURL=RequestMalformed.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Errors/RequestUnauthorized.js":
/*!****************************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Errors/RequestUnauthorized.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var TypesenseError_1 = __importDefault(__webpack_require__(/*! ./TypesenseError */ "./node_modules/typesense/lib/Typesense/Errors/TypesenseError.js"));
var RequestUnauthorized = /** @class */ (function (_super) {
    __extends(RequestUnauthorized, _super);
    function RequestUnauthorized() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RequestUnauthorized;
}(TypesenseError_1.default));
exports["default"] = RequestUnauthorized;
//# sourceMappingURL=RequestUnauthorized.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Errors/ServerError.js":
/*!********************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Errors/ServerError.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var TypesenseError_1 = __importDefault(__webpack_require__(/*! ./TypesenseError */ "./node_modules/typesense/lib/Typesense/Errors/TypesenseError.js"));
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServerError;
}(TypesenseError_1.default));
exports["default"] = ServerError;
//# sourceMappingURL=ServerError.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Errors/TypesenseError.js":
/*!***********************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Errors/TypesenseError.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var TypesenseError = /** @class */ (function (_super) {
    __extends(TypesenseError, _super);
    // Source: https://stackoverflow.com/a/58417721/123545
    function TypesenseError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = _newTarget.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return TypesenseError;
}(Error));
exports["default"] = TypesenseError;
//# sourceMappingURL=TypesenseError.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Errors/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Errors/index.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImportError = exports.TypesenseError = exports.ServerError = exports.RequestUnauthorized = exports.RequestMalformed = exports.ObjectUnprocessable = exports.ObjectNotFound = exports.ObjectAlreadyExists = exports.MissingConfigurationError = exports.HTTPError = void 0;
var HTTPError_1 = __importDefault(__webpack_require__(/*! ./HTTPError */ "./node_modules/typesense/lib/Typesense/Errors/HTTPError.js"));
exports.HTTPError = HTTPError_1.default;
var MissingConfigurationError_1 = __importDefault(__webpack_require__(/*! ./MissingConfigurationError */ "./node_modules/typesense/lib/Typesense/Errors/MissingConfigurationError.js"));
exports.MissingConfigurationError = MissingConfigurationError_1.default;
var ObjectAlreadyExists_1 = __importDefault(__webpack_require__(/*! ./ObjectAlreadyExists */ "./node_modules/typesense/lib/Typesense/Errors/ObjectAlreadyExists.js"));
exports.ObjectAlreadyExists = ObjectAlreadyExists_1.default;
var ObjectNotFound_1 = __importDefault(__webpack_require__(/*! ./ObjectNotFound */ "./node_modules/typesense/lib/Typesense/Errors/ObjectNotFound.js"));
exports.ObjectNotFound = ObjectNotFound_1.default;
var ObjectUnprocessable_1 = __importDefault(__webpack_require__(/*! ./ObjectUnprocessable */ "./node_modules/typesense/lib/Typesense/Errors/ObjectUnprocessable.js"));
exports.ObjectUnprocessable = ObjectUnprocessable_1.default;
var RequestMalformed_1 = __importDefault(__webpack_require__(/*! ./RequestMalformed */ "./node_modules/typesense/lib/Typesense/Errors/RequestMalformed.js"));
exports.RequestMalformed = RequestMalformed_1.default;
var RequestUnauthorized_1 = __importDefault(__webpack_require__(/*! ./RequestUnauthorized */ "./node_modules/typesense/lib/Typesense/Errors/RequestUnauthorized.js"));
exports.RequestUnauthorized = RequestUnauthorized_1.default;
var ServerError_1 = __importDefault(__webpack_require__(/*! ./ServerError */ "./node_modules/typesense/lib/Typesense/Errors/ServerError.js"));
exports.ServerError = ServerError_1.default;
var ImportError_1 = __importDefault(__webpack_require__(/*! ./ImportError */ "./node_modules/typesense/lib/Typesense/Errors/ImportError.js"));
exports.ImportError = ImportError_1.default;
var TypesenseError_1 = __importDefault(__webpack_require__(/*! ./TypesenseError */ "./node_modules/typesense/lib/Typesense/Errors/TypesenseError.js"));
exports.TypesenseError = TypesenseError_1.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Health.js":
/*!********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Health.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var RESOURCEPATH = "/health";
var Health = /** @class */ (function () {
    function Health(apiCall) {
        this.apiCall = apiCall;
    }
    Health.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    return Health;
}());
exports["default"] = Health;
//# sourceMappingURL=Health.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Key.js":
/*!*****************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Key.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Keys_1 = __importDefault(__webpack_require__(/*! ./Keys */ "./node_modules/typesense/lib/Typesense/Keys.js"));
var Key = /** @class */ (function () {
    function Key(id, apiCall) {
        this.id = id;
        this.apiCall = apiCall;
    }
    Key.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Key.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Key.prototype.endpointPath = function () {
        return "".concat(Keys_1.default.RESOURCEPATH, "/").concat(this.id);
    };
    return Key;
}());
exports["default"] = Key;
//# sourceMappingURL=Key.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Keys.js":
/*!******************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Keys.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var crypto_1 = __webpack_require__(/*! crypto */ "?6884");
var RESOURCEPATH = "/keys";
var Keys = /** @class */ (function () {
    function Keys(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    Keys.prototype.create = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post(Keys.RESOURCEPATH, params)];
            });
        });
    };
    Keys.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    Keys.prototype.generateScopedSearchKey = function (searchKey, parameters) {
        // Note: only a key generated with the `documents:search` action will be
        // accepted by the server, when usined with the search endpoint.
        var paramsJSON = JSON.stringify(parameters);
        var digest = Buffer.from((0, crypto_1.createHmac)("sha256", searchKey).update(paramsJSON).digest("base64"));
        var keyPrefix = searchKey.substr(0, 4);
        var rawScopedKey = "".concat(digest).concat(keyPrefix).concat(paramsJSON);
        return Buffer.from(rawScopedKey).toString("base64");
    };
    Object.defineProperty(Keys, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Keys;
}());
exports["default"] = Keys;
//# sourceMappingURL=Keys.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Metrics.js":
/*!*********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Metrics.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var RESOURCEPATH = "/metrics.json";
var Metrics = /** @class */ (function () {
    function Metrics(apiCall) {
        this.apiCall = apiCall;
    }
    Metrics.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    return Metrics;
}());
exports["default"] = Metrics;
//# sourceMappingURL=Metrics.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/MultiSearch.js":
/*!*************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/MultiSearch.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var RequestWithCache_1 = __importDefault(__webpack_require__(/*! ./RequestWithCache */ "./node_modules/typesense/lib/Typesense/RequestWithCache.js"));
var RESOURCEPATH = "/multi_search";
var MultiSearch = /** @class */ (function () {
    function MultiSearch(apiCall, configuration, useTextContentType) {
        if (useTextContentType === void 0) { useTextContentType = false; }
        this.apiCall = apiCall;
        this.configuration = configuration;
        this.useTextContentType = useTextContentType;
        this.requestWithCache = new RequestWithCache_1.default();
    }
    MultiSearch.prototype.clearCache = function () {
        this.requestWithCache.clearCache();
    };
    MultiSearch.prototype.perform = function (searchRequests, commonParams, _a) {
        if (commonParams === void 0) { commonParams = {}; }
        var _b = _a === void 0 ? {} : _a, _c = _b.cacheSearchResultsForSeconds, cacheSearchResultsForSeconds = _c === void 0 ? this.configuration
            .cacheSearchResultsForSeconds : _c;
        return __awaiter(this, void 0, void 0, function () {
            var additionalHeaders, additionalQueryParams, queryParams;
            return __generator(this, function (_d) {
                additionalHeaders = {};
                if (this.useTextContentType) {
                    additionalHeaders["content-type"] = "text/plain";
                }
                additionalQueryParams = {};
                if (this.configuration.useServerSideSearchCache === true) {
                    additionalQueryParams["use_cache"] = true;
                }
                queryParams = Object.assign({}, commonParams, additionalQueryParams);
                return [2 /*return*/, this.requestWithCache.perform(this.apiCall, this.apiCall.post, [RESOURCEPATH, searchRequests, queryParams, additionalHeaders], { cacheResponseForSeconds: cacheSearchResultsForSeconds })];
            });
        });
    };
    return MultiSearch;
}());
exports["default"] = MultiSearch;
//# sourceMappingURL=MultiSearch.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Operations.js":
/*!************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Operations.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var RESOURCEPATH = "/operations";
var Operations = /** @class */ (function () {
    function Operations(apiCall) {
        this.apiCall = apiCall;
    }
    Operations.prototype.perform = function (operationName, queryParameters) {
        if (queryParameters === void 0) { queryParameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post("".concat(RESOURCEPATH, "/").concat(operationName), {}, queryParameters)];
            });
        });
    };
    return Operations;
}());
exports["default"] = Operations;
//# sourceMappingURL=Operations.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Override.js":
/*!**********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Override.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Collections_1 = __importDefault(__webpack_require__(/*! ./Collections */ "./node_modules/typesense/lib/Typesense/Collections.js"));
var Overrides_1 = __importDefault(__webpack_require__(/*! ./Overrides */ "./node_modules/typesense/lib/Typesense/Overrides.js"));
var Override = /** @class */ (function () {
    function Override(collectionName, overrideId, apiCall) {
        this.collectionName = collectionName;
        this.overrideId = overrideId;
        this.apiCall = apiCall;
    }
    Override.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Override.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Override.prototype.endpointPath = function () {
        return "".concat(Collections_1.default.RESOURCEPATH, "/").concat(this.collectionName).concat(Overrides_1.default.RESOURCEPATH, "/").concat(this.overrideId);
    };
    return Override;
}());
exports["default"] = Override;
//# sourceMappingURL=Override.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Overrides.js":
/*!***********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Overrides.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Collections_1 = __importDefault(__webpack_require__(/*! ./Collections */ "./node_modules/typesense/lib/Typesense/Collections.js"));
var RESOURCEPATH = "/overrides";
var Overrides = /** @class */ (function () {
    function Overrides(collectionName, apiCall) {
        this.collectionName = collectionName;
        this.apiCall = apiCall;
    }
    Overrides.prototype.upsert = function (overrideId, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(overrideId), params)];
            });
        });
    };
    Overrides.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Overrides.prototype.endpointPath = function (operation) {
        return "".concat(Collections_1.default.RESOURCEPATH, "/").concat(this.collectionName).concat(Overrides.RESOURCEPATH).concat(operation === undefined ? "" : "/" + operation);
    };
    Object.defineProperty(Overrides, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Overrides;
}());
exports["default"] = Overrides;
//# sourceMappingURL=Overrides.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Preset.js":
/*!********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Preset.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Presets_1 = __importDefault(__webpack_require__(/*! ./Presets */ "./node_modules/typesense/lib/Typesense/Presets.js"));
var Preset = /** @class */ (function () {
    function Preset(presetId, apiCall) {
        this.presetId = presetId;
        this.apiCall = apiCall;
    }
    Preset.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Preset.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Preset.prototype.endpointPath = function () {
        return "".concat(Presets_1.default.RESOURCEPATH, "/").concat(this.presetId);
    };
    return Preset;
}());
exports["default"] = Preset;
//# sourceMappingURL=Preset.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Presets.js":
/*!*********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Presets.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var RESOURCEPATH = "/presets";
var Presets = /** @class */ (function () {
    function Presets(apiCall) {
        this.apiCall = apiCall;
    }
    Presets.prototype.upsert = function (presetId, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(presetId), params)];
            });
        });
    };
    Presets.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Presets.prototype.endpointPath = function (operation) {
        return "".concat(Presets.RESOURCEPATH).concat(operation === undefined ? "" : "/" + operation);
    };
    Object.defineProperty(Presets, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Presets;
}());
exports["default"] = Presets;
//# sourceMappingURL=Presets.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/RequestWithCache.js":
/*!******************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/RequestWithCache.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var defaultCacheResponseForSeconds = 2 * 60;
var defaultMaxSize = 100;
var RequestWithCache = /** @class */ (function () {
    function RequestWithCache() {
        this.responseCache = new Map();
        this.responsePromiseCache = new Map();
    }
    RequestWithCache.prototype.clearCache = function () {
        this.responseCache = new Map();
        this.responsePromiseCache = new Map();
    };
    // Todo: should probably be passed a callback instead, or an apiCall instance. Types are messy this way
    RequestWithCache.prototype.perform = function (requestContext, requestFunction, requestFunctionArguments, cacheOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cacheResponseForSeconds, _b, maxSize, isCacheDisabled, requestFunctionArgumentsJSON, cacheEntry, now, isEntryValid, cachePromiseEntry, isEntryValid, responsePromise, response, isCacheOverMaxSize, oldestEntry, isResponsePromiseCacheOverMaxSize, oldestEntry;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = cacheOptions.cacheResponseForSeconds, cacheResponseForSeconds = _a === void 0 ? defaultCacheResponseForSeconds : _a, _b = cacheOptions.maxSize, maxSize = _b === void 0 ? defaultMaxSize : _b;
                        isCacheDisabled = cacheResponseForSeconds <= 0 || maxSize <= 0;
                        if (isCacheDisabled) {
                            return [2 /*return*/, requestFunction.call.apply(requestFunction, __spreadArray([requestContext], requestFunctionArguments, false))];
                        }
                        requestFunctionArgumentsJSON = JSON.stringify(requestFunctionArguments);
                        cacheEntry = this.responseCache.get(requestFunctionArgumentsJSON);
                        now = Date.now();
                        if (cacheEntry) {
                            isEntryValid = now - cacheEntry.requestTimestamp < cacheResponseForSeconds * 1000;
                            if (isEntryValid) {
                                this.responseCache.delete(requestFunctionArgumentsJSON);
                                this.responseCache.set(requestFunctionArgumentsJSON, cacheEntry);
                                return [2 /*return*/, Promise.resolve(cacheEntry.response)];
                            }
                            else {
                                this.responseCache.delete(requestFunctionArgumentsJSON);
                            }
                        }
                        cachePromiseEntry = this.responsePromiseCache.get(requestFunctionArgumentsJSON);
                        if (cachePromiseEntry) {
                            isEntryValid = now - cachePromiseEntry.requestTimestamp <
                                cacheResponseForSeconds * 1000;
                            if (isEntryValid) {
                                this.responsePromiseCache.delete(requestFunctionArgumentsJSON);
                                this.responsePromiseCache.set(requestFunctionArgumentsJSON, cachePromiseEntry);
                                return [2 /*return*/, cachePromiseEntry.responsePromise];
                            }
                            else {
                                this.responsePromiseCache.delete(requestFunctionArgumentsJSON);
                            }
                        }
                        responsePromise = requestFunction.call.apply(requestFunction, __spreadArray([requestContext], requestFunctionArguments, false));
                        this.responsePromiseCache.set(requestFunctionArgumentsJSON, {
                            requestTimestamp: now,
                            responsePromise: responsePromise,
                        });
                        return [4 /*yield*/, responsePromise];
                    case 1:
                        response = _c.sent();
                        this.responseCache.set(requestFunctionArgumentsJSON, {
                            requestTimestamp: now,
                            response: response,
                        });
                        isCacheOverMaxSize = this.responseCache.size > maxSize;
                        if (isCacheOverMaxSize) {
                            oldestEntry = this.responseCache.keys().next().value;
                            this.responseCache.delete(oldestEntry);
                        }
                        isResponsePromiseCacheOverMaxSize = this.responsePromiseCache.size > maxSize;
                        if (isResponsePromiseCacheOverMaxSize) {
                            oldestEntry = this.responsePromiseCache.keys().next().value;
                            this.responsePromiseCache.delete(oldestEntry);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return RequestWithCache;
}());
exports["default"] = RequestWithCache;
//# sourceMappingURL=RequestWithCache.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/SearchClient.js":
/*!**************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/SearchClient.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Configuration_1 = __importDefault(__webpack_require__(/*! ./Configuration */ "./node_modules/typesense/lib/Typesense/Configuration.js"));
var ApiCall_1 = __importDefault(__webpack_require__(/*! ./ApiCall */ "./node_modules/typesense/lib/Typesense/ApiCall.js"));
var MultiSearch_1 = __importDefault(__webpack_require__(/*! ./MultiSearch */ "./node_modules/typesense/lib/Typesense/MultiSearch.js"));
var SearchOnlyCollection_1 = __webpack_require__(/*! ./SearchOnlyCollection */ "./node_modules/typesense/lib/Typesense/SearchOnlyCollection.js");
var SearchClient = /** @class */ (function () {
    function SearchClient(options) {
        var _a;
        options.sendApiKeyAsQueryParam = (_a = options.sendApiKeyAsQueryParam) !== null && _a !== void 0 ? _a : true;
        if (options.sendApiKeyAsQueryParam === true &&
            (options.apiKey || "").length > 2000) {
            console.warn("[typesense] API Key is longer than 2000 characters which is over the allowed limit, so disabling sending it as a query parameter.");
            options.sendApiKeyAsQueryParam = false;
        }
        this.configuration = new Configuration_1.default(options);
        this.apiCall = new ApiCall_1.default(this.configuration);
        this.multiSearch = new MultiSearch_1.default(this.apiCall, this.configuration, true);
        this.individualCollections = {};
    }
    SearchClient.prototype.clearCache = function () {
        this.multiSearch.clearCache();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(this.individualCollections).forEach(function (_a) {
            var _ = _a[0], collection = _a[1];
            collection.documents().clearCache();
        });
    };
    SearchClient.prototype.collections = function (collectionName) {
        if (!collectionName) {
            throw new Error("Typesense.SearchClient only supports search operations, so the collectionName that needs to " +
                "be searched must be specified. Use Typesense.Client if you need to access the collection object.");
        }
        else {
            if (this.individualCollections[collectionName] === undefined) {
                this.individualCollections[collectionName] = new SearchOnlyCollection_1.SearchOnlyCollection(collectionName, this.apiCall, this.configuration);
            }
            return this.individualCollections[collectionName];
        }
    };
    return SearchClient;
}());
exports["default"] = SearchClient;
//# sourceMappingURL=SearchClient.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/SearchOnlyCollection.js":
/*!**********************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/SearchOnlyCollection.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchOnlyCollection = void 0;
var SearchOnlyDocuments_1 = __webpack_require__(/*! ./SearchOnlyDocuments */ "./node_modules/typesense/lib/Typesense/SearchOnlyDocuments.js");
var SearchOnlyCollection = /** @class */ (function () {
    function SearchOnlyCollection(name, apiCall, configuration) {
        this.name = name;
        this.apiCall = apiCall;
        this.configuration = configuration;
        this._documents = new SearchOnlyDocuments_1.SearchOnlyDocuments(this.name, this.apiCall, this.configuration);
    }
    SearchOnlyCollection.prototype.documents = function () {
        return this._documents;
    };
    return SearchOnlyCollection;
}());
exports.SearchOnlyCollection = SearchOnlyCollection;
//# sourceMappingURL=SearchOnlyCollection.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/SearchOnlyDocuments.js":
/*!*********************************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/SearchOnlyDocuments.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchOnlyDocuments = void 0;
var RequestWithCache_1 = __importDefault(__webpack_require__(/*! ./RequestWithCache */ "./node_modules/typesense/lib/Typesense/RequestWithCache.js"));
var Collections_1 = __importDefault(__webpack_require__(/*! ./Collections */ "./node_modules/typesense/lib/Typesense/Collections.js"));
var RESOURCEPATH = "/documents";
var SearchOnlyDocuments = /** @class */ (function () {
    function SearchOnlyDocuments(collectionName, apiCall, configuration) {
        this.collectionName = collectionName;
        this.apiCall = apiCall;
        this.configuration = configuration;
        this.requestWithCache = new RequestWithCache_1.default();
    }
    SearchOnlyDocuments.prototype.clearCache = function () {
        this.requestWithCache.clearCache();
    };
    SearchOnlyDocuments.prototype.search = function (searchParameters, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.cacheSearchResultsForSeconds, cacheSearchResultsForSeconds = _c === void 0 ? this.configuration
            .cacheSearchResultsForSeconds : _c, _d = _b.abortSignal, abortSignal = _d === void 0 ? null : _d;
        return __awaiter(this, void 0, void 0, function () {
            var additionalQueryParams, key, queryParams;
            return __generator(this, function (_e) {
                additionalQueryParams = {};
                if (this.configuration.useServerSideSearchCache === true) {
                    additionalQueryParams["use_cache"] = true;
                }
                for (key in searchParameters) {
                    if (Array.isArray(searchParameters[key])) {
                        additionalQueryParams[key] = searchParameters[key].join(",");
                    }
                }
                queryParams = Object.assign({}, searchParameters, additionalQueryParams);
                return [2 /*return*/, this.requestWithCache.perform(this.apiCall, this.apiCall.get, [this.endpointPath("search"), queryParams, { abortSignal: abortSignal }], {
                        cacheResponseForSeconds: cacheSearchResultsForSeconds,
                    })];
            });
        });
    };
    SearchOnlyDocuments.prototype.endpointPath = function (operation) {
        return "".concat(Collections_1.default.RESOURCEPATH, "/").concat(this.collectionName).concat(RESOURCEPATH).concat(operation === undefined ? "" : "/" + operation);
    };
    Object.defineProperty(SearchOnlyDocuments, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return SearchOnlyDocuments;
}());
exports.SearchOnlyDocuments = SearchOnlyDocuments;
//# sourceMappingURL=SearchOnlyDocuments.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Stopword.js":
/*!**********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Stopword.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Stopwords_1 = __importDefault(__webpack_require__(/*! ./Stopwords */ "./node_modules/typesense/lib/Typesense/Stopwords.js"));
var Stopword = /** @class */ (function () {
    function Stopword(stopwordId, apiCall) {
        this.stopwordId = stopwordId;
        this.apiCall = apiCall;
    }
    Stopword.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Stopword.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Stopword.prototype.endpointPath = function () {
        return "".concat(Stopwords_1.default.RESOURCEPATH, "/").concat(this.stopwordId);
    };
    return Stopword;
}());
exports["default"] = Stopword;
//# sourceMappingURL=Stopword.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Stopwords.js":
/*!***********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Stopwords.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var RESOURCEPATH = "/stopwords";
var Stopwords = /** @class */ (function () {
    function Stopwords(apiCall) {
        this.apiCall = apiCall;
    }
    Stopwords.prototype.upsert = function (stopwordId, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(stopwordId), params)];
            });
        });
    };
    Stopwords.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Stopwords.prototype.endpointPath = function (operation) {
        return "".concat(Stopwords.RESOURCEPATH).concat(operation === undefined ? "" : "/" + operation);
    };
    Object.defineProperty(Stopwords, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Stopwords;
}());
exports["default"] = Stopwords;
//# sourceMappingURL=Stopwords.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Synonym.js":
/*!*********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Synonym.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Collections_1 = __importDefault(__webpack_require__(/*! ./Collections */ "./node_modules/typesense/lib/Typesense/Collections.js"));
var Synonyms_1 = __importDefault(__webpack_require__(/*! ./Synonyms */ "./node_modules/typesense/lib/Typesense/Synonyms.js"));
var Synonym = /** @class */ (function () {
    function Synonym(collectionName, synonymId, apiCall) {
        this.collectionName = collectionName;
        this.synonymId = synonymId;
        this.apiCall = apiCall;
    }
    Synonym.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Synonym.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Synonym.prototype.endpointPath = function () {
        return "".concat(Collections_1.default.RESOURCEPATH, "/").concat(this.collectionName).concat(Synonyms_1.default.RESOURCEPATH, "/").concat(this.synonymId);
    };
    return Synonym;
}());
exports["default"] = Synonym;
//# sourceMappingURL=Synonym.js.map

/***/ }),

/***/ "./node_modules/typesense/lib/Typesense/Synonyms.js":
/*!**********************************************************!*\
  !*** ./node_modules/typesense/lib/Typesense/Synonyms.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Collections_1 = __importDefault(__webpack_require__(/*! ./Collections */ "./node_modules/typesense/lib/Typesense/Collections.js"));
var RESOURCEPATH = "/synonyms";
var Synonyms = /** @class */ (function () {
    function Synonyms(collectionName, apiCall) {
        this.collectionName = collectionName;
        this.apiCall = apiCall;
    }
    Synonyms.prototype.upsert = function (synonymId, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(synonymId), params)];
            });
        });
    };
    Synonyms.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Synonyms.prototype.endpointPath = function (operation) {
        return "".concat(Collections_1.default.RESOURCEPATH, "/").concat(this.collectionName).concat(Synonyms.RESOURCEPATH).concat(operation === undefined ? "" : "/" + operation);
    };
    Object.defineProperty(Synonyms, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Synonyms;
}());
exports["default"] = Synonyms;
//# sourceMappingURL=Synonyms.js.map

/***/ }),

/***/ "?6884":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./node_modules/axios/dist/browser/axios.cjs":
/*!***************************************************!*\
  !*** ./node_modules/axios/dist/browser/axios.cjs ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Axios v1.6.8 Copyright (c) 2024 Matt Zabriskie and contributors


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
};

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : __webpack_require__.g)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0];
  }

  return str;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  };

  return visit(obj, 0);
};

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

var utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils$1.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const prototype$1 = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);

  utils$1.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

// eslint-disable-next-line strict
var httpAdapter = null;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils$1.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

  if (!utils$1.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils$1.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils$1.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils$1.isArray(value) && isFlatArray(value)) ||
        ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils$1.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils$1.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode$1(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ?
      params.toString() :
      new AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

var InterceptorManager$1 = InterceptorManager;

var transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

var platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};

const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv = (
  (product) => {
    return hasBrowserEnv && ['ReactNative', 'NativeScript', 'NS'].indexOf(product) < 0
  })(typeof navigator !== 'undefined' && navigator.product);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hasBrowserEnv: hasBrowserEnv,
  hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
  hasStandardBrowserEnv: hasStandardBrowserEnv
});

var platform = {
  ...utils,
  ...platform$1
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];

    if (name === '__proto__') return true;

    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};

    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: transitionalDefaults,

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils$1.isObject(data);

    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils$1.isFormData(data);

    if (isFormData) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }

    if (utils$1.isArrayBuffer(data) ||
      utils$1.isBuffer(data) ||
      utils$1.isStream(data) ||
      utils$1.isFile(data) ||
      utils$1.isBlob(data)
    ) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return toFormData(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && utils$1.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};

utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

var defaults$1 = defaults;

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils$1.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils$1.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils$1.isString(value)) return;

  if (utils$1.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils$1.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils$1.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if(utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils$1.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
utils$1.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

utils$1.freezeMethods(AxiosHeaders);

var AxiosHeaders$1 = AxiosHeaders;

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults$1;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;

  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils$1.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

var cookies = platform.hasStandardBrowserEnv ?

  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + '=' + encodeURIComponent(value)];

      utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

      utils$1.isString(path) && cookie.push('path=' + path);

      utils$1.isString(domain) && cookie.push('domain=' + domain);

      secure === true && cookie.push('secure');

      document.cookie = cookie.join('; ');
    },

    read(name) {
      const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return (match ? decodeURIComponent(match[3]) : null);
    },

    remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  }

  :

  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {},
    read() {
      return null;
    },
    remove() {}
  };

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

var isURLSameOrigin = platform.hasStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover its components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (utils$1.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })();

function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

var xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
    let {responseType, withXSRFToken} = config;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    let contentType;

    if (utils$1.isFormData(requestData)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false); // Let the browser set it
      } else if ((contentType = requestHeaders.getContentType()) !== false) {
        // fix semicolon duplication issue for ReactNative FormData implementation
        const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
        requestHeaders.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
      }
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = AxiosHeaders$1.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if(platform.hasStandardBrowserEnv) {
      withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(config));

      if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(fullPath))) {
        // Add xsrf header
        const xsrfValue = config.xsrfHeaderName && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

        if (xsrfValue) {
          requestHeaders.set(config.xsrfHeaderName, xsrfValue);
        }
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils$1.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(fullPath);

    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
};

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};

utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

const renderReason = (reason) => `- ${reason}`;

const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;

var adapters = {
  getAdapter: (adapters) => {
    adapters = utils$1.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    const rejectedReasons = {};

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;

      adapter = nameOrAdapter;

      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

        if (adapter === undefined) {
          throw new AxiosError(`Unknown adapter '${id}'`);
        }
      }

      if (adapter) {
        break;
      }

      rejectedReasons[id || '#' + i] = adapter;
    }

    if (!adapter) {

      const reasons = Object.entries(rejectedReasons)
        .map(([id, state]) => `adapter ${id} ` +
          (state === false ? 'is not supported by the environment' : 'is not available in the build')
        );

      let s = length ?
        (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
        'as no adapter specified';

      throw new AxiosError(
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT'
      );
    }

    return adapter;
  },
  adapters: knownAdapters
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders$1.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = AxiosHeaders$1.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({caseless}, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

const VERSION = "1.6.8";

const validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

var validator = {
  assertOptions,
  validators: validators$1
};

const validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy;

        Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : (dummy = new Error());

        // slice off the Error: ... line
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';

        if (!err.stack) {
          err.stack = stack;
          // match without the 2 top stack lines
        } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
          err.stack += '\n' + stack;
        }
      }

      throw err;
    }
  }

  _request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );

    headers && utils$1.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

var Axios$1 = Axios;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

var CancelToken$1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils$1.isObject(payload) && (payload.isAxiosError === true);
}

const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

var HttpStatusCode$1 = HttpStatusCode;

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);

  // Copy axios.prototype to instance
  utils$1.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils$1.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults$1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios$1;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = AxiosHeaders$1;

axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = adapters.getAdapter;

axios.HttpStatusCode = HttpStatusCode$1;

axios.default = axios;

module.exports = axios;
//# sourceMappingURL=axios.cjs.map


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(obj, key, value) {
  key = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectWithoutProperties)
/* harmony export */ });
/* harmony import */ var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectWithoutPropertiesLoose.js */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = (0,_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectWithoutPropertiesLoose)
/* harmony export */ });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function toPrimitive(t, r) {
  if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function toPropertyKey(t) {
  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t, "string");
  return "symbol" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i) ? i : i + "";
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************************************!*\
  !*** ./src/TypesenseInstantsearchAdapter.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TypesenseInstantsearchAdapter)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Configuration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Configuration */ "./src/Configuration.js");
/* harmony import */ var typesense__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typesense */ "./node_modules/typesense/lib/Typesense.js");
/* harmony import */ var typesense__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typesense__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _SearchRequestAdapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SearchRequestAdapter */ "./src/SearchRequestAdapter.js");
/* harmony import */ var _SearchResponseAdapter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SearchResponseAdapter */ "./src/SearchResponseAdapter.js");
/* harmony import */ var _FacetSearchResponseAdapter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FacetSearchResponseAdapter */ "./src/FacetSearchResponseAdapter.js");











var TypesenseInstantsearchAdapter = /*#__PURE__*/function () {
  function TypesenseInstantsearchAdapter(options) {
    var _this = this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, TypesenseInstantsearchAdapter);
    this.updateConfiguration(options);
    this.searchClient = {
      clearCache: function clearCache() {
        return _this.clearCache();
      },
      search: function search(instantsearchRequests) {
        return _this.searchTypesenseAndAdapt(instantsearchRequests);
      },
      searchForFacetValues: function searchForFacetValues(instantsearchRequests) {
        return _this.searchTypesenseForFacetValuesAndAdapt(instantsearchRequests);
      }
    };
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(TypesenseInstantsearchAdapter, [{
    key: "searchTypesenseAndAdapt",
    value: function () {
      var _searchTypesenseAndAdapt = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(instantsearchRequests) {
        var _this2 = this;
        var typesenseResponse, adaptedResponses;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return this._adaptAndPerformTypesenseRequest(instantsearchRequests);
            case 3:
              typesenseResponse = _context.sent;
              adaptedResponses = typesenseResponse.results.map(function (typesenseResult, index) {
                _this2._validateTypesenseResult(typesenseResult);
                var responseAdapter = new _SearchResponseAdapter__WEBPACK_IMPORTED_MODULE_7__.SearchResponseAdapter(typesenseResult, instantsearchRequests[index], _this2.configuration, typesenseResponse.results, typesenseResponse);
                var adaptedResponse = responseAdapter.adapt();
                return adaptedResponse;
              });
              return _context.abrupt("return", {
                results: adaptedResponses
              });
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);
              throw _context.t0;
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 8]]);
      }));
      function searchTypesenseAndAdapt(_x) {
        return _searchTypesenseAndAdapt.apply(this, arguments);
      }
      return searchTypesenseAndAdapt;
    }()
  }, {
    key: "searchTypesenseForFacetValuesAndAdapt",
    value: function () {
      var _searchTypesenseForFacetValuesAndAdapt = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2(instantsearchRequests) {
        var _this3 = this;
        var typesenseResponse, adaptedResponses;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return this._adaptAndPerformTypesenseRequest(instantsearchRequests);
            case 3:
              typesenseResponse = _context2.sent;
              adaptedResponses = typesenseResponse.results.map(function (typesenseResult, index) {
                _this3._validateTypesenseResult(typesenseResult);
                var responseAdapter = new _FacetSearchResponseAdapter__WEBPACK_IMPORTED_MODULE_8__.FacetSearchResponseAdapter(typesenseResult, instantsearchRequests[index], _this3.configuration);
                return responseAdapter.adapt();
              });
              return _context2.abrupt("return", adaptedResponses);
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);
              throw _context2.t0;
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 8]]);
      }));
      function searchTypesenseForFacetValuesAndAdapt(_x2) {
        return _searchTypesenseForFacetValuesAndAdapt.apply(this, arguments);
      }
      return searchTypesenseForFacetValuesAndAdapt;
    }()
  }, {
    key: "_adaptAndPerformTypesenseRequest",
    value: function () {
      var _adaptAndPerformTypesenseRequest2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee3(instantsearchRequests) {
        var requestAdapter, typesenseResponse;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              requestAdapter = new _SearchRequestAdapter__WEBPACK_IMPORTED_MODULE_6__.SearchRequestAdapter(instantsearchRequests, this.typesenseClient, this.configuration);
              _context3.next = 3;
              return requestAdapter.request();
            case 3:
              typesenseResponse = _context3.sent;
              return _context3.abrupt("return", typesenseResponse);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function _adaptAndPerformTypesenseRequest(_x3) {
        return _adaptAndPerformTypesenseRequest2.apply(this, arguments);
      }
      return _adaptAndPerformTypesenseRequest;
    }()
  }, {
    key: "clearCache",
    value: function clearCache() {
      this.typesenseClient = new typesense__WEBPACK_IMPORTED_MODULE_5__.SearchClient(this.configuration.server);
      return this.searchClient;
    }
  }, {
    key: "updateConfiguration",
    value: function updateConfiguration(options) {
      this.configuration = new _Configuration__WEBPACK_IMPORTED_MODULE_4__.Configuration(options);
      this.configuration.validate();
      this.typesenseClient = new typesense__WEBPACK_IMPORTED_MODULE_5__.SearchClient(this.configuration.server);
      return true;
    }
  }, {
    key: "_validateTypesenseResult",
    value: function _validateTypesenseResult(typesenseResult) {
      if (typesenseResult.error) {
        throw new Error("".concat(typesenseResult.code, " - ").concat(typesenseResult.error));
      }
      if (!typesenseResult.hits && !typesenseResult.grouped_hits) {
        throw new Error("Did not find any hits. ".concat(typesenseResult.code, " - ").concat(typesenseResult.error));
      }
    }
  }]);
}();

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=typesense-instantsearch-adapter.js.map