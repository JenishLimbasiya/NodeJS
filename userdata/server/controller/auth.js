const User = require("../model/userschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    // console.log("inside try", req.body);
    const { name, email, phone, password, work } = req.body;

    if (!name || !email || !phone || !password || !work) {
      return res.status(400).json({
        success: false,
        message: "all field is required",
      });
    }

    const existinguser = await User.findOne({ email });

    if (existinguser) {
      return res.status(400).json({
        success: false,
        message: "user is already exist",
      });
    }

    let hasedpassword;
    try {
      hasedpassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "error in hasing password",
      });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password: hasedpassword,
      work,
      role: "student",
    });

    return res.status(201).json({
      success: true,
      message: "user register successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user register some error",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all the details",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registred",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = token;
      user.password = null;
      console.log(user);

      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, option).status(200).json({
        success: true,
        token,
        user,
        message: "user login succesfill",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "password is incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "login faild",
      error: error.message,
    });
  }
};
exports.about = async (req, res) => {
  res.send(req.decods);
};
exports.logout = async (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.status(200).send("user logout");
};
