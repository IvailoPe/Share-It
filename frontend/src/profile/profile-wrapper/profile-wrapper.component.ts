import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ProfileHeadComponent } from '../profile-head/profile-head.component';
import { ProfileBodyComponent } from '../profile-body/profile-body.component';

@Component({
  selector: 'app-profile-wrapper',
  templateUrl: './profile-wrapper.component.html',
  styleUrls: ['./profile-wrapper.component.css'],
})
export class ProfileWrapperComponent{
  @ViewChild(ProfileHeadComponent) profileHeadComponent!:ProfileHeadComponent
  @ViewChild(ProfileBodyComponent) profileBodyComponent!:ProfileBodyComponent
  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  refreshUser(){
     this.profileHeadComponent.refreshProfile();
     this.profileBodyComponent.refreshProfile()
  }

}
