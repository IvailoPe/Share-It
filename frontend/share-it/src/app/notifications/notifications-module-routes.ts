import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsWrapperComponent } from './notifications-wrapper/notifications-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsWrapperComponent, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureModuleRoutingModule { }