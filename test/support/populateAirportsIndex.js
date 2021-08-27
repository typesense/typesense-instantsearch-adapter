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
        protocol: "http",
      },
    ],
    apiKey: "xyz",
  });

  const schema = {
    name: "airports",
    fields: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "city",
        type: "string",
        facet: true,
      },
      {
        name: "country",
        type: "string",
        facet: true,
      },
      {
        name: "iata_code",
        type: "string",
      },
      {
        name: "lat_lng",
        type: "geopoint",
      },
      {
        name: "links_count",
        type: "int32",
      },
    ],
    default_sorting_field: "links_count",
  };

  console.log("Populating airports index in Typesense");

  const airports = require("./data/airports.json");

  let reindexNeeded = false;
  try {
    const collection = await typesense.collections("airports").retrieve();
    console.log("Found existing schema");
    // console.log(JSON.stringify(collection, null, 2));
    if (collection.num_documents !== airports.length || process.env.FORCE_REINDEX === "true") {
      console.log("Deleting existing schema");
      reindexNeeded = true;
      await typesense.collections("airports").delete();
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
  //   .collections("airports")
  //   .retrieve();
  // console.log("Retrieving created schema: ");
  // console.log(JSON.stringify(collectionRetrieved, null, 2));

  console.log("Adding records: ");

  // Bulk Import
  airports.forEach((airport) => {
    airport.lat_lng = [airport._geoloc.lat, airport._geoloc.lng];
    delete airport._geoloc;
  });

  try {
    const returnData = await typesense.collections("airports").documents().import(airports);
    console.log(returnData);
    console.log("Done indexing.");

    const failedItems = returnData.filter((item) => item.success === false);
    if (failedItems.length > 0) {
      throw new Error(`Error indexing items ${JSON.stringify(failedItems, null, 2)}`);
    }

    return returnData;
  } catch (error) {
    console.log(error);
    throw error;
  }
})();
