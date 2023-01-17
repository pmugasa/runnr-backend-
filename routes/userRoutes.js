const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

//user log-in
app.post("/log-in", userControllers.user_login);

//user log-out
app.get("/log-out", userControllers.user_logout);

//user sign-up
app.post("/sign-up", userControllers.user_signup);
