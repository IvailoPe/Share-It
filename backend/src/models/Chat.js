const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    owners:[{
        type: mongoose.Types.ObjectId,
        ref:"User"
    }],
    chat:[{
        message:String,
        messageOwner:{
            type: mongoose.Types.ObjectId,
            ref:"User"
        },
        date:Date
    }]
},
{
    timestamps:true
})

const Chat = mongoose.model("Chat",chatSchema);

module.exports = Chat