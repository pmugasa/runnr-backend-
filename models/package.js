const mongoose = require("mongoose");

//package schema

const PackageSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, refs: "User" },
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
