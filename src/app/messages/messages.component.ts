import { Component, OnInit } from '@angular/core';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { LoggedUserDataServiceService } from '../../../LoggedUserData/logged-user-data-service.service';
import { catchError, map, throwError } from 'rxjs';
import { userMessage } from '../../../Models/userMessage';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit{

  messagess : any;
  users : any;
  objectsToDisplay = new Array();
  constructor(private apiConn : APIConnectionService, private LoggedUserData : LoggedUserDataServiceService){}

  ngOnInit() {
    const ID = this.LoggedUserData.GetLoggedUserId();
    this.apiConn.GetAllUserMessages(ID)
    .pipe(
      catchError(error => {
        if (error.status === 404) {
          alert("You don't have any Messagess");
        }
        return throwError(() => new Error("Error occured"));
      }),
      map((response) => {
        const data = response.body;
        return{data};
      })
    )
    .subscribe({
      next: (result) => {
        this.messagess = result.data.messages;
        this.users = result.data.users;  
        console.log(this.messagess);
        console.log(this.users);
        
        this.messagess.forEach((message: { authorId: any; content: any; sendDate: Date;}) => {
          this.users.forEach((user: { id: any; username:string; age:number;}) => {
            if(message.authorId == user.id){
              let prof = new Blob;
              let um : userMessage = {
                ProfilePhoto: prof,
                Username: user.username,
                Age: user.age,
                MessageText: message.content,
                SendDate: message.sendDate
              }
              if(!this.objectsToDisplay.includes(um)){
                this.objectsToDisplay.push(um);
              }
              
              this.apiConn.GetUserImage(user.id).subscribe(blob => {
                const url = window.URL.createObjectURL(blob);   
                Array.prototype.forEach.call(document.getElementsByClassName(user.username), 
                  item => item.setAttribute("src",url));
              });
            }
          });
        });


      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }
}
