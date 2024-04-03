import { Injectable } from '@angular/core';
import { TokenInterface } from './interfaces/token-interface';
import { UserTotalDataInterface } from './interfaces/user-interface';
import { HttpClient } from '@angular/common/http';
import { API } from './environment-vars';
import { chatModel, notificationModel } from './interfaces/util-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  
  
  constructor(private http:HttpClient) { }

  getLoggedUserId(){
    if(JSON.parse(localStorage.getItem("token") as string)){
      return JSON.parse(localStorage.getItem("token") as string)._id  
    }
    return null
  }

  getIsLogged(){
    if(JSON.parse(localStorage.getItem("token") as string)){
      return true
    }
    return false
  }
  
  getUserTotalData(id:string){
    return this.http.get<UserTotalDataInterface>(API + "user/" + id)
  }

  updateUserData(nickname:string,profilePicture:string,profileBanner:string,id:string){
    return this.http.post<UserTotalDataInterface>(API + "user/" + id,{
      nickname,
      profilePicture,
      profileBanner,
    }) 
  }

  updateMajorUserUsername(username:string,password:string, id:string){
    return this.http.post<UserTotalDataInterface>(API + "user/" + id,{
      username,
      password,
      usernameOrPassword:true
    }) 
  }

  updateMajorUserPassowrd(password:string,newPassword:string, id:string){
    return this.http.post<UserTotalDataInterface>(API + "user/" + id,{
      password,
      newPassword,
      usernameOrPassword:false
    }) 
  }

  sendFriendRequest(receiverId:string,senderId:string){
    return this.http.post(API + "user/friend/request",{
      receiverId,
      senderId
    })    
  }

  getAllUserFriends(userId:string){
    return this.http.get<UserTotalDataInterface[]>(API + "user/friend/" + userId)   
  }

  getSharedChat(senderId:string,receiverId:string){
    const queryParams = new URLSearchParams({senderId, receiverId})
    return this.http.get<chatModel[]>(API + "chat?" + queryParams.toString())   
  }

  getUserNotifications(userId:string){
    return this.http.get<notificationModel>(API + "notifications/" + userId)  
  }

  reactOnFriendRequest(receiverId:string,senderId:string,decision:string){
    return this.http.post(API + "user/request/react",{
      receiverId:receiverId,
      senderId:senderId,
      decision:decision
    })
  }

  deleteNotification(userId:string,notificationId:string, type:string){
    return this.http.post(API + "user/notification/react",{
      userId,
      notificationId,
      type
    })
  }

  removeFriend(userId:string,friendId:string){
    return this.http.post(API + "user/friend/remove/request", {
      userId,
      friendId
    })
  }

  getUserProfilePictrue(){
    this.http.get<UserTotalDataInterface>(API + "user/" + this.getLoggedUserId()).subscribe((data) => {
      return data.profilePicture
    })
  }
}
