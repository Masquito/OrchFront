import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserDataServiceService {

  public LoggedUserId : string = "default value";
  public LoggedUserRole : string = "default value";
  public LoggedUser! : User;
  public UserToProfileView : User = {
    Id:"def",
  }

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
