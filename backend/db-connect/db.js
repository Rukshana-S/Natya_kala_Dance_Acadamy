const mongoose = require("mongoose");

const connect = async () => {
  try {
    const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/dance_backend";

    const conn = await mongoose.connect(dbURI);

    console.log(`Dance Management DB is connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
  } catch (e) {
    console.log("Error in connecting to the db", e);
  }
};

module.exports = connect;