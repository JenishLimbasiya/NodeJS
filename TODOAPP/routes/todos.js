const express = require("express");
const router = express.Router();

const { createTodo } = require("../controllers/createTodo");
const { getTodo, getTodoById } = require("../controllers/getTodo");
const { updateTodo } = require("../controllers/upDateTodo");
const { deleteTodo } = require("../controllers/deleteTodo");

// define Api routes
router.post("/create_todo", createTodo);
router.get("/get_todos", getTodo);
router.get("/get_todos/:id", getTodoById);
router.put("/update_todo/:id", updateTodo);
router.delete("/delete_todo/:id", deleteTodo);
module.exports = router;
