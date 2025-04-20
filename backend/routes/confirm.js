const {Router} = require("express");
const { Orders } = require("../db");
const router = Router();


router.post("/",async(req,res)=>{
    const {outlet,cart,userPhone,totalPrice} = req.body;

    await Orders.create({
        outlet,
        userPhone,
        orders : cart,
        totalPrice
    })

    res.status(200).json({
        msg : "Order placed successfully"
    })

})



module.exports = router;
