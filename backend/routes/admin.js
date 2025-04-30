const {Router} = require("express");
const { Orders } = require("../db");
const router = Router();
const {getOrdersByOutlet} = require("../controllers/adminController")

router.get('/:outlet', getOrdersByOutlet);



module.exports = router;