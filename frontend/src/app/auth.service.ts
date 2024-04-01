import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './environment-vars';
import { UserInterface } from './interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null ? true : false;
  }

  logUser(username:string,password:string) {
    return this.http.post<UserInterface>(API + "auth/login",{
      username,
      password
    })
  }

  registerUser(username:string, password:string){
    return this.http.post<UserInterface>(API + "auth/register",{
      username,
      password
    }) 
  }
}
