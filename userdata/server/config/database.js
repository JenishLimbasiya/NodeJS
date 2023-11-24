const mongoose = require("mongoose");
require("dotenv").config();

exports.dbconnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("db connection successfully");
    })
    .catch(() => {
      console.log("some errorr in db connection");
    });
};
