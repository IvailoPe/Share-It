import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileWrapperComponent } from './profile-wrapper/profile-wrapper.component';
import { FeatureModuleRoutingModule } from './profile-module-routes';
import { ProfileHeadComponent } from './profile-head/profile-head.component';
import { ProfileBodyComponent } from './profile-body/profile-body.component';
import { AuthtenticationWindowComponent } from './authtentication-window/authtentication-window.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { SamePasswordsDirective } from './same-passwords.directive';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProfileWrapperComponent,
    ProfileHeadComponent,
    ProfileBodyComponent,
    AuthtenticationWindowComponent,
    LoginComponent,
    RegisterComponent,
    SamePasswordsDirective
  ],
  imports: [
    CommonModule,
    FeatureModuleRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ProfileModule { }
