import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTotalDataInterface } from 'src/app/interfaces/user-interface';
import { friendSignalInterface } from 'src/app/interfaces/util-interfaces';
import { UserInfoService } from 'src/app/user-info.service';

@Component({
  selector: 'app-friends-wrapper',
  templateUrl: './friends-wrapper.component.html',
  styleUrls: ['./friends-wrapper.component.css']
})
export class FriendsWrapperComponent implements OnInit{
  userId!:string
  userFriends!:UserTotalDataInterface[]

  constructor(private userInfoService: UserInfoService,private router:Router){}
  
  ngOnInit(): void {
    this.userId = this.userInfoService.getLoggedUserId();
    this.userInfoService.getAllUserFriends(this.userId).subscribe((data) => {
      this.userFriends = data
    });
  }

  reactOnNavigation(navigation:friendSignalInterface){
    if(navigation.navigate === "profile"){
      this.router.navigate(["profile/" + navigation.id])
    }
    else{
      this.router.navigate(["chat/" + navigation.id])
    }
  }
}
