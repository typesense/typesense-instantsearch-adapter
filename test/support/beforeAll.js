module.exports = async () => {
  // Log page errors
  page
    .on("console", message => {
      const messageType = message
        .type()
        .substr(0, 3)
        .toUpperCase();

      switch (messageType) {
        case "ERR":
          console.error(`${messageType} ${message.text()}`);
          break;
        default:
      }
    })
    .on("pageerror", ({ message }) => console.error(message))
    .on("response", response => {
      if (![200, 304].includes(response.status())) {
        console.error(`${response.status()} ${response.url()}`);
      }
    })
    .on("requestfailed", request =>
      console.error(`${request.failure().errorText} ${request.url()}`)
    );

  return require("./populateTypesenseIndex");
};
