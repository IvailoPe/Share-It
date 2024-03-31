const Post = require("../models/Post.js");
const User = require("../models/User.js");
const Notification = require("../models/Notification.js")

async function createNewPost(data) {
   return await Post.create({
      body: data.body,
      title: data.title,
      owner: data.id,
      totalLikes: 0
   })
}

async function getAllUserPosts(id) {
   return await Post.find({ owner: id }).populate("owner")
}

async function deletePost(id) {
   return await Post.findByIdAndDelete(id)
}

async function getAllPosts(exceptUserId) {
   if (exceptUserId) {
      return await Post.find({ owner: { $ne: exceptUserId } }).populate("owner");
   }
   else {
      return await Post.find({}).populate("owner");
   }
}

async function likePost(postId, userId) {
   const post = await Post.findById(postId);
   const user = await User.findById(post.owner.toString())
   const notification = await Notification.findOne({owner:post.owner.toString()})
   if (post.likes.includes(userId)) {
      post.likes.splice(post.likes.indexOf(userId), 1);
      for (let index = 0; index < notification.liked.length; index++) {
         if(notification.liked[index].personId == userId){
            notification.liked.splice(index,1)
         }
      }
      post.totalLikes--
      user.likes--
   }
   else {
      post.likes.push(userId);
      notification.liked.push({
         personId:userId,
         postId:postId,
      })
      post.totalLikes++;
      user.likes++
   }
   await user.save()
   await post.save()
   await notification.save()
}

async function postComment(postId,userId,comment){
   const post = await Post.findById(postId);
   const user = await User.findById(userId);
   const notification = await Notification.findOne({owner:post.owner.toString()})

   notification.comments.push({
      postId:post._id,
      personId:userId
   })
   post.comments.push({
      body:comment,
      owner:userId,
   })
   await post.save();
   await notification.save();

   return {
      owner:user.toJSON(),
      body:comment
   }
}

async function getAllPostComments(postId){
   const post = await Post.findById(postId).populate("comments.owner");
   return post.comments.toObject()
}

async function likeComment(postId,commentId,userId){
  const post = await Post.findById(postId)
  for (let index = 0; index < post.comments.length; index++) {
    console.log(post.comments[index]);
    if(post.comments[index]._id.toString() === commentId){
      if(post.comments[index].likes.includes(userId)){
         post.comments[index].likes.splice(post.comments[index].likes.indexOf(userId),1)
      }
      else{
         post.comments[index].likes.push(userId)
      }
      break;
    }
  }
  await post.save()
}

async function getSinglePost(postId){
   const post = await Post.findById(postId).populate("owner");
   return post.toObject()
}

module.exports = {
   createNewPost,
   getAllUserPosts,
   deletePost,
   getAllPosts,
   likePost,
   postComment,
   getAllPostComments,
   likeComment,
   getSinglePost
}