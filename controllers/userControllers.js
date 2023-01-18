const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");

//TODO users should not be able to sign up twice using the same email
//

//signing up a user
const user_signup = async (req, res, next) => {
  const saltRounds = 10;
  const plainTextPwd = req.body.password;
  const email = req.body.email;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(plainTextPwd, salt);
  try {
    //check if email already exists in DB
    const user = await User.findOne({ email });
    if (user) {
      //redirect to login page
      res.status(409).json("User already exists. Please login");
    } else {
      //create new user
      const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.json("Successfully created account");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error creating account");
  }
};

//log-in user
const user_login = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/log-in",
});

//user object to be used in dashboard
const user_object = (req, res) => {
  res.json({ user: req.user });
};

//log-out user
const user_logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

//all user accounts
const user_accounts = async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
};

module.exports = {
  user_signup,
  user_login,
  user_logout,
  user_object,
  user_accounts,
};
