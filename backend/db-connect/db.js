const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/dance_backend");
    console.log("Dance Management DB is connected");
  } catch (e) {
    console.log("Error in connecting to the db", e);
  }
};

module.exports = connect;