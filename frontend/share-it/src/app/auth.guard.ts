import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userInfoService:UserInfoService) {}

  canActivate(): boolean {
    if(this.userInfoService.getIsLogged()){
       return true;
    }
    else{
      this.router.navigate(["profile"])
      return false;
    }
  }
}