const router = require("express").Router()
const authServices = require("../services/auth-services.js")


router.post("/register",async (req,res) => {
    const data = req.body;
    let returnData = null;
    try{
        returnData = await authServices.registerUser(data);
    }
    catch(err){
        res.json({error:"User exists"})
        return
    }
    res.json(returnData)
})

router.post("/login", async (req,res) => {
    const data = req.body;
    let returnData = null;
    try{
        returnData = await authServices.logUser(data)
    }
    catch(err){
        res.json({error:err.message})
        return
    }
    res.json(returnData)
})

module.exports = router;