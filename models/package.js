const mongoose = require("mongoose");

//package schema

const PackageSchema = new mongoose.Schema(
  {
    store: {
      type: String,
      required: true,
    },
    notes: String,
    status: Boolean, //User should not be able to change this
  },
  { timestamps: true }
);

//package model

const Package = mongoose.model("Package", PackageSchema);

module.exports = Package;
