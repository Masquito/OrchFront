import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { catchError, map, throwError } from 'rxjs';
import { LoggedUserDataServiceService } from '../../../LoggedUserData/logged-user-data-service.service';
import { User } from '../../../Models/user';
import { NotificationMy } from '../../../Models/Notification';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{

  powiadomienia = new Array();
  LogedUser! : User;
  constructor(private apiConn : APIConnectionService, private LoggedUserData : LoggedUserDataServiceService){}

  ngOnInit() {
    const ID = this.LoggedUserData.GetLoggedUserId();
    this.apiConn.getNotificationsFrom3Months(ID)
    .pipe(
      catchError(error => {
        if (error.status === 404) {
          alert("You don't have any Notifications");
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

    this.powiadomienia.forEach((element: any, index : number) => {
      if(element.id == Id){
        this.powiadomienia.splice(index, 1);
      }
    });
  }
}
