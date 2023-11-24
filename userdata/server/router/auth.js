const express = require("express");
const router = express.Router();

const { signup, signin, about, logout } = require("../controller/auth");
const { auth } = require("../middlewares/authenticate");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/about", auth, about);
router.get("/logout", logout);

module.exports = router;
