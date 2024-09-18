import { Component, OnInit } from '@angular/core';
import { LoggedUserDataServiceService } from '../../../LoggedUserData/logged-user-data-service.service';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { subscribe } from 'diagnostics_channel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent{

  constructor(private loggeduserdata : LoggedUserDataServiceService, private apiconn : APIConnectionService){
    
  }

  showBalance(){
    this.apiconn.PaymentsChecking(this.loggeduserdata.GetLoggedUserId()).subscribe({
      next: (result) => {
        console.log(result);
      }
    })
  }

}
