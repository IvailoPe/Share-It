const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    likes:[{
        type: mongoose.Types.ObjectId,
        ref:"User"
    }],
    comments:[{
       body:String,
       likes:[{
        type: mongoose.Types.ObjectId,
        ref:"User"
       }],
       owner:{
        type: mongoose.Types.ObjectId,
        ref:"User"
       }
    }],
    totalLikes:{
        type:Number,
        required:true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
},
{
    timestamps:true
})

const Post = mongoose.model("Post",postSchema);

module.exports = Post