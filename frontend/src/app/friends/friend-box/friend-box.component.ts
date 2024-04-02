import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserTotalDataInterface } from 'src/app/interfaces/user-interface';

@Component({
  selector: 'app-friend-box',
  templateUrl: './friend-box.component.html',
  styleUrls: ['./friend-box.component.css']
})
export class FriendBoxComponent {
   @Input() friend!:UserTotalDataInterface
   @Output() signalForNavigation = new EventEmitter()

   navigateToProfile(){
     this.signalForNavigation.emit({
      navigate:"profile",
      id:this.friend._id
     })
   }
   navigateToChat(){
    this.signalForNavigation.emit({
      navigate:"chat",
      id:this.friend._id
    })
   }
}
