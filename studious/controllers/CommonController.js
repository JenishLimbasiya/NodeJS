const User = require("../model/userModel");

const CommonController = {
  async get_home_page(req, res) {
    if (req.session.email !== undefined) {
      console.log("inside if");
      isLoggedInRes = true;
    } else {
      console.log("inside else");
      isLoggedInRes = false;
    }
    res.render("home", { data: { isLoggedIn: req.session.isloggedin } });
  },

  async get_about_page(req, res) {
    console.log("called About page", req.session);
    if (req.session.email !== undefined) {
      isLoggedInRes = true;
    } else {
      isLoggedInRes = false;
    }
    res.render("about", { data: { isLoggedIn: req.session.isloggedin } });
  },

  async get_courses_page(req, res) {
    res.render("courses", { data: { isLoggedIn: req.session.isloggedin } });
  },

  async get_contact_page(req, res) {
    res.render("contact", { data: { isLoggedIn: req.session.isloggedin } });
  },

  async get_admin_dashboard(req, res) {
    res.render("admindashboard");
  },

  async get_admin_allusers(req, res) {
    const user = await User.find();
    // console.log(user);
    res.render("viewallusers", { data: user });
  },
  async delete_user_by_id(req, res) {
    var id = req.params.id;
    const user = await User.findOneAndRemove({ _id: id });
    res.status(200).json({
      type: "success",
      code: 1,
      message: "Data Deleted",
      data: user,
    });
    return;
  },

  async select_update_user_by_id(req, res) {
    var id = req.params.id;
    const user = await User.findOne({ _id: id });
    res.status(200).json({
      type: "success",
      code: 1,
      message: "Data Deleted",
      data: user,
    });
    return;
  },
  async store_update_user_by_id(req, res) {
    var id = req.params.id;
    const { username, email, mobile, password } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        Username: username,
        Email: email,
        Mobile: mobile,
        Password: password,
      }
    );
    res.status(200).json({
      type: "success",
      code: 1,
      message: "Data Updated",
      data: user,
    });
    return;
  },
};

module.exports = CommonController;
