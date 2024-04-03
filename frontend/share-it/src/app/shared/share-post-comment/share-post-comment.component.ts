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
  @Output() respondOnLike = new EventEmitter()

  constructor(private postInfoService: PostInfoService) {}

  likeComment(){
    this.postInfoService.likePostComment(this.postId,this.comment._id,this.userId).subscribe((data) => {
      if(data.error){
        this.deleteCommentEvent.emit(this.comment._id) 
        return
      }
      this.isLiked = !this.isLiked
      this.respondOnLike.emit()
    })
  }

  deleteComment(){
     this.postInfoService.deleteComment(this.postId,this.comment._id).subscribe(() => {
      this.deleteCommentEvent.emit(this.comment._id)
     })
  }

}
