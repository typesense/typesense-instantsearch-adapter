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
    name: "brands",
    num_documents: 0,
    fields: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "popularity",
        type: "int32",
      },
    ],
    default_sorting_field: "popularity",
  };

  console.log("Populating brands index in Typesense");

  const brands = require("./data/brands.json");

  brands.forEach((brand) => {
    brand.popularity = brand.name.length;
  });

  let reindexNeeded = false;
  try {
    const collection = await typesense.collections("brands").retrieve();
    console.log("Found existing schema");
    // console.log(JSON.stringify(collection, null, 2));
    if (collection.num_documents !== brands.length || process.env.FORCE_REINDEX === "true") {
      console.log("Deleting existing schema");
      reindexNeeded = true;
      await typesense.collections("brands").delete();
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

  try {
    const returnData = await typesense.collections("brands").documents().import(brands);
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
