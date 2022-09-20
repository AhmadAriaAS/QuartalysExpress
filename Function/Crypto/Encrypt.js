module.exports = (str, crypto) => {
  const cryption = require("crypto-js");

  const key = require("../Token/GenerateToken")(crypto);
  const Encrypt = cryption.AES.encrypt(str, key).toString();
  return [Encrypt, key];
};
