import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralWrapperComponent } from './general-wrapper/general-wrapper.component';
import { FeatureModuleRoutingModule } from './general-module-routes';
import { TopFilterComponent } from './top-filter/top-filter.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    GeneralWrapperComponent,
    TopFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeatureModuleRoutingModule,
  ]
})
export class GeneralModule { }
