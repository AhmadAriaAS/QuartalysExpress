module.exports = async (
  app,
  client,
  Editor,
  fetch,
  crypto,
  cryption,
  dir,
  dotenv,
  userz
) => {
  const colors = require("colors");

  require("../Post/registerUser")(
    app,
    Editor,
    fetch,
    crypto,
    cryption,
    dir,
    dotenv
  );

  require("../Get/getDiscordChat")(
    app,
    Editor,
    fetch,
    crypto,
    cryption,
    dir,
    dotenv
  );

  require("../DiscordHandler/startup")(
    client,
    Editor,
    fetch,
    crypto,
    cryption,
    dir,
    dotenv,
    userz
  );

  await require("../Get/getDiscordChat")(
    app,
    client,
    Editor,
    fetch,
    crypto,
    cryption,
    dir,
    dotenv
  );

  require("../Get/getTwitter")(app, dotenv, Editor, dir, fetch);

  require("../Post/regis")(app, dir, dotenv);

  require("../Get/getUser")(app, Editor, dotenv, dir);
};
