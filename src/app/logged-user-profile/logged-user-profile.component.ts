import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { LoggedUserDataServiceService } from '../../../LoggedUserData/logged-user-data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-user-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './logged-user-profile.component.html',
  styleUrl: './logged-user-profile.component.css'
})
export class LoggedUserProfileComponent {

  ProfilePhotoToSend : any;
  userdataform: FormGroup;
  formData! : FormData;
  LoggedUserRole! : String;

  constructor(private fb : FormBuilder, private apiComm : APIConnectionService, private loggedUserData : LoggedUserDataServiceService, private router1 : Router){
    this.LoggedUserRole = loggedUserData.GetLoggedUserRole();
    this.formData = new FormData();
    this.userdataform = this.fb.group({
      username:loggedUserData.LoggedUser.Username,
      email:loggedUserData.LoggedUser.Email,
      photo:loggedUserData.LoggedUser.ProfilePhoto,
      password: "",
      region:loggedUserData.LoggedUser.Region,
      age:loggedUserData.LoggedUser.Age,
      city:loggedUserData.LoggedUser.City
    })
    const LId = loggedUserData.GetLoggedUserId();
    apiComm.GetUserImage(LId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const img = document.getElementById('image') as HTMLImageElement;
      img.src = url;
    });
  }

  SubmitData(event: Event): void{
    event.preventDefault();
    this.formData.set('Id', this.loggedUserData.GetLoggedUserId()),    
    this.formData.set('Username', this.userdataform.get('username')?.value),
    this.formData.set('Password', this.userdataform.get('password')?.value),
    this.formData.set('Role', this.loggedUserData.GetLoggedUserRole()),
    this.formData.set('Email', this.userdataform.get('email')?.value),
    this.formData.set('Region', this.userdataform.get('region')?.value),
    this.formData.set('Age', this.userdataform.get('age')?.value),
    this.formData.set('City', this.userdataform.get('city')?.value)
    this.apiComm.UpdateUserData(this.formData).subscribe({
        next: (result) => {
          console.log(result);
        }
      })
      this.router1.navigate(['/Dashboard']);

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      let file = input.files[0];
      this.ProfilePhotoToSend = file;
      this.formData.set('ProfilePhoto', file);
      this.convertFileToByteArray(file).then((byteArray) => {
        this.displayImageFromByteArray(byteArray);
      });
    }
  }

  convertFileToByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        resolve(byteArray);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  displayImageFromByteArray(byteArray: Uint8Array): void {
    const blob = new Blob([byteArray], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    const img = document.getElementById('image') as HTMLImageElement;
    img.src = url;
  }
}
