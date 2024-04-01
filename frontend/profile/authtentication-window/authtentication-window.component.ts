import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-authtentication-window',
  templateUrl: './authtentication-window.component.html',
  styleUrls: ['./authtentication-window.component.css'],
})
export class AuthtenticationWindowComponent {
  public isTryingToLogin: boolean = true;
  public isTryingToRegister: boolean = false;
  @Output() refreshUser = new EventEmitter();
  toogleOption(option: string): void {
    if (option === 'login') {
      this.isTryingToLogin = true;
      this.isTryingToRegister = false;
      return
    }
    this.isTryingToLogin = false;
    this.isTryingToRegister = true;
  }

  refreshUserUp() {
    this.refreshUser.emit();
  }
}
