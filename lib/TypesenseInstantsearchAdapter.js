"use strict";

import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { Configuration } from "./Configuration";
import { SearchClient as TypesenseSearchClient } from "typesense";
import { SearchRequestAdapter } from "./SearchRequestAdapter";
import { SearchResponseAdapter } from "./SearchResponseAdapter";
import { FacetSearchResponseAdapter } from "./FacetSearchResponseAdapter";
var TypesenseInstantsearchAdapter = /*#__PURE__*/function () {
  function TypesenseInstantsearchAdapter(options) {
    var _this = this;
    _classCallCheck(this, TypesenseInstantsearchAdapter);
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
  return _createClass(TypesenseInstantsearchAdapter, [{
    key: "searchTypesenseAndAdapt",
    value: function () {
      var _searchTypesenseAndAdapt = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(instantsearchRequests) {
        var _this2 = this;
        var typesenseResponse, responseAdapter, adaptedResponse, adaptedResponses, _adaptedResponses;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return this._adaptAndPerformTypesenseRequest(instantsearchRequests);
            case 3:
              typesenseResponse = _context.sent;
              if (!typesenseResponse.union_request_params) {
                _context.next = 12;
                break;
              }
              // Handle union search response - single unified response
              this._validateTypesenseResult(typesenseResponse);
              responseAdapter = new SearchResponseAdapter(typesenseResponse, instantsearchRequests[0],
              // Use first request as base
              this.configuration, [typesenseResponse],
              // Pass single response as allTypesenseResults
              typesenseResponse);
              adaptedResponse = responseAdapter.adapt(); // InstantSearch expects one result per request, so return the same adapted response for each request
              adaptedResponses = instantsearchRequests.map(function () {
                return adaptedResponse;
              });
              return _context.abrupt("return", {
                results: adaptedResponses
              });
            case 12:
              // Handle regular multi-search response - multiple separate responses
              _adaptedResponses = typesenseResponse.results.map(function (typesenseResult, index) {
                _this2._validateTypesenseResult(typesenseResult);
                var responseAdapter = new SearchResponseAdapter(typesenseResult, instantsearchRequests[index], _this2.configuration, typesenseResponse.results, typesenseResponse);
                var adaptedResponse = responseAdapter.adapt();
                return adaptedResponse;
              });
              return _context.abrupt("return", {
                results: _adaptedResponses
              });
            case 14:
              _context.next = 20;
              break;
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);
              throw _context.t0;
            case 20:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 16]]);
      }));
      function searchTypesenseAndAdapt(_x) {
        return _searchTypesenseAndAdapt.apply(this, arguments);
      }
      return searchTypesenseAndAdapt;
    }()
  }, {
    key: "searchTypesenseForFacetValuesAndAdapt",
    value: function () {
      var _searchTypesenseForFacetValuesAndAdapt = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(instantsearchRequests) {
        var _this3 = this;
        var typesenseResponse, adaptedResponses;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return this._adaptAndPerformTypesenseRequest(instantsearchRequests);
            case 3:
              typesenseResponse = _context2.sent;
              adaptedResponses = typesenseResponse.results.map(function (typesenseResult, index) {
                _this3._validateTypesenseResult(typesenseResult);
                var responseAdapter = new FacetSearchResponseAdapter(typesenseResult, instantsearchRequests[index], _this3.configuration);
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
      var _adaptAndPerformTypesenseRequest2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(instantsearchRequests) {
        var requestAdapter, typesenseResponse;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              requestAdapter = new SearchRequestAdapter(instantsearchRequests, this.typesenseClient, this.configuration);
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
      this.typesenseClient = new TypesenseSearchClient(this.configuration.server);
      return this.searchClient;
    }
  }, {
    key: "updateConfiguration",
    value: function updateConfiguration(options) {
      this.configuration = new Configuration(options);
      this.configuration.validate();
      this.typesenseClient = new TypesenseSearchClient(this.configuration.server);
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
export { TypesenseInstantsearchAdapter as default };
//# sourceMappingURL=TypesenseInstantsearchAdapter.js.map