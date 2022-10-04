module.exports = (
  app,
  client,
  Editor,
  fetch,
  crypto,
  cryption,
  dir,
  dotenv
) => {
  app
    .route("/api/:username/:password/Discord/chats")
    .get(async (request, result) => {});
};
