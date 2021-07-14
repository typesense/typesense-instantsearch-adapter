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
    var _this = this;

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
    this.server.cacheSearchResultsForSeconds = this.server.cacheSearchResultsForSeconds == null ? 2 * 60 : this.server.cacheSearchResultsForSeconds;
    this.additionalSearchParameters = options.additionalSearchParameters || {};
    this.additionalSearchParameters.queryBy = this.additionalSearchParameters.queryBy || "";
    this.additionalSearchParameters.sortBy = this.additionalSearchParameters.sortBy || "";
    this.additionalSearchParameters.highlightFullFields = this.additionalSearchParameters.highlightFullFields || this.additionalSearchParameters.queryBy;
    this.geoLocationField = options.geoLocationField || "_geoloc";
    this.collectionSpecificSearchParameters = options.collectionSpecificSearchParameters || {};
    Object.keys(this.collectionSpecificSearchParameters).forEach(function (collection) {
      var overrideHighlightFullFields = _this.collectionSpecificSearchParameters[collection].highlightFullFields || _this.collectionSpecificSearchParameters[collection].queryBy;

      if (overrideHighlightFullFields) {
        _this.collectionSpecificSearchParameters[collection].highlightFullFields = overrideHighlightFullFields;
      }
    });
  }
  /*
   * Either additionalSearchParameters.queryBy needs to be set, or
   *   All collectionSpecificSearchParameters need to have queryBy
   *
   * */


  (0, _createClass2["default"])(Configuration, [{
    key: "validate",
    value: function validate() {
      if (this.additionalSearchParameters.queryBy.length === 0 && Object.values(this.collectionSpecificSearchParameters).some(function (c) {
        return (c.queryBy || "").length === 0;
      })) {
        throw new Error("Missing parameter: Either additionalSearchParameters.queryBy needs to be set, or all collectionSpecificSearchParameters need to have .queryBy set");
      }
    }
  }]);
  return Configuration;
}();

exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map