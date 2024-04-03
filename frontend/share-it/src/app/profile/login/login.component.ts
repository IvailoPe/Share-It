import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public error !: string
  @Output() refreshUserLogin = new EventEmitter();
  constructor(private authService: AuthService) {}
  logUser(username:string,password:string) : void{
    this.authService.logUser(username,password).subscribe((data) => {
      if(data?.error){
        this.error = data.error;
        return
      }
      localStorage.setItem("token",JSON.stringify(data))
      this.refreshUserLogin.emit();
    })
  }
}
