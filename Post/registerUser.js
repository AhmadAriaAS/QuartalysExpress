module.exports = (app, editor, crypto, cryption, path) => {
  const wait = require("node:timers/promises").setTimeout;
  const jwt = require("jsonwebtoken");
  const JsonEditor = require("edit-json-file");
  const editorPW = JsonEditor(`${path}/../Config/userPassword.json`);

  app
    .route("/api/Register/:username/:password")
    .get(async (request, result) => {
      console.log(`\n${editor.get(`users.${request.params.username}`)}\n`);
      if (editor.get(`users.${request.params.username}`)) {
        return result.json({
          Error: `Data with Username: ${request.params.username} is Already Exist`,
        });
      }

      const newToken = require("../Function/Token/GenerateToken")(crypto);
      const userName = request.params.username;
      const password = request.params.password;
      const expDate = new Date();

      const encrypted = require("../Function/Crypto/Encrypt")(password, crypto);

      editor.set(`users.${userName}`, {
        token: newToken,
        password: encrypted[0],
        create_at: Math.floor(new Date().getTime() / 1000),
        duration: Math.floor(expDate.setMonth(new Date().getMonth() + 3)),
        isExpire: false,
      });

      editorPW.set(`users.${userName}`, {
        key: encrypted[1],
        create_at: Math.floor(new Date().getTime() / 1000),
      });
      await wait(500);
      editor.save();
      editorPW.save();

      jwt.sign(
        {
          exp: Math.floor(
            (expDate.setMonth(new Date().getMonth() + 3) -
              new Date().getTime()) /
              1000
          ),
          data: userName,
        },
        newToken
      );

      return result.json({
        UserName: userName,
        Password: editor.get(`users.${userName}.password`),
        Token: editor.get(`users.${userName}.token`),
        ExpireDate: `${new Date(
          editor.get(`users.${userName}.duration`)
        ).getDate()}-${new Date(
          editor.get(`users.${userName}.duration`)
        ).getMonth()}-${new Date(
          editor.get(`users.${userName}.duration`)
        ).getFullYear()} | ${new Date(
          editor.get(`users.${userName}.duration`)
        ).getHours()}:${new Date(
          editor.get(`users.${userName}.duration`)
        ).getMinutes()}`,
      });
    });
};
