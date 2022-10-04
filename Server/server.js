const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JsonEditor = require("edit-json-file");
const fetch = require("node-fetch");
const crypto = require("crypto");
const cryption = require("crypto-js");
const wait = require("node:timers/promises").setTimeout;
const { Client, GatewayIntentBits, Partials, User } = require("discord.js");
const client = new Client({
  partials: [Partials.Channel, Partials.Message, Partials.User],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const dotenv = require("dotenv").config({ path: `${__dirname}/../Env/.env` });
const dir = __dirname;
let Editor = JsonEditor(`${dir}/../Config/userConfig.json`);
const Editor2 = JsonEditor(`${dir}/../Config/userPassword.json`);
const editor3 = JsonEditor(
  `${dir}/../Config/Users/UsersPasswordManagement.json`
);

// const resultArray = editor3.get(`chats`);
// const sortedRes = resultArray.sort((a, b) => {
//   return a.createAt - b.createAt;
// });

const app = express();
const PORT = process.env.port;

app.use(cors());

require("../Function/Auth/authUser")(
  app,
  Editor,
  fetch,
  crypto,
  cryption,
  dir,
  dotenv
);

waiting();

require("../Controller/requestController")(
  app,
  client,
  Editor,
  fetch,
  crypto,
  cryption,
  dir,
  dotenv,
  User
);

app.listen(PORT, () => {
  console.log("Server has Started at Port: " + PORT);
});

async function waiting() {
  const entier = editor3.get(`Passwords.Aseps`);

  const decP = await require("../Function/Crypto/Decrypt")(
    entier.password,
    entier.key
  );

  console.log(entier.password);
  console.log(`\n\n${entier.key}`);
  console.log(decP);
  await wait(3000);
}
