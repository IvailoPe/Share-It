import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"profile",loadChildren: () => import("./profile/profile.module").then((m) => m.ProfileModule),title:"Profile"},
  {path:"",loadChildren:() => import("./general/general.module").then((m) => m.GeneralModule), title:"Home"},
  {path:"friends", canActivate:[AuthGuard],loadChildren:() => import("./friends/friends.module").then((m) => m.FriendsModule),title:"Friends"},
  {path:"chat",canActivate:[AuthGuard],loadChildren:() => import("./chat/chat.module").then((m) => m.ChatModule),title:"Chat"},
  {path:"notifications",canActivate:[AuthGuard],loadChildren:() => import("./notifications/notifications.module").then((m) => m.NotificationsModule),title:"Notifications"},
  {path:"post",canActivate:[AuthGuard],loadChildren:() => import("./post/post.module").then((m) => m.PostModule),title:"Post"},
  { path: '**', redirectTo: '/profile', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
