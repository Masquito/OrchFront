import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../Models/user';
import { CommonModule } from '@angular/common';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registeredUser : User = {};
  registerForm!: FormGroup;
  selectedWojewodztwo : string = '';
  wojewodztwa: string[] = ['Zachodnio-Pomorskie', 'Pomorskie', 'Warmińsko-Mazurskie',
                                  'Podlaskie', 'Mazowieckie', 'Kujawsko-Pomorskie',
                                    'Wielkopolskie', 'Lubuskie', 'Dolnośląskie',
                                      'Łódzkie', 'Lubelskie', 'Podkarpackie',
                                        'Małopolskie', 'Śląskie', 'Opolskie',];
  constructor(private appComponent : AppComponent, private fb : FormBuilder, private apicomm : APIConnectionService, private router: Router){
    appComponent.visible_nav = false;

    this.registerForm = this.fb.group({
      Username: [''],
      Password: [''],
      Email: [''],
      Region: [''],
      Age: [''],
      City: [''],
    });
  }

  Register(){
    const uname = this.registerForm.get('Username')?.value;
    const pass = this.registerForm.get('Password')?.value;
    const email = this.registerForm.get('Email')?.value;
    const age = this.registerForm.get('Age')?.value;
    const city = this.registerForm.get('City')?.value;
    const region = this.selectedWojewodztwo;

    this.apicomm.register(uname, pass, email, age, city, region).subscribe({
      next: (result) => {
        console.log('API Response:', result);
      }
    })
    alert("Registration successfull");
    this.router.navigate(['/'])

  }
}
