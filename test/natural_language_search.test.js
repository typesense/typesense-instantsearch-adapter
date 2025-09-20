import { naturalLanguageSync, connectNaturalLanguageSync } from "../src/widgets/naturalLanguageSync.js";

describe("Natural Language Search Widget", () => {
  describe("connectNaturalLanguageSync", () => {
    let mockRenderFn;
    let mockUnmountFn;
    let widget;

    beforeEach(() => {
      mockRenderFn = jest.fn();
      mockUnmountFn = jest.fn();
      const createWidget = connectNaturalLanguageSync(mockRenderFn, mockUnmountFn);
      widget = createWidget({ debug: true });
    });

    it("should have correct widget type", () => {
      expect(widget.$$type).toBe("typesense.naturalLanguageSync");
    });

    it("should detect natural language data", () => {
      const resultsWithNL = {
        parsed_nl_query: {
          generated_params: {
            filter_by: "brand:=Apple",
            sort_by: "rating:desc",
          },
        },
      };

      expect(widget._hasNaturalLanguageData(resultsWithNL)).toBe(true);
      expect(widget._hasNaturalLanguageData({})).toBe(false);
      expect(widget._hasNaturalLanguageData(null)).toBe(false);
    });

    it("should parse generated params to UI state", () => {
      const generatedParams = {
        filter_by: "brand:=[Apple,Samsung] && price:[500..1000]",
        sort_by: "rating:desc,popularity:desc",
      };

      const uiState = widget._parseGeneratedParamsToUiState(generatedParams);

      expect(uiState).toEqual({
        refinementList: {
          brand: ["Apple", "Samsung"],
        },
        numericMenu: {
          price: "500:1000",
        },
        sortBy: "rating:desc,popularity:desc",
      });
    });

    it("should parse complex Typesense filters", () => {
      const testCases = [
        {
          filter: "brand:=Apple",
          expected: { refinementList: { brand: ["Apple"] }, numericMenu: {} },
        },
        {
          filter: "brand:=[Apple,Samsung]",
          expected: { refinementList: { brand: ["Apple", "Samsung"] }, numericMenu: {} },
        },
        {
          filter: "(categories:iPhone || categories:Samsung Galaxy)",
          expected: { refinementList: { categories: ["iPhone", "Samsung Galaxy"] }, numericMenu: {} },
        },
        {
          filter: "brand:Apple && price:[500..1000]",
          expected: { refinementList: { brand: ["Apple"] }, numericMenu: { price: "500:1000" } },
        },
        {
          filter: "price:[100..500]",
          expected: { refinementList: {}, numericMenu: { price: "100:500" } },
        },
        {
          filter: "price:<=500",
          expected: { refinementList: {}, numericMenu: { price: ":500" } },
        },
        {
          filter: "price:>=1000",
          expected: { refinementList: {}, numericMenu: { price: "1000:" } },
        },
        {
          filter: "brand:Samsung && price:<=500",
          expected: { refinementList: { brand: ["Samsung"] }, numericMenu: { price: ":500" } },
        },
        {
          filter: "price:>1000",
          expected: { refinementList: {}, numericMenu: { price: "1000:" } },
        },
        {
          filter: "brand:=[Samsung,Motorola]",
          expected: { refinementList: { brand: ["Samsung", "Motorola"] }, numericMenu: {} },
        },
        {
          filter: "brand:=[Samsung,Motorola] && price:<=500",
          expected: { refinementList: { brand: ["Samsung", "Motorola"] }, numericMenu: { price: ":500" } },
        },
      ];

      testCases.forEach(({ filter, expected }) => {
        const result = widget._parseTypesenseFiltersToUiState(filter);
        expect(result).toEqual(expected);
      });
    });

    it("should add values to refinement list correctly", () => {
      const refinementList = {};

      widget._addToRefinementList(refinementList, "brand", "Apple");
      widget._addToRefinementList(refinementList, "brand", "Samsung");
      widget._addToRefinementList(refinementList, "brand", "Apple"); // Duplicate
      widget._addToRefinementList(refinementList, "category", "Phone");

      expect(refinementList).toEqual({
        brand: ["Apple", "Samsung"],
        category: ["Phone"],
      });
    });
  });

  describe("naturalLanguageSync widget", () => {
    it("should create widget with correct type", () => {
      const widget = naturalLanguageSync({ debug: true });
      expect(widget.$$widgetType).toBe("typesense.naturalLanguageSync");
    });

    it("should handle debug and onStateChange parameters", () => {
      const onStateChange = jest.fn();
      const widget = naturalLanguageSync({
        debug: true,
        onStateChange,
      });

      expect(widget).toBeDefined();
      expect(widget.$$widgetType).toBe("typesense.naturalLanguageSync");
    });
  });

  describe("Widget Integration", () => {
    it("should not interfere with normal search results", () => {
      const mockRenderFn = jest.fn();
      const createWidget = connectNaturalLanguageSync(mockRenderFn);
      const widget = createWidget({});

      const normalResults = {
        hits: [{ name: "iPhone 13" }],
        found: 1,
      };

      const mockInstantSearchInstance = {
        getUiState: () => ({ products: {} }),
        setUiState: jest.fn(),
        mainIndex: { getIndexName: () => "products" },
      };

      const renderState = widget.getWidgetRenderState({
        results: normalResults,
        instantSearchInstance: mockInstantSearchInstance,
      });

      expect(renderState.isActive).toBe(false);
      expect(renderState.appliedState).toBe(null);
    });

    it("should handle results with natural language data", () => {
      const mockRenderFn = jest.fn();
      const createWidget = connectNaturalLanguageSync(mockRenderFn);
      const widget = createWidget({ debug: true });

      const nlResults = {
        hits: [{ name: "iPhone 13" }],
        found: 1,
        parsed_nl_query: {
          generated_params: {
            filter_by: "brand:=Apple",
            sort_by: "rating:desc",
          },
        },
      };

      const mockInstantSearchInstance = {
        getUiState: () => ({ products: {} }),
        setUiState: jest.fn(),
        mainIndex: { getIndexName: () => "products" },
      };

      const renderState = widget.getWidgetRenderState({
        results: nlResults,
        instantSearchInstance: mockInstantSearchInstance,
      });

      expect(renderState.isActive).toBe(true);
      expect(renderState.debug).toBeDefined();
      expect(renderState.debug.lastParsedQuery).toEqual(nlResults.parsed_nl_query);
    });

    it("should clear previous filters when new natural language filters are applied", () => {
      const mockRenderFn = jest.fn();
      const createWidget = connectNaturalLanguageSync(mockRenderFn);
      const widget = createWidget({ debug: true });

      const mockInstantSearchInstance = {
        getUiState: () => ({
          products: {
            refinementList: {
              brand: ["OldBrand"],
              category: ["OldCategory"],
            },
            numericMenu: {
              price: "100:200",
            },
            query: "old query",
          },
        }),
        setUiState: jest.fn(),
        mainIndex: { getIndexName: () => "products" },
      };

      const nlResults = {
        hits: [{ name: "iPhone 13" }],
        found: 1,
        parsed_nl_query: {
          generated_params: {
            filter_by: "brand:=Apple",
          },
        },
      };

      widget.getWidgetRenderState({
        results: nlResults,
        instantSearchInstance: mockInstantSearchInstance,
      });

      expect(mockInstantSearchInstance.setUiState).toHaveBeenCalled();

      const setUiStateCall = mockInstantSearchInstance.setUiState.mock.calls[0][0];
      const newProductsState = setUiStateCall.products;

      expect(newProductsState.refinementList).toEqual({
        brand: ["Apple"],
      });

      expect(newProductsState.numericMenu).toBeUndefined();

      expect(newProductsState.query).toBe("old query");
    });
  });
});

describe("Token-based Filter Parser", () => {
  let widget;

  beforeEach(() => {
    const createWidget = connectNaturalLanguageSync(() => {});
    widget = createWidget({ debug: true });
  });

  it("should handle empty and invalid filters", () => {
    expect(widget._parseTypesenseFiltersToUiState("")).toEqual({ refinementList: {}, numericMenu: {} });
    expect(widget._parseTypesenseFiltersToUiState(null)).toEqual({ refinementList: {}, numericMenu: {} });
    expect(widget._parseTypesenseFiltersToUiState(undefined)).toEqual({ refinementList: {}, numericMenu: {} });
  });

  it("should tokenize simple filters correctly", () => {
    const tokens = widget._tokenizeFilter("brand:=Samsung");
    expect(tokens).toEqual([
      { type: "FIELD", value: "brand" },
      { type: "OPERATOR", value: ":=" },
      { type: "VALUE", value: "Samsung" },
    ]);
  });

  it("should tokenize array filters correctly", () => {
    const tokens = widget._tokenizeFilter("brand:=[Samsung,Motorola]");
    expect(tokens).toEqual([
      { type: "FIELD", value: "brand" },
      { type: "OPERATOR", value: ":=" },
      { type: "LBRACKET", value: "[" },
      { type: "VALUE", value: "Samsung" },
      { type: "COMMA", value: "," },
      { type: "VALUE", value: "Motorola" },
      { type: "RBRACKET", value: "]" },
    ]);
  });

  it("should tokenize complex filters with operators", () => {
    const tokens = widget._tokenizeFilter("brand:=Samsung && price:<=500");
    expect(tokens).toEqual([
      { type: "FIELD", value: "brand" },
      { type: "OPERATOR", value: ":=" },
      { type: "VALUE", value: "Samsung" },
      { type: "AND", value: "&&" },
      { type: "FIELD", value: "price" },
      { type: "OPERATOR", value: "<=" },
      { type: "VALUE", value: "500" },
    ]);
  });

  it("should handle quoted strings with spaces", () => {
    const filter = 'hierarchicalCategories.lvl1:"Cell Phones > Unlocked Cell Phones"';
    const result = widget._parseTypesenseFiltersToUiState(filter);
    expect(result).toEqual({
      refinementList: {
        "hierarchicalCategories.lvl1": ["Cell Phones > Unlocked Cell Phones"],
      },
      numericMenu: {},
    });
  });

  it("should handle OR conditions in parentheses", () => {
    const filter = "(brand:Samsung || brand:Motorola) && price:<=500";
    const result = widget._parseTypesenseFiltersToUiState(filter);
    expect(result).toEqual({
      refinementList: {
        brand: ["Samsung", "Motorola"],
      },
      numericMenu: {
        price: ":500",
      },
    });
  });

  it("should handle nested field names with dots", () => {
    const filter = 'hierarchicalCategories.lvl1:=["Cell Phones","Tablets"] && price:[500..1000]';
    const result = widget._parseTypesenseFiltersToUiState(filter);
    expect(result).toEqual({
      refinementList: {
        "hierarchicalCategories.lvl1": ["Cell Phones", "Tablets"],
      },
      numericMenu: {
        price: "500:1000",
      },
    });
  });

  it("should handle complex real-world filter", () => {
    const filter =
      'brand:=[Samsung,Motorola] && price:<=500 && (hierarchicalCategories.lvl1:"Cell Phones > Unlocked Cell Phones" || hierarchicalCategories.lvl1:"Cell Phones > All Cell Phones with Plans")';
    const result = widget._parseTypesenseFiltersToUiState(filter);
    expect(result).toEqual({
      refinementList: {
        brand: ["Samsung", "Motorola"],
        "hierarchicalCategories.lvl1": [
          "Cell Phones > Unlocked Cell Phones",
          "Cell Phones > All Cell Phones with Plans",
        ],
      },
      numericMenu: {
        price: ":500",
      },
    });
  });

  it("should handle numeric range filters", () => {
    const filter = "price:[100..500] && rating:>=4";
    const result = widget._parseTypesenseFiltersToUiState(filter);
    expect(result).toEqual({
      refinementList: {},
      numericMenu: {
        price: "100:500",
        rating: "4:",
      },
    });
  });

  it("should handle mixed quoted and unquoted values", () => {
    const filter = 'brand:=Apple && title:="iPhone 13 Pro" && price:<=999';
    const result = widget._parseTypesenseFiltersToUiState(filter);
    expect(result).toEqual({
      refinementList: {
        brand: ["Apple"],
        title: ["iPhone 13 Pro"],
      },
      numericMenu: {
        price: ":999",
      },
    });
  });

  it("should fallback gracefully on parse errors", () => {
    const filter = "brand:=[unclosed && price";
    const result = widget._parseTypesenseFiltersToUiState(filter);
    expect(result).toEqual({ refinementList: {}, numericMenu: {} });
  });
});
