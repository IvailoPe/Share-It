import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { postInterface } from 'src/app/interfaces/post-interface';
import { PostInfoService } from 'src/app/post-info.service';
import { UserInfoService } from 'src/app/user-info.service';

@Component({
  selector: 'app-post-wrapper',
  templateUrl: './post-wrapper.component.html',
  styleUrls: ['./post-wrapper.component.css']
})
export class PostWrapperComponent implements OnInit{
  postId!:string
  post!:postInterface 

  constructor(private route: ActivatedRoute, private postInfoService:PostInfoService, public userInfoService:UserInfoService){}


  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get("id") as string;
    this.postInfoService.getSinglePost(this.postId).subscribe((data) => {
      data.isOwner = true;
      this.post = data;
    })
  }
}
