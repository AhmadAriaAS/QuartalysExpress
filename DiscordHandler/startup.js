module.exports = async (
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

  try {
    client.on("ready", () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    require("./Controller/controller")(client, dir);

    client.login(process.env.Token);
  } catch (err) {
    console.log(
      `Failed to Starting Discord Bot${colors.bgRed.white.bold.italic}\n Error Code:${colors.bgRed.white.bold.italic} `
    );
    throw err;
  }
};
