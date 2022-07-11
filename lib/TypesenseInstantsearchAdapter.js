"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Configuration = require("./Configuration");

var _typesense = require("typesense");

var _SearchRequestAdapter = require("./SearchRequestAdapter");

var _SearchResponseAdapter = require("./SearchResponseAdapter");

var _FacetSearchResponseAdapter = require("./FacetSearchResponseAdapter");

var TypesenseInstantsearchAdapter = /*#__PURE__*/function () {
  function TypesenseInstantsearchAdapter(options) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, TypesenseInstantsearchAdapter);
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

  (0, _createClass2["default"])(TypesenseInstantsearchAdapter, [{
    key: "searchTypesenseAndAdapt",
    value: function () {
      var _searchTypesenseAndAdapt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(instantsearchRequests) {
        var _this2 = this;

        var typesenseResponse, adaptedResponses;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this._adaptAndPerformTypesenseRequest(instantsearchRequests);

              case 3:
                typesenseResponse = _context.sent;
                adaptedResponses = typesenseResponse.results.map(function (typesenseResult, index) {
                  _this2._validateTypesenseResult(typesenseResult);

                  var responseAdapter = new _SearchResponseAdapter.SearchResponseAdapter(typesenseResult, instantsearchRequests[index], _this2.configuration);
                  return responseAdapter.adapt();
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
      var _searchTypesenseForFacetValuesAndAdapt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(instantsearchRequests) {
        var _this3 = this;

        var typesenseResponse, adaptedResponses;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this._adaptAndPerformTypesenseRequest(instantsearchRequests);

              case 3:
                typesenseResponse = _context2.sent;
                adaptedResponses = typesenseResponse.results.map(function (typesenseResult, index) {
                  _this3._validateTypesenseResult(typesenseResult);

                  var responseAdapter = new _FacetSearchResponseAdapter.FacetSearchResponseAdapter(typesenseResult, instantsearchRequests[index], _this3.configuration);
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
      var _adaptAndPerformTypesenseRequest2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(instantsearchRequests) {
        var requestAdapter, typesenseResponse;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                requestAdapter = new _SearchRequestAdapter.SearchRequestAdapter(instantsearchRequests, this.typesenseClient, this.configuration);
                _context3.next = 3;
                return requestAdapter.request();

              case 3:
                typesenseResponse = _context3.sent;
                return _context3.abrupt("return", typesenseResponse);

              case 5:
              case "end":
                return _context3.stop();
            }
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
      this.typesenseClient = new _typesense.SearchClient(this.configuration.server);
      return this.searchClient;
    }
  }, {
    key: "updateConfiguration",
    value: function updateConfiguration(options) {
      this.configuration = new _Configuration.Configuration(options);
      this.configuration.validate();
      this.typesenseClient = new _typesense.SearchClient(this.configuration.server);
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
  return TypesenseInstantsearchAdapter;
}();

exports["default"] = TypesenseInstantsearchAdapter;
//# sourceMappingURL=TypesenseInstantsearchAdapter.js.map