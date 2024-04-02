import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserTotalDataInterface } from 'src/app/interfaces/user-interface';
import { UserInfoService } from 'src/app/user-info.service';

@Component({
  selector: 'app-chat-wrapper',
  templateUrl: './chat-wrapper.component.html',
  styleUrls: ['./chat-wrapper.component.css'],
})
export class ChatWrapperComponent implements OnInit {
  loggedUserId!: string;
  receiverUserId!:string
  receiverUserData!:UserTotalDataInterface
  

  constructor(private userInfoService: UserInfoService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loggedUserId = this.userInfoService.getLoggedUserId();
    this.receiverUserId = this.route.snapshot.paramMap.get("id") as string;

    this.userInfoService.getUserTotalData(this.receiverUserId).subscribe((data) => {
      this.receiverUserData = data;
    })
     

  }
}
