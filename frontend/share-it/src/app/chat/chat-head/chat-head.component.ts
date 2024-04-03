import { Component, Input, OnInit } from '@angular/core';
import { UserTotalDataInterface } from 'src/app/interfaces/user-interface';

@Component({
  selector: 'app-chat-head',
  templateUrl: './chat-head.component.html',
  styleUrls: ['./chat-head.component.css']
})
export class ChatHeadComponent{
  @Input() receiverId!:string;
  @Input() receiverData!:UserTotalDataInterface

}
