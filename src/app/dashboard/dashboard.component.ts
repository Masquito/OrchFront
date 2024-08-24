import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private appC: AppComponent, private apiComm : APIConnectionService){
    appC.visible_nav = true;

    apiComm.cleanExcessNotifications().subscribe();
  }
}
