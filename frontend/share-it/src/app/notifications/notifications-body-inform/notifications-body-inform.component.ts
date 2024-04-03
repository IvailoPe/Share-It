import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { notificationSubModel } from 'src/app/interfaces/util-interfaces';
import { UserInfoService } from 'src/app/user-info.service';

@Component({
  selector: 'app-notifications-body-inform',
  templateUrl: './notifications-body-inform.component.html',
  styleUrls: ['./notifications-body-inform.component.css']
})
export class NotificationsBodyInformComponent {
  @Input() notification!:notificationSubModel
  @Output() destroyElement = new EventEmitter()

  constructor(private userInfoService:UserInfoService, private router:Router){}

  reactOnRemove(){
    this.userInfoService.deleteNotification(this.userInfoService.getLoggedUserId(),this.notification._id,this.notification.notification as string)
    .subscribe(() => {
      this.destroyElement.emit({
        id:this.notification._id,
        type:this.notification.notification
      })
    })
  }

  navigateToPost(postId:string){
    this.reactOnRemove()
    this.router.navigate([`post/${postId}`])
  }
}
