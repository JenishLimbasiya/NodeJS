const express = require("express");
const app = express();

// load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware to parse json request body
app.use(express.json());

// import routes for TODO API
const todoRoutes = require("./routes/todos");

//mount the todo API routes
app.use("/api/v1", todoRoutes);

app.listen(PORT, () => {
  console.log(`server started successfully at ${PORT}`);
});

//connect db connection
const dbconnect = require("./config/database");
dbconnect();

// default Route
app.get("/", (req, res) => {
  res.send(`<h1> This is homepage body </h1>`);
});
