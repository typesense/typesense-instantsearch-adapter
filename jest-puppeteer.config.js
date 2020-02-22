module.exports = {
  launch: {
    // dumpio: true,
    headless: process.env.HEADLESS === "true"
  },
  server: [
    {
      command:
        "yarn link ; pkill -f testground/node_modules/.bin/parcel ; cd test/support/testground && yarn link typesense-instantsearch-adapter && yarn install && yarn start",
      port: 3000,
      debug: true
    },
    {
      command:
        "docker run -i -p 8108:8108 -v/tmp/typesense-data/:/data typesense/typesense:facets-20-feb-2020 --data-dir /data --api-key=xyz --search-only-api-key=abcd --listen-port 8108 --enable-cors",
      port: 8108,
      debug: true
    }
  ]
};
