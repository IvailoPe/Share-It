const Notification = require("../models/Notification.js")

async function getAllNotifications(userId){
   const notifications = await Notification.findOne({owner:userId}).populate("friendRequests").populate("liked.personId").populate("comments.personId");

   return {
    friendRequests:notifications.friendRequests,
    liked:notifications.liked,
    comments:notifications.comments,
   }
}

module.exports = {
    getAllNotifications
}