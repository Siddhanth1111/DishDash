const {Router} = require("express");
const {Kathi,Southern,Quench} = require("../db")

const router = Router();

router.get("/southern",async(req,res)=>{
    let data = await Southern.find({});
    res.json(data);
})


router.get("/kathi",async(req,res)=>{
    let data = await Kathi.find({});
    res.json(data);
})


router.get("/quench",async(req,res)=>{
    let data = await Quench.find({});
    res.json(data);
})

module.exports = router;