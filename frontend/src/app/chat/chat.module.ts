import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWrapperComponent } from './chat-wrapper/chat-wrapper.component';
import { FeatureModuleRoutingModule } from './chat-module-routes';
import { ChatHeadComponent } from './chat-head/chat-head.component';
import { ChatBodyComponent } from './chat-body/chat-body.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatWrapperComponent,
    ChatHeadComponent,
    ChatBodyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeatureModuleRoutingModule
  ]
})
export class ChatModule { }
