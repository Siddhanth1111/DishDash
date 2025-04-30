const {Orders} = require("../db")

const createOrder = async (req, res) => {
  try {
    const { outlet, cart, userPhone, totalPrice } = req.body;

    if (!outlet || !cart || !userPhone || typeof totalPrice !== "number") {
      return res.status(400).json({ msg: "Missing or invalid fields" });
    }

    await Orders.create({
      outlet,
      userPhone,
      orders: cart,
      totalPrice,
    });

    res.status(200).json({ msg: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
};
