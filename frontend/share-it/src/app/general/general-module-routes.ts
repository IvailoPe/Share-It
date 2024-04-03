import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralWrapperComponent } from './general-wrapper/general-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralWrapperComponent, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureModuleRoutingModule { }