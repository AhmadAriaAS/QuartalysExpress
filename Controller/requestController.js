module.exports = (app, editor, fetch, crypto) => {
  require("../Post/registerUser")(app, editor, crypto);
};
