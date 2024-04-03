import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { chatModel } from 'src/app/interfaces/util-interfaces';
import { UserInfoService } from 'src/app/user-info.service';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.css']
})
export class ChatBodyComponent implements OnChanges, OnInit, OnDestroy{
  @Input() receiverId!:string;
  loggedUserId!: string;
  sharedChat!:chatModel[]
  messageSenderAndReceiverSubject = webSocket("ws://localhost:3000/echo")

  constructor(private userInfoService: UserInfoService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.loggedUserId = this.userInfoService.getLoggedUserId()
    this.userInfoService.getSharedChat(this.loggedUserId,this.receiverId).subscribe((data) => {
      this.sharedChat = data
    });
  }

  ngOnInit(): void {
    this.messageSenderAndReceiverSubject.subscribe((data) => {
     this.sharedChat.push({
      message:(data as chatModel).content as string,
      messageOwner:this.receiverId
     })
    })
    this.messageSenderAndReceiverSubject.next({
      connect:"register",
      userId:this.loggedUserId,
      userId2:this.receiverId
    })
  }

  ngOnDestroy(): void {
    this.messageSenderAndReceiverSubject.complete()
  }

  sendMessage(message:string, messageForm:NgForm){
    messageForm.reset()
    this.messageSenderAndReceiverSubject.next({
      connect:"post",
      content:message,
    })
    this.sharedChat.push({
      message:message,
      messageOwner:this.loggedUserId
    } as chatModel)
  }
}
