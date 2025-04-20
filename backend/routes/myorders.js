const {Router} = require("express");
const { Orders } = require("../db");
const router = Router();


router.post("/fetch",async(req,res)=>{
    const {userPhone} = req.body;
    const data = await Orders.find({userPhone});
    res.json(data);
})


module.exports = router;