const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

require("./config/database").dbconnect();

app.use(express.json());

app.use(cookieParser());

app.use(require("./router/auth"));

app.listen(PORT, () => {
  console.log(`server stated at ${PORT}`);
});
