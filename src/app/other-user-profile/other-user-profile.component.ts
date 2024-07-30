import { Component, OnInit } from '@angular/core';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { LoggedUserDataServiceService } from '../../../LoggedUserData/logged-user-data-service.service';
import { User } from '../../../Models/user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-other-user-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './other-user-profile.component.html',
  styleUrl: './other-user-profile.component.css'
})
export class OtherUserProfileComponent{

  userToView! : User;
  MessageToSendForm: FormGroup;
  formData! : FormData;

  constructor(private fb : FormBuilder, private apiconn : APIConnectionService, private loggedUserData : LoggedUserDataServiceService){
    this.apiconn.GetUserImage(loggedUserData.UserToProfileView.Id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const img = document.getElementById('image') as HTMLImageElement;
      img.src = url;
    });

    this.MessageToSendForm = this.fb.group({
      Message:"Type message here"
    })
    this.formData = new FormData();

    this.userToView = loggedUserData.UserToProfileView;
  }

  switchVis(){
    var item = document.getElementsByClassName('modal')[0].className;
    if(item == "modal"){
      document.getElementsByClassName('modal')[0].setAttribute("class", "modal is-active");
    }
    else{
      document.getElementsByClassName('modal')[0].setAttribute("class", "modal");
    }
  }

  SubmitData(event: Event): void {
    alert("it works");
  }
}
