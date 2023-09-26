const Todo = require("../models/Todo");

// define route handler
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
