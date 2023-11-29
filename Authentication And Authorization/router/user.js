const express = require("express");
const router = express.Router();

const { login, signup } = require("../controller/auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");
router.post("/login", login);
router.post("/signup", signup);

//testing protected router for single middlware
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "welocime to the protected route for test",
  });
});

router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "welcome to th protected route for student",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "welcome to th protected route for admin",
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
});

module.exports = router;
