const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JsonEditor = require("edit-json-file");
const fetch = require("node-fetch");
const crypto = require("crypto");
const cryption = require("crypto-js");

const dotenv = require("dotenv").config({ path: `${__dirname}/../Env/.env` });
const dir = __dirname;
let Editor = JsonEditor(`${dir}/../Config/userConfig.json`);
const Editor2 = JsonEditor(`${dir}/../Config/userPassword.json`);

const app = express();
const PORT = process.env.port;

app.use(cors());

require("../Controller/requestController")(
  app,
  Editor,
  fetch,
  crypto,
  cryption,
  dir
);

app.listen(PORT, () => {
  console.log("Server has Started at Port: " + PORT);
});
