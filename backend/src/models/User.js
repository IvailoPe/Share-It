const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    followers: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    profilePicture: {
        type: String
    },
    profileBanner: {
        type: String
    },
    friendRequests: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    friendList: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]
})

userSchema.post("validate", function (doc) {
    console.log("tuka sum hahaahhaha");
    doc.password = bcrypt.hashSync(doc.password, 10);
})

const User = mongoose.model("User", userSchema)

module.exports = User