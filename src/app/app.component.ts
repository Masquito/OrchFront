import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { APIConnectionService } from '../../APIConnectionService/api-connection.service';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isMenuOpen: boolean = false;

  title = 'Orch_FrontAngu_Praca';
  visible_nav: boolean = true;
  constructor(private API_COMM : APIConnectionService) {}

  ShowMenu(){
    let menu = document.getElementById('navig')
    menu?.classList.toggle('is-active');
  }
}
