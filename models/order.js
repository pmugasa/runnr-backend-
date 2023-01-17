const mongoose = require("mongoose");

//order schema
const OrderSchema = new mongoose.Schema({
  user_id: String,
  package_id: String,
  address: String,
  phone: String,
  cost: Number,
});

//order model
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
