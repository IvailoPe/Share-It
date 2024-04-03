import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { postInterface } from 'src/app/interfaces/post-interface';
import { PostInfoService } from 'src/app/post-info.service';
import { UserInfoService } from 'src/app/user-info.service';

@Component({
  selector: 'app-profile-body',
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.css'],
})
export class ProfileBodyComponent implements OnInit {
  @Input() isLogged!: boolean;
  isOwner!:boolean

  userPosts: postInterface[] | null = null;

  constructor(private postInfoService: PostInfoService, private router: Router, private route: ActivatedRoute, public userInfoService:UserInfoService) {}
  ngOnInit(): void {
    
    if (localStorage.getItem('token') || !this.router.url.endsWith("profile")) {
  
      if (this.router.url.endsWith('profile')) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }

      let id

      if(this.isOwner){
        id = JSON.parse(localStorage.getItem('token') as string)._id;
      }
      else{
        id = this.route.snapshot.paramMap.get("id")
      }

      //let id = JSON.parse(localStorage.getItem('token') as string)._id;
      this.postInfoService.getAllUserPosts(id).subscribe((data) => {
        this.userPosts = data.map((data) => {
          data.isOwner = this.isOwner;
          return data;
        });
      });
    }
    else{
      this.isOwner = true;
    }
  }

  postShare(title: string, body: string, form:NgForm) {
    const id = JSON.parse(localStorage.getItem('token') as string)._id;
    this.postInfoService.createNewPost(title, body, id).subscribe((data) => {
      form.resetForm()
      data.isOwner = true;
      if (this.userPosts == null) {
        this.userPosts = [data];
      } else {
        this.userPosts.push(data);
      }
    });
  }

  reactOnPostDeletion(id: string) {
    let indexOfPost!: number;
    if (this.userPosts) {
      for (let index = 0; index < this.userPosts.length; index++) {
        if (this.userPosts[index]._id === id) {
          indexOfPost = index;
        }
      }
      this.userPosts?.splice(indexOfPost, 1);
    }
  }

  likedPostResponse(id: string) {
    this.postInfoService.likePost(id, this.userInfoService.getLoggedUserId()).subscribe((data) => {
      if(data.error){
        let id
  
        if(this.isOwner){
          id = JSON.parse(localStorage.getItem('token') as string)._id;
        }
        else{
          id = this.route.snapshot.paramMap.get("id")
        }
        
        this.postInfoService.getAllUserPosts(id).subscribe((data) => {
          this.userPosts = data.map((data) => {
            data.isOwner = this.isOwner;
            return data;
          });
        });
      }
    });
  }

  refreshProfile() {
    this.isOwner = true;
    const userId = JSON.parse(localStorage.getItem('token') as string)._id;
    this.postInfoService.getAllUserPosts(userId).subscribe((data) => {
      this.userPosts = data.map((data) => {
        data.isOwner = this.isOwner;
        return data;
      })
    })
  }
}
