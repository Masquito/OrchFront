import { Component} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { LoggedUserDataServiceService } from '../../../LoggedUserData/logged-user-data-service.service';
import { catchError, map, throwError } from 'rxjs';
import { User } from '../../../Models/user';
import { resourceUsage } from 'process';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-people-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './people-search.component.html',
  styleUrl: './people-search.component.css'
})
export class PeopleSearchComponent{
  index : number = 0;
  userdataform: FormGroup;
  formData! : FormData;
  usersArrived = new Array();

  constructor(private fb : FormBuilder, private apiComm : APIConnectionService,private loggedUserData : LoggedUserDataServiceService, private router1: Router){
    this.userdataform = this.fb.group({
      region:loggedUserData.LoggedUser.Region,
      age:loggedUserData.LoggedUser.Age,
      city:loggedUserData.LoggedUser.City
    })
    this.formData = new FormData();
  }

  SeeUserProfile(Id : string): void {
    this.apiComm.GetUserById(Id)
    .pipe(
      catchError(error => {
        if (error.status === 404) {
          alert("Nie znaleziono użytkownika");
        }
        return throwError(() => new Error("Error occured"));
      }),
      map((response) => {
        const data = response.body;
        const user : User = {
          Id: data.userToReturn.id,
          Username: data.userToReturn.username,
          Email: data.userToReturn.email,
          Role: data.userToReturn.role,
          Age: data.userToReturn.age,
          Region: data.userToReturn.region,
          City: data.userToReturn.city,
        };
        this.loggedUserData.UserToProfileView = user;
        return { user };
      })
    )
    .subscribe({
      next: (result) => {
        this.router1.navigate(['/BrowseUsers']);
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
    
  }

  SubmitData(event: Event): void{
    this.formData.set('Id', this.loggedUserData.GetLoggedUserId()), 
    this.formData.set('Region', this.userdataform.get('region')?.value),
    this.formData.set('Age', this.userdataform.get('age')?.value),
    this.formData.set('City', this.userdataform.get('city')?.value)
    this.index = 0;
    this.apiComm.GetUsersSearchedForWithFilters(this.formData)
    .pipe(
      catchError(error => {
        if (error.status === 404) {
          alert("Podaj kryteria wyszukiwania użytkowników");
        }
        return throwError(() => new Error("Error occured"));
      }),
      map((response) => {
        const data = response.body;
        let users = new Array();
        data.users.forEach((element: { id: any; username: any; email: any; role: any; age: any; region: any; city: any; ProfilePhoto: any; }) => {
          let user : User = {
            Id: element.id,
            Username: element.username,
            Email: element.email,
            Role: element.role,
            Age: element.age,
            Region: element.region,
            City: element.city,
            ProfilePhoto: element.ProfilePhoto
          };
          users.push(user);
        });
        this.usersArrived = users;
        return { users };
      })
    )
    .subscribe({
      next: (result) => {
        result.users.forEach(element => {
          console.log(element);

          this.apiComm.GetUserImage(element.Id).subscribe(blob => {
            const url = window.URL.createObjectURL(blob);
            const img = document.getElementById(element.Id) as HTMLImageElement;
            img.src = url;
          });
        })
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }
}
