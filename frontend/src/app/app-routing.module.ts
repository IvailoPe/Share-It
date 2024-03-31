import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"profile",loadChildren: () => import("./profile/profile.module").then((m) => m.ProfileModule)},
  {path:"",loadChildren:() => import("./general/general.module").then((m) => m.GeneralModule)},
  {path:"friends",loadChildren:() => import("./friends/friends.module").then((m) => m.FriendsModule)},
  {path:"chat",loadChildren:() => import("./chat/chat.module").then((m) => m.ChatModule)},
  {path:"notifications",loadChildren:() => import("./notifications/notifications.module").then((m) => m.NotificationsModule)},
  {path:"post",loadChildren:() => import("./post/post.module").then((m) => m.PostModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
