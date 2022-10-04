module.exports = async (dotenv, collection, query) => {
  const { MongoClient } = require("mongodb");

  try {
    const url = process.env.Mongodb_URL;
    const cursorDB = new MongoClient(url);

    await cursorDB.connect();
    const db = await cursorDB.db(process.env.Mongo_Database);
    const cursor = db.collection(collection).find(query);

    return cursor;
  } catch (err) {
    throw err;
  }
};
