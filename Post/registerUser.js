module.exports = (app, Editor, fetch, crypto, cryption, dir, dotenv) => {
  const wait = require("node:timers/promises").setTimeout;
  const jwt = require("jsonwebtoken");
  const JsonEditor = require("edit-json-file");
  const editorPW = JsonEditor(`${dir}/../Config/userPassword.json`);

  app
    .route("/api/Register/:username/:password")
    .post(async (request, result) => {
      console.log(`\n${Editor.get(`users.${request.params.username}`)}\n`);
      if (Editor.get(`users.${request.params.username}`)) {
        return result.json({
          Error: `Data with Username: ${request.params.username} is Already Exist`,
        });
      }

      const newToken = require("../Function/Token/GenerateToken")(crypto);
      const userName = request.params.username;
      const password = request.params.password;
      const expDate = new Date();

      const encrypted = require("../Function/Crypto/Encrypt")(password, crypto);

      editorPW.set(`users.${userName}`, {
        key: encrypted[1],
        create_at: Math.floor(new Date().getTime() / 1000),
      });

      await wait(500);

      const jwtResult = jwt.sign(
        { UserName: userName, token: newToken },
        process.env.Users_Token,
        {
          expiresIn: `${Math.floor(
            (expDate.setMonth(new Date().getMonth() + 3) -
              new Date().getTime()) /
              1000
          )}s`,
        }
      );

      Editor.set(`users.${userName}`, {
        token: jwtResult,
        password: encrypted[0],
        create_at: Math.floor(new Date().getTime() / 1000),
        duration: Math.floor(expDate.setMonth(new Date().getMonth() + 3)),
        isExpire: false,
      });

      await wait(500);

      Editor.save();
      editorPW.save();

      await wait(2000);
      return result.json({
        UserName: userName,
        Password: Editor.get(`users.${userName}.password`),
        Token: Editor.get(`users.${userName}.token`),
        ExpireDate: `${new Date(
          Editor.get(`users.${userName}.duration`)
        ).getDate()}-${new Date(
          Editor.get(`users.${userName}.duration`)
        ).getMonth()}-${new Date(
          Editor.get(`users.${userName}.duration`)
        ).getFullYear()} | ${new Date(
          Editor.get(`users.${userName}.duration`)
        ).getHours()}:${new Date(
          Editor.get(`users.${userName}.duration`)
        ).getMinutes()}`,
      });
    });
};
