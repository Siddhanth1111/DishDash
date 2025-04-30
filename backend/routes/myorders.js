const {Router} = require("express");
const { Orders } = require("../db");
const router = Router();
const {fetchOrdersByPhone} = require("../controllers/myordersController")


router.post("/fetch",fetchOrdersByPhone)


module.exports = router;