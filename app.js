require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcryptjs = require("bcryptjs");
const packageRoutes = require("./routes/packagesRoutes");
const userRoutes = require("./routes/userRoutes");

//TODO install passport JS
//TODO install bcryptjs
//TODO install express-session

const app = express();
//connecting to DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("ERRROR", error.message);
  });

//middleware
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

//LocalStrategy setup
passport.use(
  new LocalStrategy((email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//access to user object from anywhere in the app
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRoutes);
app.use("/packages", packageRoutes);

//homepage
app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = 4000;

//Listening to incoming requests
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

module.exports = app;
