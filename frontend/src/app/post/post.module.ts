import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostWrapperComponent } from './post-wrapper/post-wrapper.component';
import { FeatureModuleRoutingModule } from './post-module-routes';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PostWrapperComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeatureModuleRoutingModule
  ]
})
export class PostModule { }
