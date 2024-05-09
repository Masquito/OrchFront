import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{

  powiadomienia : any;
  constructor(private apiConn : APIConnectionService){}

  ngOnInit() {
    const id = sessionStorage.getItem("LoggedUserId")!;
    this.apiConn.getNotificationsFrom3Months(id)
    .pipe(
      catchError(error => {
        if (error.status === 404) {
          alert("You don't have any Notifications");
        }
        return throwError(() => new Error("Error occured"));
      }),
      map((response) => {
        this.powiadomienia = response.body;
        return(this.powiadomienia);
      })
    )
    .subscribe({
      next: (result) => {
        console.log('API Response: Notifications:', result);
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }
}
