import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsWrapperComponent } from './friends-wrapper/friends-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: FriendsWrapperComponent, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureModuleRoutingModule { }