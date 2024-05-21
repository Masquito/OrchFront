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

  constructor(private fb : FormBuilder, private apiComm : APIConnectionService, private loggedUserData : LoggedUserDataServiceService, private router1 : Router){
    this.userdataform = this.fb.group({
      username:[''],
      password: [''],
      email: [''],
      photo: new Uint16Array,
      region:[''],
      age:12,
      city:['']
    })
  }

  SubmitData(event: Event): void{
    event.preventDefault();
    this.apiComm.UpdateUserData(
      this.loggedUserData.GetLoggedUserId(),    
      this.userdataform.get('username')?.value,
      this.userdataform.get('password')?.value,
      this.loggedUserData.GetLoggedUserRole(),
      this.userdataform.get('email')?.value,
      this.ProfilePhotoToSend,
      this.userdataform.get('region')?.value,
      this.userdataform.get('age')?.value,
      this.userdataform.get('city')?.value).subscribe({
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
      this.convertFileToByteArray(file).then((byteArray) => {
        this.ProfilePhotoToSend = byteArray;
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
