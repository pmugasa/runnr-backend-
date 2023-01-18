const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

//get all the users
router.get("/", userControllers.user_accounts);

//user log-in
router.post("/log-in", userControllers.user_login);

//user log-out
router.get("/log-out", userControllers.user_logout);

//user sign-up
router.post("/sign-up", userControllers.user_signup);

//TO BE USED FOR LOGGED IN USER TO SHOW NAME IN DASHBOARD
router.get("/dashboard", userControllers.user_object);

module.exports = router;
