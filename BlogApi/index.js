const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const blog = require("./routes/blog");

app.use("/api/v1", blog);

const connectdb = require("./config/database");
connectdb();

app.listen(PORT, () => {
  console.log(`APP is started`);
});

app.get("/", (req, res) => {
  res.send("<h1>This is my homepage</h1>");
});
