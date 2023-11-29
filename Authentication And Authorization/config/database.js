const mongoose = require("mongoose");
require("dotenv").config;

exports.dbconnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("database connected");
    })
    .catch(() => {
      console.log("database connection faild");
    });
};
