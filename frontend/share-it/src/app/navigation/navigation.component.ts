import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../user-info.service';
import { AuthService } from '../auth.service';
import { UserTotalDataInterface } from '../interfaces/user-interface';
import { ProfileWrapperComponent } from '../profile/profile-wrapper/profile-wrapper.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent{
  userData!:UserTotalDataInterface

  constructor(private router:Router, public userInfoService:UserInfoService, private authService:AuthService, private cdRef: ChangeDetectorRef){}

  navigate(route:string){
    this.router.navigate([route])
  }

  logOutUser(){
    this.authService.logOutUser()
    if(this.router.url.includes("profile")){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/profile'])
      });
      return
    }
    this.router.navigate(["profile"])
  }
}
