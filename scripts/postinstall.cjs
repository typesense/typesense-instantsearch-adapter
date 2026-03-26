const packageJson = require("../package.json");

if (packageJson.version.includes("1.0.")) {
  console.warn(
    "\x1b[33m%s\x1b[0m",
    "Note: v1.0.x of typesense-instantsearch-adapter only works with Typesense Server v0.19.x and above.",
  );
} else if (packageJson.version.includes("2.0.")) {
  console.warn(
    "\x1b[33m%s\x1b[0m",
    "Note: v2.x.x of typesense-instantsearch-adapter only works with Typesense Server v0.21.x and above.",
  );
}
