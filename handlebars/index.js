const express = require("express");
const app = express();
const router = express.Router();
const hbs = require("hbs");
const path = require("path");
require("dotenv").config();
let PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/about", (req, res) => {
  res.render("about");
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`APP is Running on port ${PORT}`);
});
