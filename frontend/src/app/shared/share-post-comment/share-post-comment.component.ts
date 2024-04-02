import { Component, EventEmitter, Input, Output } from '@angular/core';
import { commentInterface } from 'src/app/interfaces/post-interface';
import { PostInfoService } from 'src/app/post-info.service';

@Component({
  selector: 'app-share-post-comment',
  templateUrl: './share-post-comment.component.html',
  styleUrls: ['./share-post-comment.component.css']
})
export class SharePostCommentComponent {
  @Input() comment!:commentInterface;
  @Input() isLogged!:boolean | undefined;
  @Input() userId!:string;
  @Input() postId!:string
  @Input() isLiked!:boolean
  @Output() deleteCommentEvent = new EventEmitter()

  constructor(private postInfoService: PostInfoService) {}

  likeComment(){
    console.log(this.postId);
    console.log(this.userId);

    this.postInfoService.likePostComment(this.postId,this.comment._id,this.userId).subscribe(() => {
      this.isLiked = !this.isLiked
    })
  }

  deleteComment(){
     this.postInfoService.deleteComment(this.postId,this.comment._id).subscribe(() => {
      this.deleteCommentEvent.emit(this.comment._id)
     })
  }

}
