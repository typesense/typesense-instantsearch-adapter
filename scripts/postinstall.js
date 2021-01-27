const packageJson = require("../package.json");

if (packageJson.version.includes("0.4.")) {
  console.warn(
    "\x1b[33m%s\x1b[0m",
    "Note: v0.4.x of typesense-instantsearch-adapter only works with Typesense Server v0.19.x and above."
  );
}
