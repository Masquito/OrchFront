import { Component, OnInit, inject } from '@angular/core';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../Models/user';
import { AppComponent } from '../app.component';
import { catchError, map, tap, throwError } from 'rxjs';
import { LoggedUserDataServiceService } from '../../../LoggedUserData/logged-user-data-service.service';

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
  verificationPassed : boolean = false;

  constructor (private API_COMM : APIConnectionService, private router : Router, private fb : FormBuilder, private appComponent: AppComponent, private LoggedUserData : LoggedUserDataServiceService) {
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
    if(this.verificationPassed){
      this.router.navigate(['/Dashboard']);
    }
    else{
      alert("Login failed. Check Email or Password");
    }
  }

  GetApiDataFirstUser() {
    this.API_COMM.login(this.myForm.get('email')?.value, this.myForm.get('password')?.value)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            alert("Login failed. Check Email or Password");
          }
          return throwError(() => new Error("Error occured"));
        }),
        map((response) => {
          const data = response.body;
          const user : User = {
            Id: data.user.id,
            Username: data.user.username,
            Email: data.user.email,
            Role: data.user.role,
            Age: data.user.age,
            Region: data.user.region,
            City: data.user.city,
            ProfilePhoto: data.user.ProfilePhoto
          };
          this.verificationPassed = true;
          return { user, token: data.token };
        })
      )
      .subscribe({
        next: (result) => {
          sessionStorage.setItem("Token", result.token);
          this.LoggedUserData.LoggedUser = result.user;
          console.log(result.user);
          this.LoggedUserData.SetLoggedUserId(result.user.Id!);
          this.LoggedUserData.SetLoggedUserRole(result.user.Role!);
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
