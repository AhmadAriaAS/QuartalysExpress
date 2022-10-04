module.exports = (request, result, Editor, dir) => {
  const ConfigEdite = require("edit-json-file");
  let editors = ConfigEdite(`${dir}/../Config/userPassword.json`);

  const userName = request.params.username;
  const password = request.params.password;

  const passwordScope = Editor.get(`users.${userName}.password`);
  if (passwordScope == null) {
    return result.status(400).json({ ErrorCode: 400, Error: "Unauthorized" });
  }

  const decryptPassword = require("../Crypto/Decrypt")(
    passwordScope,
    editors.get(`users.${userName}.key`)
  );
  console.log(decryptPassword)

  if (password != decryptPassword) {
    result.status(400).json({ ErrorCode: 400, Error: "Unauthorized" });
    return false;
  } else {
    return true;
  }
};
