"use strict";

/**
 * Connector for natural language search synchronization
 * Handles the logic of detecting and applying natural language UI state
 */
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectNaturalLanguageSync = connectNaturalLanguageSync;
exports["default"] = void 0;
exports.naturalLanguageSync = naturalLanguageSync;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function connectNaturalLanguageSync(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  return function naturalLanguageSync() {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var connectorState = {
      lastAppliedStateKey: null,
      applicationCount: 0,
      settingState: false
    };
    return {
      $$type: "typesense.naturalLanguageSync",
      $$widgetType: "typesense.naturalLanguageSync",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var results = renderOptions.results,
          instantSearchInstance = renderOptions.instantSearchInstance;
        var hasNaturalLanguageData = this._hasNaturalLanguageData(results);
        if (hasNaturalLanguageData && results && !connectorState.settingState) {
          this._applyNaturalLanguageState(results, instantSearchInstance);
        }
        return {
          appliedState: this._getLastAppliedState(),
          isActive: hasNaturalLanguageData,
          debug: widgetParams.debug ? {
            lastParsedQuery: results === null || results === void 0 ? void 0 : results.parsed_nl_query,
            lastAppliedState: this._getLastAppliedState(),
            applicationCount: connectorState.applicationCount
          } : undefined,
          widgetParams: widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          naturalLanguageSync: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetUiState: function getWidgetUiState(uiState) {
        return uiState;
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters) {
        return searchParameters;
      },
      _hasNaturalLanguageData: function _hasNaturalLanguageData(results) {
        var _results$parsed_nl_qu;
        return !!(results !== null && results !== void 0 && results._naturalLanguageUiState || results !== null && results !== void 0 && (_results$parsed_nl_qu = results.parsed_nl_query) !== null && _results$parsed_nl_qu !== void 0 && _results$parsed_nl_qu.generated_params);
      },
      _getLastAppliedState: function _getLastAppliedState() {
        return null;
      },
      _applyNaturalLanguageState: function _applyNaturalLanguageState(results, instantSearchInstance) {
        var _results$parsed_nl_qu2;
        var uiStateToApply = null;
        if (results._naturalLanguageUiState) {
          uiStateToApply = results._naturalLanguageUiState;
        } else if ((_results$parsed_nl_qu2 = results.parsed_nl_query) !== null && _results$parsed_nl_qu2 !== void 0 && _results$parsed_nl_qu2.generated_params) {
          uiStateToApply = this._parseGeneratedParamsToUiState(results.parsed_nl_query.generated_params);
        }
        if (!uiStateToApply) {
          return;
        }

        // Check if we've already applied this exact state to prevent infinite loops
        var stateKey = this._createStateKey(uiStateToApply);
        if (connectorState.lastAppliedStateKey === stateKey) {
          return;
        }
        if (widgetParams.onStateChange) {
          widgetParams.onStateChange(uiStateToApply);
        }
        this._setInstantSearchUiState(uiStateToApply, instantSearchInstance);
        connectorState.lastAppliedStateKey = stateKey;
        connectorState.applicationCount++;
      },
      _parseGeneratedParamsToUiState: function _parseGeneratedParamsToUiState(generatedParams) {
        var uiState = {};
        if (generatedParams.filter_by) {
          var _this$_parseTypesense = this._parseTypesenseFiltersToUiState(generatedParams.filter_by),
            refinementList = _this$_parseTypesense.refinementList,
            numericMenu = _this$_parseTypesense.numericMenu;
          if (Object.keys(refinementList).length > 0) {
            uiState.refinementList = refinementList;
          }
          if (Object.keys(numericMenu).length > 0) {
            uiState.numericMenu = numericMenu;
          }
        }
        if (generatedParams.sort_by) {
          uiState.sortBy = generatedParams.sort_by;
        }
        return uiState;
      },
      _parseTypesenseFiltersToUiState: function _parseTypesenseFiltersToUiState(filterBy) {
        var refinementList = {};
        var numericMenu = {};
        if (!filterBy) {
          return {
            refinementList: refinementList,
            numericMenu: numericMenu
          };
        }
        try {
          var ast = this._parseFilterExpression(filterBy);
          this._processFilterAST(ast, refinementList, numericMenu);
        } catch (error) {
          return {
            refinementList: {},
            numericMenu: {}
          };
        }
        return {
          refinementList: refinementList,
          numericMenu: numericMenu
        };
      },
      _tokenizeFilter: function _tokenizeFilter(filterBy) {
        var tokens = [];
        var current = "";
        var inQuotes = false;
        var quoteChar = "";
        var i = 0;
        while (i < filterBy.length) {
          var _char = filterBy[i];
          if ((_char === '"' || _char === "'" || _char === "`") && !inQuotes) {
            inQuotes = true;
            quoteChar = _char;
            current += _char;
          } else if (_char === quoteChar && inQuotes) {
            inQuotes = false;
            current += _char;
            quoteChar = "";
          } else if (inQuotes) {
            current += _char;
          } else {
            var operatorMap = [{
              operator: ":<=",
              type: "OPERATOR",
              length: 3
            }, {
              operator: ":>=",
              type: "OPERATOR",
              length: 3
            }, {
              operator: "&&",
              type: "AND",
              length: 2
            }, {
              operator: "||",
              type: "OR",
              length: 2
            }, {
              operator: ":=",
              type: "OPERATOR",
              length: 2
            }, {
              operator: ":<",
              type: "OPERATOR",
              length: 2
            }, {
              operator: ":>",
              type: "OPERATOR",
              length: 2
            }, {
              operator: ":",
              type: "OPERATOR",
              length: 1
            }];
            var operatorFound = false;
            for (var _i = 0, _operatorMap = operatorMap; _i < _operatorMap.length; _i++) {
              var _operatorMap$_i = _operatorMap[_i],
                operator = _operatorMap$_i.operator,
                type = _operatorMap$_i.type,
                length = _operatorMap$_i.length;
              if (filterBy.substring(i, i + length) === operator) {
                if (current.trim()) {
                  if (type === "AND" || type === "OR") {
                    tokens.push({
                      type: "VALUE",
                      value: current.trim()
                    });
                  } else {
                    tokens.push({
                      type: "FIELD",
                      value: current.trim()
                    });
                  }
                }
                tokens.push({
                  type: type,
                  value: operator
                });
                current = "";
                i += length - 1;
                operatorFound = true;
                break;
              }
            }
            if (!operatorFound) {
              if (_char === "(" || _char === ")" || _char === "[" || _char === "]" || _char === ",") {
                this._handleSpecialChar(_char, current, tokens);
                current = "";
              } else if (_char === " ") {
                var shouldContinue = this._handleSpace(current, tokens, filterBy, i);
                if (shouldContinue) {
                  current += _char;
                } else {
                  current = "";
                }
              } else {
                current += _char;
              }
            }
          }
          i++;
        }
        if (current.trim()) {
          var lastToken = tokens[tokens.length - 1];
          if (!lastToken || lastToken.type === "AND" || lastToken.type === "OR" || lastToken.type === "LPAREN") {
            tokens.push({
              type: "FIELD",
              value: current.trim()
            });
          } else {
            tokens.push({
              type: "VALUE",
              value: current.trim()
            });
          }
        }
        return tokens;
      },
      _handleSpecialChar: function _handleSpecialChar(_char2, current, tokens) {
        if (current.trim()) {
          tokens.push({
            type: "VALUE",
            value: current.trim()
          });
        }
        var charMap = {
          "(": {
            type: "LPAREN",
            value: "("
          },
          ")": {
            type: "RPAREN",
            value: ")"
          },
          "[": {
            type: "LBRACKET",
            value: "["
          },
          "]": {
            type: "RBRACKET",
            value: "]"
          },
          ",": {
            type: "COMMA",
            value: ","
          }
        };

        // For '[', the current should be treated as a FIELD, not VALUE
        if (_char2 === "[" && current.trim()) {
          tokens[tokens.length - 1].type = "FIELD";
        }
        tokens.push(charMap[_char2]);
      },
      _handleSpace: function _handleSpace(current, tokens, filterBy, position) {
        if (!current.trim()) return false;
        var nextNonSpacePos = this._findNextNonSpace(filterBy, position + 1);
        if (nextNonSpacePos !== -1) {
          var lookAhead = this._checkForOperatorAhead(filterBy, nextNonSpacePos);
          if (lookAhead.isOperatorOrSpecial) {
            var lastToken = tokens[tokens.length - 1];
            if (!lastToken || lastToken.type === "AND" || lastToken.type === "OR" || lastToken.type === "LPAREN") {
              tokens.push({
                type: "FIELD",
                value: current.trim()
              });
            } else {
              tokens.push({
                type: "VALUE",
                value: current.trim()
              });
            }
            return false;
          }
        }
        return true;
      },
      _findNextNonSpace: function _findNextNonSpace(str, startPos) {
        for (var i = startPos; i < str.length; i++) {
          if (str[i] !== " ") {
            return i;
          }
        }
        return -1;
      },
      _checkForOperatorAhead: function _checkForOperatorAhead(filterBy, position) {
        var operatorMap = [{
          operator: ":<=",
          length: 3
        }, {
          operator: ":>=",
          length: 3
        }, {
          operator: "&&",
          length: 2
        }, {
          operator: "||",
          length: 2
        }, {
          operator: ":=",
          length: 2
        }, {
          operator: ":<",
          length: 2
        }, {
          operator: ":>",
          length: 2
        }, {
          operator: ":",
          length: 1
        }];
        for (var _i2 = 0, _operatorMap2 = operatorMap; _i2 < _operatorMap2.length; _i2++) {
          var _operatorMap2$_i = _operatorMap2[_i2],
            operator = _operatorMap2$_i.operator,
            length = _operatorMap2$_i.length;
          if (filterBy.substring(position, position + length) === operator) {
            return {
              isOperatorOrSpecial: true,
              operator: operator,
              length: length
            };
          }
        }
        var _char3 = filterBy[position];
        if (["(", ")", "[", "]", ","].includes(_char3)) {
          return {
            isOperatorOrSpecial: true,
            operator: _char3,
            length: 1
          };
        }
        return {
          isOperatorOrSpecial: false
        };
      },
      _parseFilterExpression: function _parseFilterExpression(filterBy) {
        var tokens = this._tokenizeFilter(filterBy);
        return this._parseAndExpression(tokens, 0).node;
      },
      _parseAndExpression: function _parseAndExpression(tokens, start) {
        var _this$_parseOrExpress = this._parseOrExpression(tokens, start),
          left = _this$_parseOrExpress.node,
          position = _this$_parseOrExpress.position;
        while (position < tokens.length && ((_tokens$position = tokens[position]) === null || _tokens$position === void 0 ? void 0 : _tokens$position.type) === "AND") {
          var _tokens$position;
          position++; // skip AND
          var _this$_parseOrExpress2 = this._parseOrExpression(tokens, position),
            right = _this$_parseOrExpress2.node,
            newPos = _this$_parseOrExpress2.position;
          left = {
            type: "AND",
            left: left,
            right: right
          };
          position = newPos;
        }
        return {
          node: left,
          position: position
        };
      },
      _parseOrExpression: function _parseOrExpression(tokens, start) {
        var _this$_parseFilterCon = this._parseFilterCondition(tokens, start),
          left = _this$_parseFilterCon.node,
          position = _this$_parseFilterCon.position;
        while (position < tokens.length && ((_tokens$position2 = tokens[position]) === null || _tokens$position2 === void 0 ? void 0 : _tokens$position2.type) === "OR") {
          var _tokens$position2;
          position++; // skip OR
          var _this$_parseFilterCon2 = this._parseFilterCondition(tokens, position),
            right = _this$_parseFilterCon2.node,
            newPos = _this$_parseFilterCon2.position;
          left = {
            type: "OR",
            left: left,
            right: right
          };
          position = newPos;
        }
        return {
          node: left,
          position: position
        };
      },
      _parseFilterCondition: function _parseFilterCondition(tokens, start) {
        var _tokens$start, _tokens$position3, _tokens$position8;
        if (((_tokens$start = tokens[start]) === null || _tokens$start === void 0 ? void 0 : _tokens$start.type) === "LPAREN") {
          var _tokens$_position;
          var _this$_parseAndExpres = this._parseAndExpression(tokens, start + 1),
            node = _this$_parseAndExpres.node,
            _position = _this$_parseAndExpres.position;
          if (((_tokens$_position = tokens[_position]) === null || _tokens$_position === void 0 ? void 0 : _tokens$_position.type) !== "RPAREN") {
            throw new Error("Missing closing parenthesis");
          }
          return {
            node: node,
            position: _position + 1
          };
        }

        // parse field:operator:value
        var field = tokens[start];
        var operator = tokens[start + 1];
        var position = start + 2;
        if (!field || !operator || field.type !== "FIELD" || operator.type !== "OPERATOR") {
          throw new Error("Invalid filter condition at position ".concat(start));
        }
        var value;

        // handle array values [val1,val2,...]
        if (((_tokens$position3 = tokens[position]) === null || _tokens$position3 === void 0 ? void 0 : _tokens$position3.type) === "LBRACKET") {
          var _tokens$position7;
          var values = [];
          position++; // skip [

          while (position < tokens.length && ((_tokens$position4 = tokens[position]) === null || _tokens$position4 === void 0 ? void 0 : _tokens$position4.type) !== "RBRACKET") {
            var _tokens$position4, _tokens$position5, _tokens$position6;
            if (((_tokens$position5 = tokens[position]) === null || _tokens$position5 === void 0 ? void 0 : _tokens$position5.type) === "VALUE") {
              values.push(tokens[position].value);
            }
            position++;
            if (((_tokens$position6 = tokens[position]) === null || _tokens$position6 === void 0 ? void 0 : _tokens$position6.type) === "COMMA") {
              position++; // skip comma
            }
          }
          if (((_tokens$position7 = tokens[position]) === null || _tokens$position7 === void 0 ? void 0 : _tokens$position7.type) === "RBRACKET") {
            position++; // skip ]
          }
          value = values;
        } else if (((_tokens$position8 = tokens[position]) === null || _tokens$position8 === void 0 ? void 0 : _tokens$position8.type) === "VALUE") {
          value = tokens[position].value;
          position++;
        } else {
          throw new Error("Expected value at position ".concat(position));
        }
        return {
          node: {
            type: "CONDITION",
            field: field.value,
            operator: operator.value,
            value: value
          },
          position: position
        };
      },
      _processFilterAST: function _processFilterAST(node, refinementList, numericMenu) {
        if (!node) return;
        if (node.type === "AND") {
          this._processFilterAST(node.left, refinementList, numericMenu);
          this._processFilterAST(node.right, refinementList, numericMenu);
        } else if (node.type === "OR") {
          this._processOrCondition(node, refinementList, numericMenu);
        } else if (node.type === "CONDITION") {
          this._processCondition(node, refinementList, numericMenu);
        }
      },
      _processOrCondition: function _processOrCondition(node, refinementList, numericMenu) {
        var _this = this;
        var conditions = this._collectOrConditions(node);
        var fieldGroups = {};
        conditions.forEach(function (condition) {
          if (!fieldGroups[condition.field]) {
            fieldGroups[condition.field] = [];
          }
          fieldGroups[condition.field].push(condition);
        });
        Object.keys(fieldGroups).forEach(function (field) {
          var fieldConditions = fieldGroups[field];
          fieldConditions.forEach(function (condition) {
            _this._processCondition(condition, refinementList, numericMenu);
          });
        });
      },
      _collectOrConditions: function _collectOrConditions(node) {
        if (node.type === "CONDITION") {
          return [node];
        } else if (node.type === "OR") {
          return [].concat((0, _toConsumableArray2["default"])(this._collectOrConditions(node.left)), (0, _toConsumableArray2["default"])(this._collectOrConditions(node.right)));
        }
        return [];
      },
      _processCondition: function _processCondition(condition, refinementList, numericMenu) {
        var field = condition.field,
          operator = condition.operator,
          value = condition.value;
        if (this._isNumericCondition(operator, value)) {
          this._processNumericCondition(field, operator, value, numericMenu);
        } else {
          this._processFacetCondition(field, value, refinementList);
        }
      },
      _isNumericCondition: function _isNumericCondition(operator, value) {
        return [":<=", ":>=", ":<", ":>", "<=", ">=", "<", ">"].includes(operator) || Array.isArray(value) && value.length === 1 && this._isRangePattern(value[0]);
      },
      _isRangePattern: function _isRangePattern(str) {
        if (typeof str !== "string") return false;
        var dotDotIndex = str.indexOf("..");
        if (dotDotIndex === -1) return false;
        var start = str.substring(0, dotDotIndex);
        var end = str.substring(dotDotIndex + 2);
        return this._isNumericValue(start) && this._isNumericValue(end);
      },
      _isNumericValue: function _isNumericValue(str) {
        if (!str || str.trim() === "") return false;
        var trimmed = str.trim();
        var num = parseFloat(trimmed);
        return !isNaN(num) && isFinite(num) && trimmed === num.toString();
      },
      _parseRangePattern: function _parseRangePattern(str) {
        var dotDotIndex = str.indexOf("..");
        if (dotDotIndex === -1) return null;
        var start = str.substring(0, dotDotIndex).trim();
        var end = str.substring(dotDotIndex + 2).trim();
        if (this._isNumericValue(start) && this._isNumericValue(end)) {
          return {
            start: start,
            end: end
          };
        }
        return null;
      },
      _removeQuotes: function _removeQuotes(str) {
        if (typeof str !== "string" || str.length < 2) {
          return str;
        }
        var quoteChars = ['"', "'", "`"];
        var first = str[0];
        var last = str[str.length - 1];
        if (quoteChars.includes(first) && first === last) {
          return str.substring(1, str.length - 1);
        }
        var start = 0;
        while (start < str.length && quoteChars.includes(str[start])) {
          start++;
        }
        var end = str.length - 1;
        while (end >= start && quoteChars.includes(str[end])) {
          end--;
        }
        return str.substring(start, end + 1);
      },
      _createStateKey: function _createStateKey(uiState) {
        var key = "";
        if (uiState.refinementList) {
          key += "r:" + Object.keys(uiState.refinementList).sort().join(",");
        }
        if (uiState.numericMenu) {
          key += "n:" + Object.keys(uiState.numericMenu).sort().join(",");
        }
        if (uiState.sortBy) {
          key += "s:" + uiState.sortBy;
        }
        return key;
      },
      _processNumericCondition: function _processNumericCondition(field, operator, value, numericMenu) {
        if (operator === ":<=" || operator === "<=" || operator === ":<" || operator === "<") {
          numericMenu[field] = ":".concat(value);
        } else if (operator === ":>=" || operator === ">=" || operator === ":>" || operator === ">") {
          numericMenu[field] = "".concat(value, ":");
        } else if (Array.isArray(value) && value.length === 1) {
          var rangeData = this._parseRangePattern(value[0]);
          if (rangeData) {
            numericMenu[field] = "".concat(rangeData.start, ":").concat(rangeData.end);
          }
        }
      },
      _processFacetCondition: function _processFacetCondition(field, value, refinementList) {
        var _this2 = this;
        var values = Array.isArray(value) ? value : [value];
        values.forEach(function (val) {
          var cleanValue = typeof val === "string" ? _this2._removeQuotes(val) : val;
          _this2._addToRefinementList(refinementList, field, cleanValue);
        });
      },
      _addToRefinementList: function _addToRefinementList(refinementList, fieldName, value) {
        if (!refinementList[fieldName]) {
          refinementList[fieldName] = [];
        }
        if (!refinementList[fieldName].includes(value)) {
          refinementList[fieldName].push(value);
        }
      },
      _setInstantSearchUiState: function _setInstantSearchUiState(uiStateToApply, instantSearchInstance) {
        var currentUiState = instantSearchInstance.getUiState();
        var indexName = instantSearchInstance.mainIndex.getIndexName();
        var newIndexState = _objectSpread({}, currentUiState[indexName]);
        if (uiStateToApply.refinementList) {
          newIndexState.refinementList = _objectSpread(_objectSpread({}, newIndexState.refinementList), uiStateToApply.refinementList);
        }
        if (uiStateToApply.numericMenu) {
          newIndexState.numericMenu = _objectSpread(_objectSpread({}, newIndexState.numericMenu), uiStateToApply.numericMenu);
        }
        if (uiStateToApply.sortBy) {
          newIndexState.sortBy = "".concat(indexName, "/sort/").concat(uiStateToApply.sortBy);
        }
        var newUiState = _objectSpread(_objectSpread({}, currentUiState), {}, (0, _defineProperty2["default"])({}, indexName, newIndexState));
        try {
          connectorState.settingState = true;
          instantSearchInstance.setUiState(newUiState);
          setTimeout(function () {
            connectorState.settingState = false;
          }, 50);
        } catch (error) {
          console.error("[NaturalLanguageSync] Error setting UI state:", error);
          connectorState.settingState = false;
        }
      }
    };
  };
}

/**
 * Natural Language Sync Widget
 * A headless widget that automatically synchronizes natural language search results
 * with InstantSearch UI state
 */
function naturalLanguageSync() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _params$debug = params.debug,
    debug = _params$debug === void 0 ? false : _params$debug,
    onStateChange = params.onStateChange;
  var render = function render() {};
  var dispose = function dispose() {};
  var createWidget = connectNaturalLanguageSync(render, dispose);
  return _objectSpread(_objectSpread({}, createWidget({
    debug: debug,
    onStateChange: onStateChange
  })), {}, {
    $$widgetType: "typesense.naturalLanguageSync"
  });
}
var _default = exports["default"] = naturalLanguageSync;
//# sourceMappingURL=naturalLanguageSync.js.map