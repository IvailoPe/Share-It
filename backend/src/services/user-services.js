const User = require("../models/User.js")
const Chat = require("../models/Chat.js")
const Notification = require("../models/Notification.js")
const bcrypt = require("bcrypt")

async function getUserTotalData(id) {
  return await User.findById(id);
}

async function updateUserData(data, id) {
  return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
}

async function validatePasswords(passwordToValidate, id) {
  const user = await User.findById(id);
  let isPassCorrect = bcrypt.compareSync(passwordToValidate, user.password.toString());
  return isPassCorrect
}

async function updatePassword(newPassword, id) {
  const user = await User.findById(id);
  user.password = newPassword;
  await user.save()
  return user
}

async function sendFriendRequest(receiverId, senderId) {
  const receiver = await User.findById(receiverId);
  const notificationsOfReceiver = await Notification.findOne({ owner: receiverId });
  notificationsOfReceiver.friendRequests.push(senderId);
  receiver.friendRequests.push(senderId);
  await notificationsOfReceiver.save()
  await receiver.save();
}

async function getAllUserFriends(userId) {
  const friends = await User.findById(userId).populate("friendList");
  return friends.friendList.toObject();
}

async function reactOnFriendRequest(receiverId, senderId, decision) {
  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId)
  const notifications = await Notification.findOne({ owner: senderId });

  if (decision === "accept") {
    sender.friendRequests.splice(sender.friendRequests.indexOf(receiverId), 1)
    notifications.friendRequests.splice(notifications.friendRequests.indexOf(receiverId), 1)
    await Chat.create({
      createdAt: new Date(),
      owners: [receiverId, senderId],
    })
    sender.friendList.push(receiverId);
    receiver.friendList.push(senderId)
  }
  else {
    notifications.friendRequests.splice(notifications.friendRequests.indexOf(receiverId), 1)
    sender.friendRequests.splice(sender.friendRequests.indexOf(receiverId), 1)
  }
  await sender.save();
  await receiver.save()
  await notifications.save()
}

async function deleteNotification(userId, notificationId, type) {
  const notification = await Notification.findOne({ owner: userId })
  if (type === "comment") {
    notification.comments.splice(notification.comments.indexOf(notificationId), 1)
  }
  else {
    notification.liked.splice(notification.liked.indexOf(notificationId), 1)
  }
  await notification.save();
}



module.exports = {
  getUserTotalData,
  updateUserData,
  validatePasswords,
  updatePassword,
  sendFriendRequest,
  getAllUserFriends,
  reactOnFriendRequest,
  deleteNotification
}