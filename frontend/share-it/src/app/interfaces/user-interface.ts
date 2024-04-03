export interface UserInterface{
  error ?: string,
  token ?: string,
  nickname ?: string,
  _id ?: string
}

export interface UserTotalDataInterface{
  "_id": string,
  "nickname": string,
  "username": string,
  "password": string,
  "followers": number,
  "likes": number,
  "profilePicture": string,
  "profileBanner": string,
  "friendRequests": [string],
  friendList:[string],
  "__v": number,
  error?:string
}