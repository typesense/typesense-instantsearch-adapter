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
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Configuration);
    this.server = options.server || {
      masterNode: {
        host: "localhost",
        port: "8108",
        path: "",
        protocol: "http"
      }
    };
    this.additionalSearchParameters = options.additionalSearchParameters || {};
    this.additionalSearchParameters.queryBy = this.additionalSearchParameters.queryBy || "";
    this.additionalSearchParameters.sortBy = this.additionalSearchParameters.sortBy || "";
    this.additionalSearchParameters.highlightFullFields = this.additionalSearchParameters.highlightFullFields || this.additionalSearchParameters.queryBy;
  }

  (0, _createClass2["default"])(Configuration, [{
    key: "validate",
    value: function validate() {
      if (this.additionalSearchParameters.queryBy.length === 0) {
        throw new Error("Missing required parameter: additionalSearchParameters.queryBy");
      }
    }
  }]);
  return Configuration;
}();

exports.Configuration = Configuration;