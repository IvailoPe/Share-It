import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-filter',
  templateUrl: './top-filter.component.html',
  styleUrls: ['./top-filter.component.css']
})
export class TopFilterComponent {
   @Output() sendFilterSignal = new EventEmitter()

  filterByLikes(){
    this.sendFilterSignal.emit("likes")
  }
  filterByTime(){
    this.sendFilterSignal.emit("time")
  }
}
