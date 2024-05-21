import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserDataServiceService {

  public LoggedUserId : string = "default value";
  public LoggedUserRole : string = "default value";

  constructor() { 
  }

  SetLoggedUserId(Id : string){
    this.LoggedUserId = Id;
  }

  GetLoggedUserId(){
    return this.LoggedUserId;
  }

  SetLoggedUserRole(Role : string){
    this.LoggedUserRole = Role;
  }

  GetLoggedUserRole(){
    return this.LoggedUserRole;
  }
}
