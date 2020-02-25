module.exports = {
  launch: {
    // dumpio: true,
    // slowMo: 500
    headless: process.env.HEADLESS === "true",
    defaultViewport: null
  },
  server: [
    {
      command: "npm run startTestground",
      port: 3000,
      // debug: true,
      launchTimeout: 20 * 1000
    },
    {
      command: "npm run startTestTypesenseServer",
      port: 8108
      // debug: true
    }
  ]
};
