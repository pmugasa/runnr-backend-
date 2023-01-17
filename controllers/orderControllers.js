const Order = require("../models/order");

//order_ created order_deleted order_updated order_payment order_details

//get orders
const order_index = async (req, res) => {
  const orders = await Order.find({});
  if (orders.length === 0) {
    res.json("You currently's have no order history").end();
  } else {
    try {
      res.json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

//get order details
const order_details = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);

  if (order) {
    res.json(order);
  } else {
    res.status(404).end();
  }
};

//create new order
const order_create = async (req, res) => {
  const body = req.body;

  if (!body) {
    res.status(400).json({
      error: "Content missing please fill in the form",
    });
  }
  const order = new Package({
    user_id: user_id,
    packages: packages_id,
    address: body.address,
    phone: body.phone,
    cost: body.cost,
  });
  try {
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  order_index,
  order_details,
};
