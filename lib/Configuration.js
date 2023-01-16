"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Configuration = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
        _options$collectionSp,
        _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Configuration);
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
    this.collectionSpecificSearchParameters = (_options$collectionSp = options.collectionSpecificSearchParameters) !== null && _options$collectionSp !== void 0 ? _options$collectionSp : {};
    Object.keys(this.collectionSpecificSearchParameters).forEach(function (collection) {
      var _params$queryBy, _params$preset, _params$sortBy, _ref5, _ref6, _params$highlightFull;

      var params = _this.collectionSpecificSearchParameters[collection];
      params.query_by = (_params$queryBy = params.queryBy) !== null && _params$queryBy !== void 0 ? _params$queryBy : params.query_by;
      params.preset = (_params$preset = params.preset) !== null && _params$preset !== void 0 ? _params$preset : params.preset;
      params.sort_by = (_params$sortBy = params.sortBy) !== null && _params$sortBy !== void 0 ? _params$sortBy : params.sort_by;
      params.highlight_full_fields = (_ref5 = (_ref6 = (_params$highlightFull = params.highlightFullFields) !== null && _params$highlightFull !== void 0 ? _params$highlightFull : params.highlight_full_fields) !== null && _ref6 !== void 0 ? _ref6 : _this.additionalSearchParameters.highlight_full_fields) !== null && _ref5 !== void 0 ? _ref5 : params.query_by; // Remove undefined values

      Object.keys(params).forEach(function (key) {
        return params[key] === undefined ? delete params[key] : {};
      });
    });
  }

  (0, _createClass2["default"])(Configuration, [{
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
  return Configuration;
}();

exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map