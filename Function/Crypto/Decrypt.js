module.exports = (str, key) => {
  const cryption = require("crypto-js");

  var bytes = cryption.AES.decrypt(str, key);
  var originalText = bytes.toString(cryption.enc.Utf8);

  return originalText;
};
