// This script can also be executed from the command line directly:
// $ node populateTypesenseIndex.js

const Typesense = require("typesense");
const promiseRetry = require("promise-retry");

module.exports = (async () => {
  // Create a client
  const typesense = new Typesense.Client({
    masterNode: {
      host: "localhost",
      port: "8108",
      protocol: "http",
      apiKey: "xyz"
    }
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
        type: "string",
        facet: true
      },
      {
        name: "categories.lvl1",
        type: "string",
        facet: true
      },
      {
        name: "categories.lvl2",
        type: "string",
        facet: true
      },
      {
        name: "categories.lvl3",
        type: "string",
        facet: true
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

  const products = require("./data/ecommerce.json");

  let reindexNeeded = false;
  try {
    const collection = await typesense.collections("products").retrieve();
    if (
      collection.num_documents !== products.length ||
      process.env.FORCE_REINDEX === "true"
    ) {
      reindexNeeded = true;
      await typesense.collections("products").delete();
    }
  } catch (e) {
    reindexNeeded = true;
  }

  if (!reindexNeeded) {
    return true;
  }

  console.log("Indexing products...");

  await typesense.collections().create(schema);

  const returnData = products
    .reduce((accPromise, product) => {
      return accPromise.then(() => {
        product.free_shipping = product.name.length % 2 === 1; // We need this to be deterministic for tests
        product.rating = (product.description.length % 5) + 1; // We need this to be deterministic for tests
        product.categories.forEach((category, index) => {
          product[`categories.lvl${index}`] = product.categories
            .slice(0, index + 1)
            .join(" > ");
        });
        // TODO: Fix this after we support optional facets
        for (let i = 0; i <= 3; i++) {
          if (!product[`categories.lvl${i}`]) {
            product[`categories.lvl${i}`] = "";
          }
        }
        return promiseRetry((retry, number) => {
          // console.log(`"${product.name}": Indexing #${number}`);
          process.stdout.write(".");
          return typesense
            .collections("products")
            .documents()
            .create(product)
            .catch(retry);
        });
      });
    }, Promise.resolve())
    .then(data => {
      // console.log(data);
      console.log("\nDone indexing products");
    })
    .catch(error => {
      console.log(error);
    });

  return returnData;
})();
