const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    // console.log(req.cookies);

    const token = req.cookies.token;

    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "token is missing",
      });
    }
    try {
      const decods = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decods;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invallid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong, while verifying the token",
    });
  }
};
