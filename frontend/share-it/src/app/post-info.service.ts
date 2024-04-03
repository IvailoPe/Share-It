import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './environment-vars';
import { postInterface, commentInterface } from './interfaces/post-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostInfoService {
  constructor(private http:HttpClient) { }

  createNewPost(title:string,body:string,id:string){
    return this.http.post<postInterface>(API + "post/create",{
      title,
      body,
      id
    })
  }

  getAllUserPosts(id:string) : Observable<postInterface[]>{
    return this.http.get<postInterface[]>(API + "post/" + id)
  }

  deleteUserPost(id:string){
    return this.http.delete(API + "post/" + id)
  }

  getAllPosts(exceptUserId?:string){
    if(exceptUserId){
      const queryParams = new URLSearchParams({exceptUserId:exceptUserId})      
      return this.http.get<postInterface[]>(API + "post?" + queryParams.toString())
    }
    return this.http.get<postInterface[]>(API + "post")
  }

  likePost(postId:string,userId:string){
    return this.http.post<{error?:string}>(API + "post/like/" + postId,{
       userId
    })
  }

  postPostComment(postId:string,userId:string,comment:string){
    return this.http.post<commentInterface>(API + "post/comment/" + postId,{
      userId,
      comment
   })
  }

  getAllPostComments(postId:string){
    return this.http.get<commentInterface[]>(API + "post/comment/" + postId)
  }

  likePostComment(postId:string,commentId:string,userId:string){
    return this.http.post<{error:string}>(API + "post/comment/like/" + postId,{
      userId,
      commentId
    })
  }

  getSinglePost(postId:string){
    return this.http.get<postInterface>(API + "post/singlepost/" + postId)
  }

  updatePost(postId:string,title:string,body:string){
    return this.http.put(API + "post/update", {
      postId,
      title,
      body
    })
  }

  deleteComment(postId:string,commentId:string){
    return this.http.post(API + "post/delete/comment",{
      postId,
      commentId
    })
  }



}
