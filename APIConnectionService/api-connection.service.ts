import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class APIConnectionService {

  constructor(private http: HttpClient) { }

  configUrl = 'https://localhost:7023/api/Test';

  getConfig() {
    return this.http.get<User>(this.configUrl);
  } 

}
