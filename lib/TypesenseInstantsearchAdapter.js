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

var _typesense = _interopRequireDefault(require("typesense"));

var _SearchRequestAdapter = require("./SearchRequestAdapter");

var _SearchResponseAdapter = require("./SearchResponseAdapter");

var _FacetSearchRequestAdapter = require("./FacetSearchRequestAdapter");

var _FacetSearchResponseAdapter = require("./FacetSearchResponseAdapter");

var TypesenseInstantsearchAdapter =
/*#__PURE__*/
function () {
  function TypesenseInstantsearchAdapter(options) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, TypesenseInstantsearchAdapter);
    this.configuration = new _Configuration.Configuration(options);
    this.configuration.validate();
    this.typesenseClient = new _typesense["default"].Client(this.configuration.server);
    this.searchClient = {
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
      var _searchTypesenseAndAdapt = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(instantsearchRequests) {
        var _this2 = this;

        var adaptedResponses, results;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return instantsearchRequests.map(
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee(instantsearchRequest) {
                    var requestAdapter, typesenseResponse, responseAdapter;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            requestAdapter = new _SearchRequestAdapter.SearchRequestAdapter(instantsearchRequest, _this2.typesenseClient, _this2.configuration.searchByFields);
                            _context.next = 3;
                            return requestAdapter.request();

                          case 3:
                            typesenseResponse = _context.sent;
                            responseAdapter = new _SearchResponseAdapter.SearchResponseAdapter(typesenseResponse, instantsearchRequest);
                            return _context.abrupt("return", responseAdapter.adapt());

                          case 6:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 2:
                adaptedResponses = _context2.sent;
                _context2.next = 5;
                return Promise.all(adaptedResponses);

              case 5:
                results = _context2.sent;
                return _context2.abrupt("return", {
                  results: results
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function searchTypesenseAndAdapt(_x) {
        return _searchTypesenseAndAdapt.apply(this, arguments);
      }

      return searchTypesenseAndAdapt;
    }()
  }, {
    key: "searchTypesenseForFacetValuesAndAdapt",
    value: function () {
      var _searchTypesenseForFacetValuesAndAdapt = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(instantsearchRequests) {
        var _this3 = this;

        var adaptedResponses, results;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return instantsearchRequests.map(
                /*#__PURE__*/
                function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee3(instantsearchRequest) {
                    var requestAdapter, typesenseResponse, responseAdapter;
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            requestAdapter = new _FacetSearchRequestAdapter.FacetSearchRequestAdapter(instantsearchRequest, _this3.typesenseClient, _this3.configuration.searchByFields);
                            _context3.next = 3;
                            return requestAdapter.request();

                          case 3:
                            typesenseResponse = _context3.sent;
                            responseAdapter = new _FacetSearchResponseAdapter.FacetSearchResponseAdapter(typesenseResponse, instantsearchRequest);
                            return _context3.abrupt("return", responseAdapter.adapt());

                          case 6:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x4) {
                    return _ref2.apply(this, arguments);
                  };
                }());

              case 2:
                adaptedResponses = _context4.sent;
                _context4.next = 5;
                return Promise.all(adaptedResponses);

              case 5:
                results = _context4.sent;
                return _context4.abrupt("return", results);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function searchTypesenseForFacetValuesAndAdapt(_x3) {
        return _searchTypesenseForFacetValuesAndAdapt.apply(this, arguments);
      }

      return searchTypesenseForFacetValuesAndAdapt;
    }()
  }]);
  return TypesenseInstantsearchAdapter;
}();

exports["default"] = TypesenseInstantsearchAdapter;
//# sourceMappingURL=TypesenseInstantsearchAdapter.js.map