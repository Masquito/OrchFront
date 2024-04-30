import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenContainerService {

  constructor() { }

  getToken(){
    return sessionStorage.getItem("Token");
  }
}

