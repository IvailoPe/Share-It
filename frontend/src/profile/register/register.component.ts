import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public error !: string
  @Output() refreshUserRegister = new EventEmitter();
  constructor(private authService: AuthService) {}
  registerUser(username:string,password:string) : void{
    this.authService.registerUser(username,password).subscribe((data) => {
      if(data?.error){
        this.error = data.error;
        return;
      }
      localStorage.setItem("token",JSON.stringify(data))
      this.refreshUserRegister.emit();
    })
  }
}
