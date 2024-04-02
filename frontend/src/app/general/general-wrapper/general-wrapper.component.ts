import { Component, OnInit } from '@angular/core';
import { postInterface } from 'src/app/interfaces/post-interface';
import { PostInfoService } from 'src/app/post-info.service';

@Component({
  selector: 'app-general-wrapper',
  templateUrl: './general-wrapper.component.html',
  styleUrls: ['./general-wrapper.component.css'],
})
export class GeneralWrapperComponent implements OnInit {
  posts!: postInterface[];
  isUserLogged: boolean = false;
  userId: string = '';

  constructor(private postInfoService: PostInfoService) {}
  ngOnInit(): void {
    if (
      localStorage.getItem('token') &&
      JSON.parse(localStorage.getItem('token') as string)._id
    ) {
      this.userId = JSON.parse(localStorage.getItem('token') as string)._id;
      this.isUserLogged = true;
    }
    this.postInfoService.getAllPosts(this.userId).subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  likedPostResponse(id: string) {
    this.postInfoService.likePost(id, this.userId).subscribe(() => {});
  }

  reactOnFilter(criteria: string) {
    if (criteria === 'likes') {
      this.posts.sort((a, b) => {
        return b.totalLikes - a.totalLikes;
      });
    } else {
      this.posts.sort((a, b) => {
        console.log((new Date(a.createdAt).getTime()));
        console.log((new Date(b.createdAt).getTime()));
        
        return (new Date(a.createdAt).getTime()) - (new Date(b.createdAt).getTime());
      });
    }
  }
}
