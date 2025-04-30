const { Router } = require("express");
const { createOrder } = require("../controllers/confirmController");

const router = Router();

router.post("/", createOrder);

module.exports = router;
