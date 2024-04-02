import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { commentInterface, postInterface } from 'src/app/interfaces/post-interface';
import { PostInfoService } from 'src/app/post-info.service';

@Component({
  selector: 'app-share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css'],
})
export class SharePostComponent implements OnChanges, OnInit{
  @Input() post!: postInterface;
  @Input() isLogged?: boolean;
  @Input() isLiked!:boolean;
  @Input() userId!:string
  @Output() postDeleted = new EventEmitter();
  @Output() likedPost = new EventEmitter();

  postId!: string;
  showComments: boolean = false;
  comments!:commentInterface[]
  isEditMode:boolean = false;

  showEmojies: boolean = false;

  constructor(private postInfoService: PostInfoService, private router:Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
   this.postInfoService.getAllPostComments(this.postId).subscribe((data) => {
    this.comments = data;
   })
   console.log(this.router.url);
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.postId = this.post._id;
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  toggleEmojies() {
    this.showEmojies = !this.showEmojies;
  }

  deletePost() {
    this.postInfoService.deleteUserPost(this.postId).subscribe(() => {
      if(this.router.url.includes("post")){
        this.router.navigate(["profile"])
      }
      else{
        this.postDeleted.emit(this.postId);
      }
    });
  }

  likePost() {
    if(this.isLiked){
      this.isLiked = false;
      this.post.totalLikes--
    }
    else{
      this.isLiked = true
      this.post.totalLikes++
    }
    this.likedPost.emit(this.postId);
  }

  postComment(form:NgForm, comment:string){
    form.reset();
    this.postInfoService.postPostComment(this.postId,this.userId,comment).subscribe((data1) => {
      this.postInfoService.getSinglePost(this.postId).subscribe((data2) => {
        console.log(data2);
        this.post = data2;
        this.comments.push(data1)
      })
    })
  }

  getCurrentRoute(){
    let url = this.router.url;
    if(url === "/profile"){
      return false;
    } 
    return true
  }

  toggleEditMode(){
    this.isEditMode = !this.isEditMode
  }

  navigateToUser(){
    this.router.navigate([`profile/${this.post.owner._id}`])
  }

  editPost(Form:NgForm,title:string,body:string){
    this.isEditMode = false;
    Form.reset();
    console.log(1);
    
    this.postInfoService.updatePost(this.postId,title,body).subscribe(() => {
      this.post.title = title,
      this.post.body = body
    })    
  }

  reactOnCommentDelete(commentId:string){
    for (let index = 0; index < this.comments.length; index++) {
      if(this.comments[index]._id === commentId){
        this.comments.splice(index,1)
      }
    }
    for (let index = 0; index < this.post.comments.length; index++) {
      if(this.post.comments[index]["_id"] === commentId){
        this.post.comments.splice(index,1)
      }
    }
  }
}
