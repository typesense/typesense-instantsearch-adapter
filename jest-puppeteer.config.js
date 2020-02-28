module.exports = {
  launch: {
    // dumpio: true,
    // headless: process.env.HEADLESS === "true" || process.env.CI === "true",
    headless: true,
    defaultViewport: null
  },
  server: [
    {
      command: "npm run testground",
      port: 3000,
      // debug: true,
      launchTimeout: 120 * 1000
    },
    {
      command: "npm run typesenseServer",
      port: 8108,
      launchTimeout: 60 * 1000
      // debug: true
    }
  ]
};
