const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");

//getting all packages
router.get("/", packageController.package_index);

// creating new packages
router.post("/create", packageController.package_create);

//get package details
router.get("/:id", packageController.package_details);

//update package details
router.patch("/:id", packageController.package_update);

//deleting a package
router.delete("/delete/:id", packageController.package_delete);

module.exports = router;
