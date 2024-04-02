import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../user-info.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private router:Router, public userInfoService:UserInfoService, private authService:AuthService){}

  navigate(route:string){
    this.router.navigate([route])
  }

  logOutUser(){
    this.authService.logOutUser()
    this.router.navigate(["profile"])
  }
}
