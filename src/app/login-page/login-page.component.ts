import { Component } from '@angular/core';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../Models/user';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  config!: User;
  test: any;
  myForm: FormGroup;

  constructor (private API_COMM : APIConnectionService, private router : Router, private fb : FormBuilder) {
    this.myForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  Login(){
    this.GetApiDataFirstUser();
  } 

  ValidateUser(){
    const email = this.myForm.get('email')?.value;
    const pass = this.myForm.get('password')?.value;
    if(email == this.config.Email && pass == this.config.Password){
      this.router.navigate(['/Dashboard']);
    }
    else{
      alert("zly username lub haslo");
    }
  }

  GetApiDataFirstUser() {
    this.API_COMM.getConfig()
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
          this.ValidateUser();
        },
        error: (error) => {
          console.error('API Error:', error);
        }
      });
  }


}
