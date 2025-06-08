const Stripe = require("stripe");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const processPayment = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Invalid items array" });
    }

    const lineItems = items.map((item) => {
      if (!item.food || typeof item.price !== "number" || !item.quantity) {
        throw new Error("Invalid item structure");
      }

      return {
        price_data: {
          currency: "inr",
          product_data: { name: item.food },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://dish-dash-weld.vercel.app/success",
      cancel_url: "https://dish-dash-weld.vercel.app/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  processPayment,
};
