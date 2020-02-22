module.exports = {
  launch: {
    // dumpio: true,
    headless: process.env.HEADLESS === "true"
  },
  server: [
    {
      command: "npm run startTestground",
      port: 3000,
      debug: true
    },
    {
      command: "npm run startTestTypesenseServer",
      port: 8108,
      debug: true
    }
  ]
};
