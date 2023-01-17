const User = require("../models/user");

//signing up a user
const user_signup = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  }).save((error) => {
    if (error) {
      return next(error);
    }
    res.json("Successfully signed up");
  });
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

module.exports = {
  user_signup,
  user_login,
  user_logout,
  user_object,
};
