const mongoose = require("mongoose");
const initData = require("./data.js");
const country = require("./countries.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Havenly";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner: "68d3c794a259e7d1b5a5e7ae"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();