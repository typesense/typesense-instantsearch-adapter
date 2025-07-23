"use strict";

/**
 * Connector for natural language search synchronization
 * Handles the logic of detecting and applying natural language UI state
 */
export function connectNaturalLanguageSync(renderFn, unmountFn = () => {}) {
  return function naturalLanguageSync(widgetParams = {}) {
    const connectorState = {
      lastAppliedStateKey: null,
      applicationCount: 0,
      settingState: false,
    };

    return {
      $$type: "typesense.naturalLanguageSync",
      $$widgetType: "typesense.naturalLanguageSync",

      init(initOptions) {
        const { instantSearchInstance } = initOptions;

        renderFn(
          {
            ...this.getWidgetRenderState(initOptions),
            instantSearchInstance,
          },
          true,
        );
      },

      render(renderOptions) {
        const { instantSearchInstance } = renderOptions;

        renderFn(
          {
            ...this.getWidgetRenderState(renderOptions),
            instantSearchInstance,
          },
          false,
        );
      },

      dispose() {
        unmountFn();
      },

      getWidgetRenderState(renderOptions) {
        const { results, instantSearchInstance } = renderOptions;
        const hasNaturalLanguageData = this._hasNaturalLanguageData(results);

        if (hasNaturalLanguageData && results && !connectorState.settingState) {
          this._applyNaturalLanguageState(results, instantSearchInstance);
        }

        return {
          appliedState: this._getLastAppliedState(),
          isActive: hasNaturalLanguageData,
          debug: widgetParams.debug
            ? {
                lastParsedQuery: results?.parsed_nl_query,
                lastAppliedState: this._getLastAppliedState(),
                applicationCount: connectorState.applicationCount,
              }
            : undefined,
          widgetParams,
        };
      },

      getRenderState(renderState, renderOptions) {
        return {
          ...renderState,
          naturalLanguageSync: this.getWidgetRenderState(renderOptions),
        };
      },

      getWidgetUiState(uiState) {
        return uiState;
      },

      getWidgetSearchParameters(searchParameters) {
        return searchParameters;
      },

      _hasNaturalLanguageData(results) {
        return !!(results?._naturalLanguageUiState || results?.parsed_nl_query?.generated_params);
      },

      _getLastAppliedState() {
        return null;
      },

      _applyNaturalLanguageState(results, instantSearchInstance) {
        let uiStateToApply = null;

        if (results._naturalLanguageUiState) {
          uiStateToApply = results._naturalLanguageUiState;
        } else if (results.parsed_nl_query?.generated_params) {
          uiStateToApply = this._parseGeneratedParamsToUiState(results.parsed_nl_query.generated_params);
        }

        if (!uiStateToApply) {
          return;
        }

        // Check if we've already applied this exact state to prevent infinite loops
        const stateKey = this._createStateKey(uiStateToApply);
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

      _parseGeneratedParamsToUiState(generatedParams) {
        const uiState = {};

        if (generatedParams.filter_by) {
          const { refinementList, numericMenu } = this._parseTypesenseFiltersToUiState(generatedParams.filter_by);

          uiState.refinementList = refinementList;
          uiState.numericMenu = numericMenu;
        } else {
          uiState.refinementList = {};
          uiState.numericMenu = {};
        }

        if (generatedParams.sort_by) {
          uiState.sortBy = generatedParams.sort_by;
        }

        return uiState;
      },

      _parseTypesenseFiltersToUiState(filterBy) {
        const refinementList = {};
        const numericMenu = {};

        if (!filterBy) {
          return { refinementList, numericMenu };
        }

        try {
          const ast = this._parseFilterExpression(filterBy);
          this._processFilterAST(ast, refinementList, numericMenu);
        } catch (error) {
          if (widgetParams.debug) {
            console.warn("[NaturalLanguageSync] Filter parsing error:", error.message);
          }
          return { refinementList: {}, numericMenu: {} };
        }

        return { refinementList, numericMenu };
      },

      _tokenizeFilter(filterBy) {
        const tokens = [];
        let current = "";
        let inQuotes = false;
        let quoteChar = "";
        let i = 0;

        while (i < filterBy.length) {
          const char = filterBy[i];

          if ((char === '"' || char === "'" || char === "`") && !inQuotes) {
            inQuotes = true;
            quoteChar = char;
            current += char;
          } else if (char === quoteChar && inQuotes) {
            inQuotes = false;
            current += char;
            quoteChar = "";
          } else if (inQuotes) {
            current += char;
          } else {
            const operatorMap = [
              { operator: ":<=", type: "OPERATOR", value: "<=", length: 3 },
              { operator: ":>=", type: "OPERATOR", value: ">=", length: 3 },
              { operator: "&&", type: "AND", value: "&&", length: 2 },
              { operator: "||", type: "OR", value: "||", length: 2 },
              { operator: ":=", type: "OPERATOR", value: ":=", length: 2 },
              { operator: ":<", type: "OPERATOR", value: "<", length: 2 },
              { operator: ":>", type: "OPERATOR", value: ">", length: 2 },
              { operator: ":", type: "OPERATOR", value: ":", length: 1 },
            ];

            let operatorFound = false;

            for (const { operator, type, value, length } of operatorMap) {
              if (filterBy.substring(i, i + length) === operator) {
                if (current.trim()) {
                  if (type === "AND" || type === "OR") {
                    tokens.push({ type: "VALUE", value: current.trim() });
                  } else {
                    tokens.push({ type: "FIELD", value: current.trim() });
                  }
                }

                tokens.push({ type, value: value || operator });
                current = "";
                i += length - 1;
                operatorFound = true;
                break;
              }
            }

            if (!operatorFound) {
              if (char === "(" || char === ")" || char === "[" || char === "]" || char === ",") {
                this._handleSpecialChar(char, current, tokens);
                current = "";
              } else if (char === " ") {
                const shouldContinue = this._handleSpace(current, tokens, filterBy, i);
                if (shouldContinue) {
                  current += char;
                } else {
                  current = "";
                }
              } else {
                current += char;
              }
            }
          }

          i++;
        }

        if (current.trim()) {
          const lastToken = tokens[tokens.length - 1];
          if (!lastToken || lastToken.type === "AND" || lastToken.type === "OR" || lastToken.type === "LPAREN") {
            tokens.push({ type: "FIELD", value: current.trim() });
          } else {
            tokens.push({ type: "VALUE", value: current.trim() });
          }
        }

        return tokens;
      },

      _handleSpecialChar(char, current, tokens) {
        if (current.trim()) {
          tokens.push({ type: "VALUE", value: current.trim() });
        }

        const charMap = {
          "(": { type: "LPAREN", value: "(" },
          ")": { type: "RPAREN", value: ")" },
          "[": { type: "LBRACKET", value: "[" },
          "]": { type: "RBRACKET", value: "]" },
          ",": { type: "COMMA", value: "," },
        };

        // for lbracket, the current should be treated as a FIELD, not VALUE
        if (char === "[" && current.trim()) {
          tokens[tokens.length - 1].type = "FIELD";
        }

        tokens.push(charMap[char]);
      },

      _handleSpace(current, tokens, filterBy, position) {
        if (!current.trim()) return false;

        const nextNonSpacePos = this._findNextNonSpace(filterBy, position + 1);
        if (nextNonSpacePos !== -1) {
          const lookAhead = this._checkForOperatorAhead(filterBy, nextNonSpacePos);

          if (lookAhead.isOperatorOrSpecial) {
            const lastToken = tokens[tokens.length - 1];
            if (!lastToken || lastToken.type === "AND" || lastToken.type === "OR" || lastToken.type === "LPAREN") {
              tokens.push({ type: "FIELD", value: current.trim() });
            } else {
              tokens.push({ type: "VALUE", value: current.trim() });
            }
            return false;
          }
        }

        return true;
      },

      _findNextNonSpace(str, startPos) {
        for (let i = startPos; i < str.length; i++) {
          if (str[i] !== " ") {
            return i;
          }
        }
        return -1;
      },

      _checkForOperatorAhead(filterBy, position) {
        const operatorMap = [
          { operator: ":<=", length: 3 },
          { operator: ":>=", length: 3 },
          { operator: "&&", length: 2 },
          { operator: "||", length: 2 },
          { operator: ":=", length: 2 },
          { operator: ":<", length: 2 },
          { operator: ":>", length: 2 },
          { operator: ":", length: 1 },
        ];

        for (const { operator, length } of operatorMap) {
          if (filterBy.substring(position, position + length) === operator) {
            return { isOperatorOrSpecial: true, operator, length };
          }
        }

        const char = filterBy[position];
        if (["(", ")", "[", "]", ","].includes(char)) {
          return { isOperatorOrSpecial: true, operator: char, length: 1 };
        }

        return { isOperatorOrSpecial: false };
      },

      _parseFilterExpression(filterBy) {
        const tokens = this._tokenizeFilter(filterBy);

        return this._parseAndExpression(tokens, 0).node;
      },

      _parseAndExpression(tokens, start) {
        let { node: left, position } = this._parseOrExpression(tokens, start);

        while (position < tokens.length && tokens[position]?.type === "AND") {
          position++; // skip AND
          const { node: right, position: newPos } = this._parseOrExpression(tokens, position);
          left = { type: "AND", left, right };
          position = newPos;
        }

        return { node: left, position };
      },

      _parseOrExpression(tokens, start) {
        let { node: left, position } = this._parseFilterCondition(tokens, start);

        while (position < tokens.length && tokens[position]?.type === "OR") {
          position++; // skip OR
          const { node: right, position: newPos } = this._parseFilterCondition(tokens, position);
          left = { type: "OR", left, right };
          position = newPos;
        }

        return { node: left, position };
      },

      _parseFilterCondition(tokens, start) {
        if (tokens[start]?.type === "LPAREN") {
          const { node, position } = this._parseAndExpression(tokens, start + 1);
          if (tokens[position]?.type !== "RPAREN") {
            throw new Error("Missing closing parenthesis");
          }
          return { node, position: position + 1 };
        }

        // parse field:operator:value
        const field = tokens[start];
        const operator = tokens[start + 1];
        let position = start + 2;

        if (!field || !operator || field.type !== "FIELD" || operator.type !== "OPERATOR") {
          throw new Error(`Invalid filter condition at position ${start}`);
        }

        let value;

        // handle array values [val1,val2,...]
        if (tokens[position]?.type === "LBRACKET") {
          const values = [];
          position++; // skip [

          while (position < tokens.length && tokens[position]?.type !== "RBRACKET") {
            if (tokens[position]?.type === "VALUE") {
              values.push(tokens[position].value);
            }
            position++;
            if (tokens[position]?.type === "COMMA") {
              position++; // skip comma
            }
          }

          if (tokens[position]?.type !== "RBRACKET") {
            throw new Error("Missing closing bracket ']'");
          }
          position++; // skip ]

          value = values;
        } else if (tokens[position]?.type === "VALUE") {
          value = tokens[position].value;
          position++;
        } else {
          throw new Error(`Expected value at position ${position}`);
        }

        return {
          node: {
            type: "CONDITION",
            field: field.value,
            operator: operator.value,
            value: value,
          },
          position,
        };
      },

      _processFilterAST(node, refinementList, numericMenu) {
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

      _processOrCondition(node, refinementList, numericMenu) {
        const conditions = this._collectOrConditions(node);

        const fieldGroups = {};
        conditions.forEach((condition) => {
          if (!fieldGroups[condition.field]) {
            fieldGroups[condition.field] = [];
          }
          fieldGroups[condition.field].push(condition);
        });

        Object.keys(fieldGroups).forEach((field) => {
          const fieldConditions = fieldGroups[field];
          fieldConditions.forEach((condition) => {
            this._processCondition(condition, refinementList, numericMenu);
          });
        });
      },

      _collectOrConditions(node) {
        if (node.type === "CONDITION") {
          return [node];
        } else if (node.type === "OR") {
          return [...this._collectOrConditions(node.left), ...this._collectOrConditions(node.right)];
        }
        return [];
      },

      _processCondition(condition, refinementList, numericMenu) {
        const { field, operator, value } = condition;

        if (this._isNumericCondition(operator, value)) {
          this._processNumericCondition(field, operator, value, numericMenu);
        } else {
          this._processFacetCondition(field, value, refinementList);
        }
      },

      _isNumericCondition(operator, value) {
        return (
          [":<=", ":>=", ":<", ":>", "<=", ">=", "<", ">"].includes(operator) ||
          (Array.isArray(value) && value.length === 1 && this._isRangePattern(value[0]))
        );
      },

      _isRangePattern(str) {
        if (typeof str !== "string") return false;

        const dotDotIndex = str.indexOf("..");
        if (dotDotIndex === -1) return false;

        const start = str.substring(0, dotDotIndex);
        const end = str.substring(dotDotIndex + 2);

        return this._isNumericValue(start) && this._isNumericValue(end);
      },

      _isNumericValue(str) {
        if (!str || str.trim() === "") return false;
        const trimmed = str.trim();

        const num = parseFloat(trimmed);
        return !isNaN(num) && isFinite(num) && trimmed === num.toString();
      },

      _parseRangePattern(str) {
        const dotDotIndex = str.indexOf("..");
        if (dotDotIndex === -1) return null;

        const start = str.substring(0, dotDotIndex).trim();
        const end = str.substring(dotDotIndex + 2).trim();

        if (this._isNumericValue(start) && this._isNumericValue(end)) {
          return { start, end };
        }

        return null;
      },

      _removeQuotes(str) {
        if (typeof str !== "string" || str.length < 2) {
          return str;
        }

        const quoteChars = ['"', "'", "`"];
        const first = str[0];
        const last = str[str.length - 1];

        if (quoteChars.includes(first) && first === last) {
          return str.substring(1, str.length - 1);
        }

        let start = 0;
        while (start < str.length && quoteChars.includes(str[start])) {
          start++;
        }

        let end = str.length - 1;
        while (end >= start && quoteChars.includes(str[end])) {
          end--;
        }

        return str.substring(start, end + 1);
      },

      _createStateKey(uiState) {
        let key = "";

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

      _processNumericCondition(field, operator, value, numericMenu) {
        if (operator === ":<=" || operator === "<=" || operator === ":<" || operator === "<") {
          numericMenu[field] = `:${value}`;
        } else if (operator === ":>=" || operator === ">=" || operator === ":>" || operator === ">") {
          numericMenu[field] = `${value}:`;
        } else if (Array.isArray(value) && value.length === 1) {
          const rangeData = this._parseRangePattern(value[0]);
          if (rangeData) {
            numericMenu[field] = `${rangeData.start}:${rangeData.end}`;
          }
        }
      },

      _processFacetCondition(field, value, refinementList) {
        const values = Array.isArray(value) ? value : [value];

        values.forEach((val) => {
          const cleanValue = typeof val === "string" ? this._removeQuotes(val) : val;
          this._addToRefinementList(refinementList, field, cleanValue);
        });
      },

      _addToRefinementList(refinementList, fieldName, value) {
        if (!refinementList[fieldName]) {
          refinementList[fieldName] = [];
        }

        if (!refinementList[fieldName].includes(value)) {
          refinementList[fieldName].push(value);
        }
      },

      _setInstantSearchUiState(uiStateToApply, instantSearchInstance) {
        const currentUiState = instantSearchInstance.getUiState();
        const indexName = instantSearchInstance.mainIndex.getIndexName();

        const newIndexState = { ...currentUiState[indexName] };

        if (uiStateToApply.refinementList !== undefined) {
          if (Object.keys(uiStateToApply.refinementList).length > 0) {
            newIndexState.refinementList = uiStateToApply.refinementList;
          } else {
            delete newIndexState.refinementList;
          }
        }

        if (uiStateToApply.numericMenu !== undefined) {
          if (Object.keys(uiStateToApply.numericMenu).length > 0) {
            newIndexState.numericMenu = uiStateToApply.numericMenu;
          } else {
            delete newIndexState.numericMenu;
          }
        }

        if (uiStateToApply.sortBy) {
          newIndexState.sortBy = `${indexName}/sort/${uiStateToApply.sortBy}`;
        }

        const newUiState = {
          ...currentUiState,
          [indexName]: newIndexState,
        };

        try {
          connectorState.settingState = true;

          instantSearchInstance.setUiState(newUiState);

          setTimeout(() => {
            connectorState.settingState = false;
          }, 50);
        } catch (error) {
          console.error("[NaturalLanguageSync] Error setting UI state:", error);
          connectorState.settingState = false;
        }
      },
    };
  };
}

/**
 * Natural Language Sync Widget
 * A headless widget that automatically synchronizes natural language search results
 * with InstantSearch UI state
 */
export function naturalLanguageSync(params = {}) {
  const { debug = false, onStateChange } = params;

  const render = () => {};

  const dispose = () => {};

  const createWidget = connectNaturalLanguageSync(render, dispose);

  return {
    ...createWidget({ debug, onStateChange }),
    $$widgetType: "typesense.naturalLanguageSync",
  };
}

export default naturalLanguageSync;
