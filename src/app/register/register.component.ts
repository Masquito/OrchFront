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

  cannotSendFormData : boolean = false;
  
  doesUsernameExists : boolean = false;
  usernameIcon : boolean = true;
  emailIcon : boolean = true;
  doesEmailExist : boolean = false;
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
    this.apicomm.CheckIfUsernameExists(this.registerForm.get('Username')?.value).subscribe({
      next: (result) => {
        const data = result.body;
        this.doesUsernameExists = data;
        if(this.loggedUserData.LoggedUser.Username == this.registerForm.get('Username')?.value){
          this.doesUsernameExists = false;
        }
        if(data == false){
          this.usernameIcon = true;
        }
        else if(data == true && this.loggedUserData.LoggedUser.Username == this.registerForm.get('Username')?.value){
          this.usernameIcon = true;
        }
        else{
          this.usernameIcon = false;
        }
      }
    })
  }

  CheckEmail(){
    this.apicomm.CheckIfEmailExists(this.registerForm.get('Email')?.value).subscribe({
      next: (result) => {
        const data = result.body;
        this.doesEmailExist = data;
        if(this.loggedUserData.LoggedUser.Email == this.registerForm.get('Email')?.value){
          this.doesEmailExist = false;
        }
        if(data == false){
          this.emailIcon = true;
        }
        else if(data == true && this.loggedUserData.LoggedUser.Email == this.registerForm.get('Email')?.value){
          this.emailIcon = true;
        }
        else{
          this.emailIcon = false;
        }
      }
    })
  }
}
