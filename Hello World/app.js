const express = require("express");
const app = express();

require("dotenv").config();

port = process.env.PORT;

app
  .get("/", (req, res) => {
    res.send("Hello World");
  })
  .listen(port, (req, res) => {
    console.log(`Port is connecting on ${port}`);
  });
