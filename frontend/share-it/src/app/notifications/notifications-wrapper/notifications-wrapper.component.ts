import { Component, OnInit } from '@angular/core';
import { notificationModel } from 'src/app/interfaces/util-interfaces';
import { UserInfoService } from 'src/app/user-info.service';

@Component({
  selector: 'app-notifications-wrapper',
  templateUrl: './notifications-wrapper.component.html',
  styleUrls: ['./notifications-wrapper.component.css'],
})
export class NotificationsWrapperComponent implements OnInit {
  userNotifications!: notificationModel;

  constructor(private userInfoService: UserInfoService) {}

  ngOnInit(): void {
    this.userInfoService
      .getUserNotifications(this.userInfoService.getLoggedUserId())
      .subscribe((data) => {
        for (let index = 0; index < data.comments.length; index++) {
          data.comments[index].notification = 'comment';
        }
        for (let index = 0; index < data.liked.length; index++) {
          data.liked[index].notification = 'like';
        }
        this.userNotifications = data;
      });
  }

  reactOnDestroy(idToDelete: string) {
    for (
      let index = 0;
      index < this.userNotifications.friendRequests.length;
      index++
    ) {
      if (this.userNotifications.friendRequests[index]._id === idToDelete) {
        this.userNotifications.friendRequests.splice(index, 1);
      }
    }
  }

  reactOnDestroyOnNotification(idToDelete: { id: string; type: string }) {
    if (idToDelete.type === 'comment') {
      for (
        let index = 0;
        index < this.userNotifications.comments.length;
        index++
      ) {
        if (this.userNotifications.comments[index]._id === idToDelete.id) {
          this.userNotifications.comments.splice(index, 1);
        }
      }
    } else {
      for (
        let index = 0;
        index < this.userNotifications.liked.length;
        index++
      ) {
        if (this.userNotifications.liked[index]._id === idToDelete.id) {
          this.userNotifications.liked.splice(index, 1);
        }
      }
    }
  }
}
