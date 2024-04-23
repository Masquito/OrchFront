import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class APIConnectionService {

  constructor(private http: HttpClient) { }

  configUrl = 'https://localhost:7023/api/Login';

  login(email:string, password:string ) {
    return this.http.post<User>(this.configUrl, {email, password})
}

}
