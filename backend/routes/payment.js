const {Router} = require("express");
const router = Router();

const Stripe = require("stripe");


const stripe = Stripe(
    "sk_test_51RFvmwRmmd7ZuCtZ646Hudu9c43pzsxBBQ7MOc9TA9vCrXUMJw4ezQxgqG6QjK4jGuQj0cyJuD2yRlSPqj63f8rc00fRmG2oy9"
);
  

  router.post("/payment", async (req, res) => {
    try {
      if (!req.body.items || !Array.isArray(req.body.items)) {
        return res.status(400).json({ error: "Invalid items array" });
      }
  
      const lineItems = req.body.items.map((item) => {
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
        success_url: "http://localhost:5174/success",
        cancel_url: "http://localhost:5174/cancel",
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;