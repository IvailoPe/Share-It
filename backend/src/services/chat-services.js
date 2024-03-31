const Chat = require("../models/Chat.js")

async function getSharedChat(senderId,receiverId){
    const chat = await Chat.findOne({
        owners: { $all: [senderId, receiverId] }
    })
    return chat.chat
}

module.exports = {
    getSharedChat
}