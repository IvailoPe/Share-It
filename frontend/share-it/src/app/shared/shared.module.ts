import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharePostComponent } from './share-post/share-post.component';
import { FormsModule } from '@angular/forms';
import { SharePostCommentComponent } from './share-post-comment/share-post-comment.component';



@NgModule({
  declarations: [
    SharePostComponent,
    SharePostCommentComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    SharePostComponent
  ]
})
export class SharedModule { }
