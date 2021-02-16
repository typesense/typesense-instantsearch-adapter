// This script can also be executed from the command line directly:
// $ node populateTypesenseIndex.js

const Typesense = require("typesense");

module.exports = (async () => {
  // Create a client
  const typesense = new Typesense.Client({
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http"
      }
    ],
    apiKey: "xyz"
  });

  const schema = {
    name: "products",
    num_documents: 0,
    fields: [
      {
        name: "name",
        type: "string",
        facet: false
      },
      {
        name: "description",
        type: "string",
        facet: false
      },
      {
        name: "brand",
        type: "string",
        facet: true
      },
      {
        name: "categories",
        type: "string[]",
        facet: true
      },
      {
        name: "categories.lvl0",
        type: "string[]",
        facet: true
      },
      {
        name: "categories.lvl1",
        type: "string[]",
        facet: true,
        optional: true
      },
      {
        name: "categories.lvl2",
        type: "string[]",
        facet: true,
        optional: true
      },
      {
        name: "categories.lvl3",
        type: "string[]",
        facet: true,
        optional: true
      },
      {
        name: "price",
        type: "float",
        facet: true
      },
      {
        name: "image",
        type: "string",
        facet: false
      },
      {
        name: "popularity",
        type: "int32",
        facet: false
      },
      {
        name: "free_shipping",
        type: "bool",
        facet: true
      },
      {
        name: "rating",
        type: "int32",
        facet: true
      }
    ],
    default_sorting_field: "popularity"
  };

  console.log("Populating index in Typesense");

  const products = require("./data/ecommerce.json");

  let reindexNeeded = false;
  try {
    const collection = await typesense.collections("products").retrieve();
    console.log("Found existing schema");
    // console.log(JSON.stringify(collection, null, 2));
    if (
      collection.num_documents !== products.length ||
      process.env.FORCE_REINDEX === "true"
    ) {
      console.log("Deleting existing schema");
      reindexNeeded = true;
      await typesense.collections("products").delete();
    }
  } catch (e) {
    reindexNeeded = true;
  }

  if (!reindexNeeded) {
    return true;
  }

  console.log("Creating schema: ");
  console.log(JSON.stringify(schema, null, 2));
  await typesense.collections().create(schema);

  // const collectionRetrieved = await typesense
  //   .collections("products")
  //   .retrieve();
  // console.log("Retrieving created schema: ");
  // console.log(JSON.stringify(collectionRetrieved, null, 2));

  console.log("Adding records: ");

  // Bulk Import
  products.forEach(product => {
    product.free_shipping = product.name.length % 2 === 1; // We need this to be deterministic for tests
    product.rating = (product.description.length % 5) + 1; // We need this to be deterministic for tests
    product.categories.forEach((category, index) => {
      product[`categories.lvl${index}`] = [
        product.categories.slice(0, index + 1).join(" > ")
      ];
    });
  });

  try {
    const returnData = await typesense
      .collections("products")
      .documents()
      .import(products);
    console.log(returnData);
    console.log("Done indexing.");

    const failedItems = returnData.filter(item => item.success === false);
    if (failedItems.length > 0) {
      throw new Error(
        `Error indexing items ${JSON.stringify(failedItems, null, 2)}`
      );
    }

    return returnData;
  } catch (error) {
    console.log(error);
  }
})();
