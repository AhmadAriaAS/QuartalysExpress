module.exports = (app, editor, dotenv, dir) => {
  const JsonEditor = require("edit-json-file");
  const editor2 = JsonEditor(
    `${dir}/../Config/Users/UsersPasswordManagement.json`
  );
  const editor3 = JsonEditor(`${dir}/../Config/Users/RegisteredUsers.json`);

  app
    .route("/api/:username/:password/User/:id/:passw")
    .get(async (request, result) => {
      const id = request.params.id;
      const password = request.params.passw;

      const user = editor3.get(`Users.${id}`);

      if (user == null)
        return result.status(400).json({
          ErrorCode: 400,
          Error: `Cannot find the user ${id}`,
        });
      const pw = editor2.get(`Passwords.${user}`);

      const decPw = require("../Function/Crypto/Decrypt")(pw.password, pw.key);

      if (password != pw.password)
        return result.status(400).json({
          ErrorCode: 400,
          Error: `Incorrect Password`,
        });

      return result.status(200).json({
        UserName: id,
        role: user.key,
      });
    });
};
