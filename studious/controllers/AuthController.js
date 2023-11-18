const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthController = {
  async get_login_page(req, res) {
    res.render("login");
  },

  async get_registration_page(req, res) {
    res.render("registration");
  },

  async post_registration_page(req, res) {
    const { username, email, mobile, password } = req.body;
    const newUser = new User({
      Username: username,
      Email: email,
      Mobile: mobile,
      Password: password,
      Role: "User",
    });
    try {
      const user = await newUser.save();
    } catch (err) {
      console.error(err);
      res.send(err.message);
    }
    res.status(200).json({
      type: "success",
      code: 1,
      message: "Data inserted Successfully",
      data: "test",
    });
    return;
    // res.render("login");
  },

  async post_login_page(req, res) {
    const user = await User.findOne({ Email: req.body.email });

    if (!user) {
      res.status(500).json({
        type: "failed",
        code: 0,
        message: "User is not found",
      });
      return;
    } else {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET_KEY
      );
      user.token = token;
      await user.save();

      // res.cookie("email", user.Email);
      // res.cookie("isloggedin", "true");
      // res.cookie("token", token);
      req.session.email = user.Email;
      req.session.isloggedin = true;
      req.session.token = token;
    }

    const passwordMatch = bcrypt.compareSync(req.body.password, user.Password);

    if (passwordMatch) {
      res.status(200).json({
        type: "success",
        code: 1,
        message: "Login successful",
        data: user,
      });
    } else {
      res.status(401).json({
        type: "failed",
        code: 0,
        message: "Email or password is invalid",
      });
    }
  },

  async logout(req, res) {
    // res.cookie("token", "");
    // res.cookie("isloggedin", "");
    // res.cookie("email", "");
    req.session.destroy();
    res.redirect("login");
  },
};

module.exports = AuthController;
