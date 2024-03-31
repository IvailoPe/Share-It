const router = require("express").Router()
const chatServices = require("../services/chat-services.js")

router.get("/",async (req,res) => {
   let senderId = req.query.senderId;
   let receiverId = req.query.receiverId;
   const chat = await chatServices.getSharedChat(senderId,receiverId)
   res.json(chat)
})

module.exports = router