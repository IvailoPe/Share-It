const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    friendRequests:[{
        type: mongoose.Types.ObjectId,
        ref:"User"
    }],
    liked:[{
        postId:String,
        personId:{
            type: mongoose.Types.ObjectId,
            ref:"User"
        }
    }],
    comments:[{
        postId:String,
        personId:{
            type: mongoose.Types.ObjectId,
            ref:"User"
        }
    }]
},
{
    timestamps:true
})

const Notification = mongoose.model("Notification",notificationSchema);

module.exports = Notification