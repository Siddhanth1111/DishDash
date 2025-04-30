const {Router} = require("express");
const {Kathi,Southern,Quench} = require("../db")
const {
    getKathiOrders,
    getSouthernOrders,
    getQuenchOrders,
} = require("../controllers/menuController");

const router = Router();

router.get("/southern",getSouthernOrders)
router.get("/kathi",getKathiOrders)
router.get("/quench",getQuenchOrders)

module.exports = router;