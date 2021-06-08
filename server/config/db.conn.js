const mongoose = require("mongoose");
const config = require("./db.config");

const dbConn = async () => {
  try {
    await mongoose.connect(
      config.uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => {
        console.log("Connected to the Database");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConn;
