import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsWrapperComponent } from './friends-wrapper/friends-wrapper.component';
import { FeatureModuleRoutingModule } from './friends-module-routes';
import { FriendBoxComponent } from './friend-box/friend-box.component';



@NgModule({
  declarations: [
    FriendsWrapperComponent,
    FriendBoxComponent
  ],
  imports: [
    CommonModule,
    FeatureModuleRoutingModule
  ]
})
export class FriendsModule { }
