const {Router} = require("express");
const { Orders } = require("../db");
const router = Router();

router.get("/southern",async(req,res)=>{
    const list = await Orders.find({outlet : "southern"});
    res.json(list);
})

router.get("/kathi",async(req,res)=>{
    const list = await Orders.find({outlet : "kathi"});
    res.json(list);
})


router.get("/quench",async(req,res)=>{
    const list = await Orders.find({outlet : "quench"});
    res.json(list);
})



module.exports = router;