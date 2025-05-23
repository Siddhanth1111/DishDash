const { Router } = require("express");
const { processPayment } = require("../controllers/paymentController");

const router = Router();

router.post("/payment", processPayment);

module.exports = router;
