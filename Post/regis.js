module.exports = (app, dir, dotenv) => {
  const JsonEditor = require("edit-json-file");
  let Editor = JsonEditor(`${dir}/../Config/Users/RegisteredUser.json`);
  let Editor2 = JsonEditor(
    `${dir}/../Config/Users/UsersPasswordManagement.json`
  );
  const wait = require("node:timers/promises").setTimeout;

  app
    .route("/api/:username/:password/User/register/:id/:pw")
    .post(async (request, result) => {
      const id = request.params.id;
      const password = request.params.pw;

      const formatingSymbols = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      const formatingNumbers = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
      ];

      const userExisting = Editor.get(`users.${id}`);
      const splittedPassword = password.split("");

      if (userExisting != null)
        return result
          .status(400)
          .json({ ErrorCode: 400, Error: "User is already exist" });

      if (
        formatingSymbols.test(password) == true &&
        splittedPassword.some((values) => formatingNumbers.includes(values)) ==
          true
      ) {
        Editor.set(`Users.${id}`, {
          createAt: new Date().getTime(),
          role: 0,
        });
        const key = require("../Function/Token/GenerateToken")(
          require("crypto")
        );

        Editor2.set(`Passwords.${id}`, {
          password: require("../Function/Crypto/Encrypt")(password, key)[0],
          key: key,
          createAt: new Date().getTime(),
        });

        await wait(2000);

        Editor.save();
        Editor2.save();

        return result.status(200).json({
          Message: "User has been Created",
          Username: id,
          CreateDate: new Date(),
        });
      } else {
        return result.status(400).json({
          ErrorCode: 400,
          Error: "Password should be containing symbols and numbers",
        });
      }
    });
};
