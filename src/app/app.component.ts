import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { APICOMMService } from '../../Api-Comm/api-comm.service';
import { Observer } from 'rxjs';
import { TopBarComponent } from "./top-bar/top-bar.component";
import { CenterBarComponent } from "./center-bar/center-bar.component";
import { RightBarComponent } from "./right-bar/right-bar.component";
import { LeftBarComponent } from "./left-bar/left-bar.component";
import { BottomBarComponent } from "./bottom-bar/bottom-bar.component";
import { FrontPageComponent } from "./front-page/front-page.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, TopBarComponent, CenterBarComponent, RightBarComponent, LeftBarComponent, BottomBarComponent, FrontPageComponent, RouterOutlet]
})

export class AppComponent {
  config: any;

  constructor(private apiComms: APICOMMService) {}

  title = 'Orch_FrontANGU';

  showConfig() {
    this.apiComms.getConfig()
      .subscribe({
        next: (data) => {
          console.log('API Response:', data);
          this.config = {
            Id: data.Id,
            Username: data.Username,
            Password: data.Password,
            Email: data.Email,
            Region: data.Region,
            Age: data.Age,
            City: data.City,
            ProfilePhoto: data.ProfilePhoto
          };
        },
        error: (error) => {
          console.error('API Error:', error);
        }
      });
  }
}
