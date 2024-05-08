import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class APIConnectionService {

  constructor(private http: HttpClient) { }

  loginControllerUrl = 'https://localhost:7023/api/Login';
  RegisterControllerUrl = 'https://localhost:7023/api/Register';

  login(email:string, password:string ) {
    return this.http.post<any>(this.loginControllerUrl, {email, password}, {observe: 'response'})
  }

  register(username:string, password:string, email:string, age:string, city:string, region:string){
    return this.http.post<any>(this.RegisterControllerUrl, {username, password, email, age, city, region})
  }
}
