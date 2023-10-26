const isDebugMode = process.env.NODE_OPTIONS && process.env.NODE_OPTIONS.includes("javascript-debugger");
module.exports = {
  launch: {
    dumpio: true,
    // headless: process.env.HEADLESS === "true" || process.env.CI === "true",
    headless: isDebugMode ? false : true,
    slowMo: 10,
    defaultViewport: null,
    // devtools: true
  },
  server: [
    {
      command: "npm run testground",
      host: "0.0.0.0",
      port: 3000,
      launchTimeout: 120 * 1000,
      usedPortAction: "ignore",
      debug: false,
    },
    {
      command: "npm run typesenseServer",
      host: "0.0.0.0",
      port: 8108,
      launchTimeout: 60 * 1000,
      usedPortAction: "ignore",
      debug: false,
    },
  ],
};
