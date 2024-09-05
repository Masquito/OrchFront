import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { LoggedUserDataServiceService } from '../../../LoggedUserData/logged-user-data-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, map, single, throwError } from 'rxjs';

@Component({
  selector: 'app-logged-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './logged-user-profile.component.html',
  styleUrl: './logged-user-profile.component.css'
})
export class LoggedUserProfileComponent {

  usernameSignal = signal('');
  passwordSignal = signal('');
  emailSignal = signal('');
  regionSignal = signal('');
  citySignal = signal('');
  ageSignal = signal('');

  usernameForm : String = "";
  passwordForm : String = "";
  emailForm : String = "";
  regionForm : String = "";
  cityForm : String = "";
  ageForm : number = 0;

  canSendForm : boolean = false;
  cannotSendFormData : boolean = false;
  ProfilePhotoToSend : any;
  userdataform: FormGroup;
  region: any;
  formData! : FormData;
  LoggedUserRole! : String;
  selectedWojewodztwo : any;
  doesUsernameExists : boolean = false;
  usernameIcon : boolean = true;
  emailIcon : boolean = true;
  doesEmailExist : boolean = false;
  wojewodztwa: string[] = ['Zachodnio-Pomorskie', 'Pomorskie', 'Warmińsko-Mazurskie',
                                  'Podlaskie', 'Mazowieckie', 'Kujawsko-Pomorskie',
                                    'Wielkopolskie', 'Lubuskie', 'Dolnośląskie',
                                      'Łódzkie', 'Lubelskie', 'Podkarpackie',
                                        'Małopolskie', 'Śląskie', 'Opolskie',];

  constructor(private fb : FormBuilder, private apiComm : APIConnectionService, private loggedUserData : LoggedUserDataServiceService, private router1 : Router){
    this.LoggedUserRole = loggedUserData.GetLoggedUserRole();
    this.formData = new FormData();
    this.selectedWojewodztwo = loggedUserData.LoggedUser.Region;
    this.userdataform = this.fb.group({
      username:loggedUserData.LoggedUser.Username,
      email:loggedUserData.LoggedUser.Email,
      photo:loggedUserData.LoggedUser.ProfilePhoto,
      password: "",
      region:loggedUserData.LoggedUser.Region,
      age:loggedUserData.LoggedUser.Age,
      city:loggedUserData.LoggedUser.City
    })
    this.usernameSignal.set(loggedUserData.LoggedUser.Username!);
    this.emailSignal.set(loggedUserData.LoggedUser.Email!);
    this.citySignal.set(loggedUserData.LoggedUser.City!);
    this.ageSignal.set(loggedUserData.LoggedUser.Age?.toString()!);
    this.regionSignal.set(loggedUserData.LoggedUser.Region!);
    const LId = loggedUserData.GetLoggedUserId();
    apiComm.GetUserImage(LId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const img = document.getElementById('image') as HTMLImageElement;
      img.src = url;
    });


  }
  CheckUsername(){
    this.apiComm.CheckIfUsernameExists(this.userdataform.get('username')?.value).subscribe({
      next: (result) => {
        const data = result.body;
        this.doesUsernameExists = data;
        if(this.loggedUserData.LoggedUser.Username == this.userdataform.get('username')?.value){
          this.doesUsernameExists = false;
        }
        if(data == false){
          this.usernameIcon = true;
        }
        else if(data == true && this.loggedUserData.LoggedUser.Username == this.userdataform.get('username')?.value){
          this.usernameIcon = true;
        }
        else{
          this.usernameIcon = false;
        }
      }
    })
  }

  assignUsername(event : Event){
    const value = (event.target as HTMLInputElement).value;
    this.usernameSignal.set(value);
  }
  assignPassword(event : Event){
    const value = (event.target as HTMLInputElement).value;
    this.passwordSignal.set(value);
  }
  assignEmail(event : Event){
    const value = (event.target as HTMLInputElement).value;
    this.emailSignal.set(value);
  }
  assignCity(event : Event){
    const value = (event.target as HTMLInputElement).value;
    this.citySignal.set(value);
  }
  assignAge(event : Event){
    const value = (event.target as HTMLInputElement).value;
    this.ageSignal.set(value);
  }
  assignRegion(event : Event){
    const value = (event.target as HTMLInputElement).value;
    this.regionSignal.set(value);
  }

  CheckEmail(){
    this.apiComm.CheckIfEmailExists(this.userdataform.get('email')?.value).subscribe({
      next: (result) => {
        const data = result.body;
        this.doesEmailExist = data;
        if(this.loggedUserData.LoggedUser.Email == this.userdataform.get('email')?.value){
          this.doesEmailExist = false;
        }
        if(data == false){
          this.emailIcon = true;
        }
        else if(data == true && this.loggedUserData.LoggedUser.Email == this.userdataform.get('email')?.value){
          this.emailIcon = true;
        }
        else{
          this.emailIcon = false;
        }
      }
    })
  }

  SubmitData(event: Event): void{
    if(this.usernameSignal() == '' || this.passwordSignal() == '' || this.emailSignal() == '' || this.citySignal() == '' || this.ageSignal() == '' || this.selectedWojewodztwo == ''){
      this.cannotSendFormData = true;
    }
    else{
      event.preventDefault();
      this.cannotSendFormData = false;
      this.formData.set('Id', this.loggedUserData.GetLoggedUserId()),    
      this.formData.set('Username', this.userdataform.get('username')?.value),
      this.formData.set('Password', this.userdataform.get('password')?.value),
      this.formData.set('Role', this.loggedUserData.GetLoggedUserRole()),
      this.formData.set('Email', this.userdataform.get('email')?.value),
      this.formData.set('Region', this.selectedWojewodztwo),
      this.formData.set('Age', this.userdataform.get('age')?.value),
      this.formData.set('City', this.userdataform.get('city')?.value)
      this.apiComm.UpdateUserData(this.formData).subscribe({
          next: (result) => {
            const data = result.body;
            this.loggedUserData.LoggedUser.Id = data.id;
            this.loggedUserData.LoggedUser.Age = data.age;
            this.loggedUserData.LoggedUser.City = data.city;
            this.loggedUserData.LoggedUser.Email = data.email;
            this.loggedUserData.LoggedUser.ProfilePhoto = data.profilePhotoPath;
            this.loggedUserData.LoggedUser.Region = data.region;
            this.loggedUserData.LoggedUser.Role = data.role;
            this.loggedUserData.LoggedUser.Username = data.username;
            this.loggedUserData.LoggedUserId = data.id;
            this.loggedUserData.LoggedUserRole = data.role;
          }
        })
        this.router1.navigate(['/Dashboard']);
    }

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
