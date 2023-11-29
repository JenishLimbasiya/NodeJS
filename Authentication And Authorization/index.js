const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

require("./config/database").dbconnect();

app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const user = require("./router/user");
app.use("/api/v1", user);

app.get("/", (req, res) => {
  res.send("this is homepage");
});

app.listen(PORT, () => {
  console.log("server started at 3000 port no");
});
