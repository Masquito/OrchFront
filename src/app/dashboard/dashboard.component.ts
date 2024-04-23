import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthGuardService } from '../../../AuthGuardService/auth-guard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isUserLoggedIn = true;
  constructor(private appComponent : AppComponent, private userLoggedInService : AuthGuardService){
    appComponent.visible_nav = true;
  }

  
}
