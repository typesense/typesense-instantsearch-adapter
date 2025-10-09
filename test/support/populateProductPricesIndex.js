const Typesense = require("typesense");

module.exports = (async () => {
  // Create a client
  const typesense = new Typesense.Client({
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
    apiKey: "xyz",
    retryIntervalSeconds: 5,
  });

  // Products collection schema
  const productsSchema = {
    name: "products",
    fields: [
      {
        name: "id",
        type: "string",
      },
      {
        name: "name",
        type: "string",
        facet: false,
      },
      {
        name: "description",
        type: "string",
        facet: false,
      },
      {
        name: "brand",
        type: "string",
        facet: true,
      },
      {
        name: "category",
        type: "string",
        facet: true,
      },
    ],
    default_sorting_field: "id",
  };

  // Prices collection schema with reference to products
  const pricesSchema = {
    name: "product_prices",
    fields: [
      {
        name: "id",
        type: "string",
      },
      {
        name: "productId",
        type: "string",
        reference: "products.id",
      },
      {
        name: "retailer",
        type: "string",
        facet: true,
      },
      {
        name: "price",
        type: "float",
        facet: true,
      },
    ],
    default_sorting_field: "id",
  };

  console.log("Populating products and prices collections in Typesense");

  const products = require("./data/products-with-joins.json");
  const prices = require("./data/product-prices.json");

  // Handle products collection
  let reindexProductsNeeded = false;
  try {
    const collection = await typesense.collections("products").retrieve();
    console.log("Found existing products schema");
    if (collection.num_documents !== products.length || process.env.FORCE_REINDEX === "true") {
      console.log("Deleting existing products schema");
      reindexProductsNeeded = true;
      await typesense.collections("products").delete();
    }
  } catch (e) {
    reindexProductsNeeded = true;
  }

  if (reindexProductsNeeded) {
    console.log("Creating products schema: ");
    console.log(JSON.stringify(productsSchema, null, 2));
    await typesense.collections().create(productsSchema);

    console.log("Adding products records: ");
    try {
      const returnData = await typesense.collections("products").documents().import(products);
      console.log(returnData);
      console.log("Done indexing products.");

      const failedItems = returnData.filter((item) => item.success === false);
      if (failedItems.length > 0) {
        throw new Error(`Error indexing products items ${JSON.stringify(failedItems, null, 2)}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Handle prices collection
  let reindexPricesNeeded = false;
  try {
    const collection = await typesense.collections("product_prices").retrieve();
    console.log("Found existing product_prices schema");
    if (collection.num_documents !== prices.length || process.env.FORCE_REINDEX === "true") {
      console.log("Deleting existing product_prices schema");
      reindexPricesNeeded = true;
      await typesense.collections("product_prices").delete();
    }
  } catch (e) {
    reindexPricesNeeded = true;
  }

  if (reindexPricesNeeded) {
    console.log("Creating product_prices schema: ");
    console.log(JSON.stringify(pricesSchema, null, 2));
    await typesense.collections().create(pricesSchema);

    console.log("Adding prices records: ");
    try {
      const returnData = await typesense.collections("product_prices").documents().import(prices);
      console.log(returnData);
      console.log("Done indexing prices.");

      const failedItems = returnData.filter((item) => item.success === false);
      if (failedItems.length > 0) {
        throw new Error(`Error indexing prices items ${JSON.stringify(failedItems, null, 2)}`);
      }

      return returnData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return true;
})();
