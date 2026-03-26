const fs = require("fs-extra");

global.it = async function (name, func) {
  return await test(name, async () => {
    try {
      await func();
    } catch (e) {
      await fs.ensureDir("screenshots");
      await page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
      throw e;
    }
  });
};
