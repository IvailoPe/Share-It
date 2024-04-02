import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostWrapperComponent } from './post-wrapper/post-wrapper.component';

const routes: Routes = [
  {
    path: ':id',
    component: PostWrapperComponent, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureModuleRoutingModule { }