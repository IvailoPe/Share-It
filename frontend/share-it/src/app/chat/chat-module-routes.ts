import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatWrapperComponent } from './chat-wrapper/chat-wrapper.component';

const routes: Routes = [
  {
    path: ':id',
    component: ChatWrapperComponent, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureModuleRoutingModule { }