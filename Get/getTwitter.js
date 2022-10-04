module.exports = (app, dotenv, editor, dir, fetch) => {
  app
    .route("/api/:username/:password/Twitter/tweets")
    .get(async (request, result) => {
      const auth = require("../Function/Auth/authPassword")(
        request,
        result,
        editor,
        dir
      );

      if (auth == false) return;

      const directLink = process.env.Twitter_API_Link;
      const bearer = process.env.Twitter_Bearer_Token;
      const userID = process.env.Twitter_Account_ID;

      const cursor = await fetch(`${directLink}users/${userID}/tweets`, {
        bemethod: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
      });
      const response = await cursor.json();

      return result.status(200).json(response);
    });
};
