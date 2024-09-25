import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { catchError, map, throwError } from 'rxjs';
import { LoggedUserDataServiceService } from '../../../LoggedUserData/logged-user-data-service.service';
import { User } from '../../../Models/user';
import { NotificationMy } from '../../../Models/Notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{

  canBeShown : number = 0;
  powiadomienia = new Array();
  LogedUser! : User;
  isFullAccess : boolean = false;
  constructor(private apiConn : APIConnectionService, private LoggedUserData : LoggedUserDataServiceService, private router1 : Router){
    if(LoggedUserData.LoggedUser.Role == "FUA"){
      this.isFullAccess = true;
    }
  }

  ngOnInit() {
    const ID = this.LoggedUserData.GetLoggedUserId();
    this.apiConn.getNotificationsFrom3Months(ID)
    .pipe(
      catchError(error => {
        if (error.status === 404) {
          this.canBeShown = 1;
        }
        return throwError(() => new Error("Error occured"));
      }),
      map((response) => {
        const data = response.body;
        data.forEach((element: {notification : NotificationMy, dateL : String, dateS : String}) => {
          this.powiadomienia.push(element);
        })
        return(this.powiadomienia);
      })
    )
    .subscribe({
      next: (result) => {
        this.canBeShown = 2;
        console.log(result);
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }

  DeleteNotification(Id : string){
    this.apiConn.DeleteNotification(Id).subscribe({
      next: (result) => {
        console.log(result);
      }
    })
    const idk = Id;
    this.powiadomienia.forEach((element: any, index : number) => {
      if(element.notification.id == idk){
        this.powiadomienia.splice(index, 1);
      }
    });
    if(this.powiadomienia.length == 0){
      this.canBeShown = 1;
    }
  }

  SeeUserProfile(Id : string): void {
    this.apiConn.GetUserById(Id)
    .pipe(
      catchError(error => {
        if (error.status === 404) {
          alert("Nie znaleziono użytkownika");
        }
        return throwError(() => new Error("Error occured"));
      }),
      map((response) => {
        const data = response.body;
        const user : User = {
          Id: data.userToReturn.id,
          Username: data.userToReturn.username,
          Email: data.userToReturn.email,
          Role: data.userToReturn.role,
          Age: data.userToReturn.age,
          Region: data.userToReturn.region,
          City: data.userToReturn.city,
        };
        this.LoggedUserData.UserToProfileView = user;
        return { user };
      })
    )
    .subscribe({
      next: (result) => {
        this.router1.navigate(['/BrowseUsers']);
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
    
    this.apiConn.SendNotoficationWhenProfileVisited(this.LoggedUserData.LoggedUser.Id, Id).subscribe();
  }
}
