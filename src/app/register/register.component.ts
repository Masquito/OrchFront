import { Component, signal } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../Models/user';
import { CommonModule } from '@angular/common';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { Router, RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { LoggedUserDataServiceService } from '../../../LoggedUserData/logged-user-data-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

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

  usernameIcon : boolean = true;
  emailIcon : boolean = true;
  passwordIcon : boolean = true;
  ageIcon : boolean = true;
  cityIcon : boolean = true;

  cannotSendFormData : boolean = false;
  
  doesUsernameExists : boolean = false;
  isUsernameEmpty : boolean = false;
  doesEmailExist : boolean = false;
  isEmailProper : boolean = true;
  ispasswordProper : boolean = true;
  isCityProper : boolean = true;
  isAgeProper : boolean = true;
  registeredUser : User = {};
  registerForm!: FormGroup;
  selectedWojewodztwo : string = '';
  wojewodztwa: string[] = ['Zachodnio-Pomorskie', 'Pomorskie', 'Warmińsko-Mazurskie',
                                  'Podlaskie', 'Mazowieckie', 'Kujawsko-Pomorskie',
                                    'Wielkopolskie', 'Lubuskie', 'Dolnośląskie',
                                      'Łódzkie', 'Lubelskie', 'Podkarpackie',
                                        'Małopolskie', 'Śląskie', 'Opolskie',];
  constructor(private appComponent : AppComponent, private fb : FormBuilder, private apicomm : APIConnectionService, private router: Router, private loggedUserData : LoggedUserDataServiceService){
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

  CheckPassword(){
    const value = this.passwordSignal();
    const hasNumber = value.match("[0-9]+");
    const hasSpecialChar = value.match("[^A-Za-z0-9]");
    if(value.length < 8 || hasNumber?.length == null || hasSpecialChar?.length == null){
      this.passwordIcon = true;
      this.ispasswordProper = false;
      document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
    }
    if(value.length >= 8 && hasNumber?.length != null && hasSpecialChar?.length != null){
      this.passwordIcon = false;
      this.ispasswordProper = true;
      document.getElementById("btnsub")?.removeAttribute('disabled');
    }
  }

  CheckAge(){
    const value = this.ageSignal();
    const isNaN = value.match("[^0-9]+");
    if(isNaN?.length != null || value == ""){
      this.ageIcon = true;
      this.isAgeProper = false;
    }
    else{
      this.ageIcon = false;
      this.isAgeProper = true;
    }
  }

  CheckCity(){
    const value = this.citySignal();
    if(value == ""){
      this.cityIcon = true;
      this.isCityProper = false;
    }
    else{
      this.cityIcon = false;
      this.isCityProper = true;
    }
  }

  Register(event : Event){
    const zmienne = new Array(this.usernameSignal(), this.passwordSignal(), this.emailSignal(), this.citySignal(), this.ageSignal().toString(), this.selectedWojewodztwo);
    if(this.usernameSignal() == '' || this.passwordSignal() == '' || this.emailSignal() == '' || this.citySignal() == '' || this.ageSignal() == '' || this.selectedWojewodztwo == ''){
      this.cannotSendFormData = true;
    }
    else{
      event.preventDefault();
      this.cannotSendFormData = false;
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

  CheckUsername(){
    const value = this.usernameSignal();
    if(value == ""){
      this.isUsernameEmpty = true;
      this.usernameIcon = true;
      document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
    }
    else{
      this.isUsernameEmpty = false;
      this.usernameIcon = false;
      document.getElementById("btnsub")?.removeAttribute('disabled');
    }
    this.apicomm.CheckIfUsernameExists(this.registerForm.get('Username')?.value).subscribe({
      next: (result) => {
        const data = result.body;
        if(data == false){
          this.doesUsernameExists = false;
          if(this.registerForm.get('Username')?.value == ""){
            this.usernameIcon = true;
          }
          else{
            this.usernameIcon = false;
            document.getElementById("btnsub")?.removeAttribute('disabled');
          }
        }
        else{
          this.doesUsernameExists = true;
          this.usernameIcon = true;
          document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
        }
      }
    })
  }

  CheckEmail(){
    const value = this.emailSignal();
    const hasNumber = value.match("[@]");
    const hasSpecialChar = value.match("[.]\\S+");
    if(hasNumber?.length == null || hasSpecialChar?.length == null){
      this.emailIcon = true;
      this.isEmailProper = false
      document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
    }
    if(hasNumber?.length != null && hasSpecialChar?.length != null){
      this.emailIcon = false;
      this.isEmailProper = true
      document.getElementById("btnsub")?.removeAttribute('disabled');
      this.apicomm.CheckIfEmailExists(this.registerForm.get('Email')?.value).subscribe({
        next: (result) => {
          const data = result.body;
          if(data == false){
            this.doesEmailExist = false;
            if(this.registerForm.get('Email')?.value == ""){
              this.emailIcon = true;
            }
            else{
              this.emailIcon = false;
            }
            document.getElementById("btnsub")?.removeAttribute('disabled');
          }
          else{
            this.doesEmailExist = true;
            this.emailIcon = true;
            document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
          }
        }
      })
    }
  }
}
