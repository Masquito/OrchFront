import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { TokenContainerService } from '../AuthGuardService/token-container.service';

@Injectable({
  providedIn: 'root'
})
export class APIConnectionService {

  constructor(private http: HttpClient, private TC: TokenContainerService) { }

  loginControllerUrl = 'https://localhost:7023/api/Login';
  RegisterControllerUrl = 'https://localhost:7023/api/Register';
  NotificationsControllerUrl = 'https://localhost:7023/api/Notifications';
  NotificationsControllerDeleteNotificationUrl = 'https://localhost:7023/api/Notifications/DeleteNotification';
  UsersUpdateDataControllerUrl = 'https://localhost:7023/api/Users/updatedata';
  UsersGetIamgeControllerUrl = 'https://localhost:7023/api/Users/getuserphoto';
  UsersGetUserByIdUrl = 'https://localhost:7023/api/Users/getuserbyid';
  UsersGetSearchedUsersWithFilters = 'https://localhost:7023/api/Users/getuserssearchedforwithfilters';
  MessagesGetAllForUser = 'https://localhost:7023/api/Messages/GetAllUserMessagess';
  MessagesSendUserMessage = 'https://localhost:7023/api/Messages/reciveMessageSendByUserToUser';

  GetUserById(Id : any){
    const token = this.TC.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.UsersGetUserByIdUrl, {Id}, {observe: 'response', headers: headers })
  }

  login(email:string, password:string ) {
    return this.http.post<any>(this.loginControllerUrl, {email, password}, {observe: 'response'})
  }

  register(username:string, password:string, email:string, age:string, city:string, region:string){
    return this.http.post<any>(this.RegisterControllerUrl, {username, password, email, age, city, region})
  }

  getNotificationsFrom3Months(Id : any){
    const token = this.TC.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.NotificationsControllerUrl, {Id}, {observe: 'response', headers: headers })
  }

  GetUsersSearchedForWithFilters(formdata: FormData){
    const token = this.TC.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.UsersGetSearchedUsersWithFilters, formdata, {observe: 'response', headers: headers })
  }

  DeleteNotification(Id : any){
    const token = this.TC.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.NotificationsControllerDeleteNotificationUrl, {Id}, {observe: 'response', headers: headers })
  }

  GetUserImage(Id : any){
    const token = this.TC.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.UsersGetIamgeControllerUrl, {Id}, {headers: headers, responseType: 'blob' })
  }

  GetAllUserMessages(Id : any){
    const token = this.TC.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.MessagesGetAllForUser, {Id}, {observe: 'response', headers: headers })
  }

  SendUserMessage(formdata: FormData){
    const token = this.TC.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.MessagesSendUserMessage, formdata, {observe: 'response', headers: headers })
  }

  UpdateUserData(formdata: FormData){
    const token = this.TC.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.UsersUpdateDataControllerUrl, formdata, {observe: 'response', headers: headers })
  }
}
