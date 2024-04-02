import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsWrapperComponent } from './notifications-wrapper/notifications-wrapper.component';
import { FeatureModuleRoutingModule } from './notifications-module-routes';
import { NotificationsHeadComponent } from './notifications-head/notifications-head.component';
import { NotificationsBodyFriendComponent } from './notifications-body-friend/notifications-body-friend.component';
import { NotificationsBodyInformComponent } from './notifications-body-inform/notifications-body-inform.component';



@NgModule({
  declarations: [
    NotificationsWrapperComponent,
    NotificationsHeadComponent,
    NotificationsBodyFriendComponent,
    NotificationsBodyInformComponent
  ],
  imports: [
    CommonModule,
    FeatureModuleRoutingModule
  ]
})
export class NotificationsModule { }
