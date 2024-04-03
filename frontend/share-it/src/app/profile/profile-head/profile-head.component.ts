import { Component, Input, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/user-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTotalDataInterface } from 'src/app/interfaces/user-interface';

@Component({
  selector: 'app-profile-head',
  templateUrl: './profile-head.component.html',
  styleUrls: ['./profile-head.component.css'],
})
export class ProfileHeadComponent implements OnInit {
  @Input() isLogged!: boolean;
  isOwner: boolean = true;
  userData!: UserTotalDataInterface | null;
  isEditMode: boolean = false;
  errorPass!: string;
  errorUsername!: string;
  isFriend!:boolean | null
  isInRequests!:boolean
  constructor(
    public userInfoService: UserInfoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    if (localStorage.getItem('token') || !this.router.url.endsWith("profile")) {
      
      if (this.router.url.endsWith('profile')) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }

      let userId

      if(this.isOwner){
        userId = JSON.parse(localStorage.getItem('token') as string);
      }
      else{
        userId = {_id:this.route.snapshot.paramMap.get("id")}
      }

      this.userInfoService.getUserTotalData(userId._id).subscribe((data) => {
        this.userData = data;
        if(!this.isOwner){
          if(this.userData.friendList.includes(this.userInfoService.getLoggedUserId())){
            this.isFriend = true;
          }
          else{
            if(this.userData.friendRequests.includes(this.userInfoService.getLoggedUserId())){
              this.isFriend = null;
            }
            else{
              this.isFriend = false;
              this.userInfoService.getUserTotalData(this.userInfoService.getLoggedUserId())
              .subscribe((data) => {
                if(data.friendRequests.includes(this.route.snapshot.paramMap.get("id") as string)){
                   this.isInRequests = true;
                }
                else{
                   this.isInRequests = false;
                }
                console.log(1);
                
                this.isFriend = false;
              })
            }
          }
        }
      });
    }
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
  }

  refreshProfile() {
    this.isOwner = true;
    const userId = JSON.parse(localStorage.getItem('token') as string);
    this.userInfoService.getUserTotalData(userId._id).subscribe((data) => {
      this.userData = data;
    });
  }

  resetState() {
    this.isEditMode = false;
    this.userData = null;
    this.errorPass = '';
    this.errorUsername = '';
  }

  editProfileData(
    userCredentials1: string,
    userCredentials2: string,
    usernameOrPassword?: boolean
  ) {
    if (usernameOrPassword) {
      this.userInfoService
        .updateMajorUserUsername(
          userCredentials1,
          userCredentials2,
          this.userData?._id as string
        )
        .subscribe((data) => {
          if (data.error) {
            this.errorUsername = data.error;
            return;
          }
          localStorage.removeItem('token');
          this.resetState();
        });
    } else {
      this.userInfoService
        .updateMajorUserPassowrd(
          userCredentials1,
          userCredentials2,
          this.userData?._id as string
        )
        .subscribe((data) => {
          if (data.error) {
            this.errorPass = data.error;
            return;
          }
          localStorage.removeItem('token');
          this.resetState();
        });
    }
  }

  editProfile(nickname: string, picture: string, banner: string) {
    console.log(1);
    this.userInfoService
      .updateUserData(nickname, picture, banner, this.userData?._id as string)
      .subscribe((data) => {
        this.userData = data;
        this.isEditMode = false;
      });
    /* localStorage.removeItem("token")
    this.resetState()
    this.router.navigate(["profile"])*/
  }

  addFriend(){
   this.isFriend = null;
   this.userInfoService.sendFriendRequest(this.route.snapshot.paramMap.get("id") as string,this.userInfoService.getLoggedUserId()).subscribe(()=>{});
  }

  removeFriend(){
    this.isFriend = false;
    this.isInRequests = false;
    this.userInfoService.removeFriend(this.userInfoService.getLoggedUserId(),this.route.snapshot.paramMap.get("id") as string).subscribe(() => {})
  }
}
