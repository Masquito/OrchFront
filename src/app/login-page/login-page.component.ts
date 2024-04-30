import { Component, OnInit, inject } from '@angular/core';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../Models/user';
import { AppComponent } from '../app.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent{
  parsedAnswer: any;
  myForm: FormGroup;
  userRecived!: User;
  JWTToken : string = "empty";


  constructor (private API_COMM : APIConnectionService, private router : Router, private fb : FormBuilder, private appComponent: AppComponent) {
    appComponent.visible_nav = false;

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
    if(email == this.userRecived.Email && pass == this.userRecived.Password){
      this.router.navigate(['/Dashboard']);
    }
    else{
      alert("zly username lub haslo");
    }
  }

  GetApiDataFirstUser() {
    this.API_COMM.login(this.myForm.get('email')?.value, this.myForm.get('password')?.value)
      .pipe(
        map((data) => {
          const user: User = {
            Email: data.user.email,
            Id: data.user.id,
            Username: data.user.username,
            Password: data.user.password,
            Region: data.user.region,
            Age: data.user.age,
            City: data.user.city,
            ProfilePhoto: data.user.profilephoto
          };
          console.log(user);
          return { user, token: data.token };
        })
      )
      .subscribe({
        next: (result) => {
          console.log('API Response:', result);
          sessionStorage.setItem("Token", result.token);
          this.userRecived = result.user;
          this.JWTToken = result.token;
          this.ValidateUser();
        },
        error: (error) => {
          console.error('API Error:', error);
        }
      });
}

}
