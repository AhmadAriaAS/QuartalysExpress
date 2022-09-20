module.exports = (crypto) => {
  const token = crypto.randomBytes(64).toString("hex");
  return token;
};
