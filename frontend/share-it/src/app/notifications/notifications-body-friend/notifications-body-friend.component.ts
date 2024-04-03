import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserTotalDataInterface } from '../../interfaces/user-interface';
import { UserInfoService } from "../../user-info.service";

@Component({
  selector: 'app-notifications-body-friend',
  templateUrl: './notifications-body-friend.component.html',
  styleUrls: ['./notifications-body-friend.component.css'],
})
export class NotificationsBodyFriendComponent {
  @Input() sender!:UserTotalDataInterface
  @Output() destroyElement = new EventEmitter()

  constructor(private userInfoService:UserInfoService){}

  reactOnFriendRequest(reaction: string) {
    this.userInfoService.reactOnFriendRequest(this.sender._id,this.userInfoService.getLoggedUserId(),reaction)
    .subscribe(() => {
      this.destroyElement.emit(this.sender._id)
    })
  }
}
