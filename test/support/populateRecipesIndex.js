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
  });

  const schema = {
    name: "recipes",
    fields: [
      {
        name: "recipe_id",
        type: "int32",
      },
      {
        name: "title",
        type: "string",
      },
      {
        name: "ingredient_names",
        type: "string[]",
        facet: true,
      },
    ],
    default_sorting_field: "recipe_id",
  };

  console.log("Populating index in Typesense");

  const recipes = require("./data/recipes.json");

  let reindexNeeded = false;
  try {
    const collection = await typesense.collections("recipes").retrieve();
    console.log("Found existing schema");
    // console.log(JSON.stringify(collection, null, 2));
    if (collection.num_documents !== recipes.length || process.env.FORCE_REINDEX === "true") {
      console.log("Deleting existing schema");
      reindexNeeded = true;
      await typesense.collections("recipes").delete();
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
  //   .collections("recipes")
  //   .retrieve();
  // console.log("Retrieving created schema: ");
  // console.log(JSON.stringify(collectionRetrieved, null, 2));

  console.log("Adding records: ");

  try {
    const returnData = await typesense.collections("recipes").documents().import(recipes);
    console.log(returnData);
    console.log("Done indexing.");

    const failedItems = returnData.filter((item) => item.success === false);
    if (failedItems.length > 0) {
      throw new Error(`Error indexing items ${JSON.stringify(failedItems, null, 2)}`);
    }

    return returnData;
  } catch (error) {
    console.log(error);
  }
})();
