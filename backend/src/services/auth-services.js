const User = require("../models/User.js")
const Notification = require("../models/Notification.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

async function registerUser(data) {
    if (await User.findOne({ username: data.username })) {
        throw new Error("User exists")
    }

    const user = await User.create({
        username: data.username,
        nickname: data.username,
        password: data.password,
        followers: 0,
        friendRequests:[],
        likes:0,
        profilePicture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        profileBanner:""
    })

    await Notification.create({
        owner:user._id.toString(),
        friendRequests:[],
        liked:[],
        comments:[]
    }) 

    const token = jwt.sign({
        _id: user._id.toString(),
        username:user.username.toString(),
        nickname:user.nickname.toString()
    }, "secret")

    

    return {
        token,
        _id:user._id.toString(),
        nickname:user.nickname.toString()
    }
}

async function logUser(data) {
    const user = await User.findOne({username:data.username})

    if (!user) {
        throw new Error("User doesnt exists")
    }
    
    let isOriginal = bcrypt.compareSync(data.password,user.password.toString())

    if(!isOriginal){
        throw new Error("Passwords dont match")  
    }

    const token = jwt.sign({
        _id: user._id.toString(),
        username:user.username.toString(),
        nickname:user.nickname.toString()
    }, "secret")

    return {
        token,
        _id:user._id.toString(),
        nickname:user.nickname.toString()
    }
}



module.exports = {
    registerUser,
    logUser
}