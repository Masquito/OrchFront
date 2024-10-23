import { Component, OnInit } from '@angular/core';
import { LoggedUserDataServiceService } from '../../../LoggedUserData/logged-user-data-service.service';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { subscribe } from 'diagnostics_channel';
import { CommonModule } from '@angular/common';
import { MetaMaskSDK } from '@metamask/sdk';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{
  account : any = null;
  ethereum : any;
  txhash : any = null;
  loggedUserRole : any;

  constructor(private loggeduserdata : LoggedUserDataServiceService, private apiconn : APIConnectionService){
    this.loggedUserRole = loggeduserdata.LoggedUser.Role;
  }

  ngOnInit(): void {
    const MMSDK = new MetaMaskSDK({
      dappMetadata: {
        name: "Orchard",
        url: window.location.href,
      },
      infuraAPIKey: "b8af0de6aa8e4d8aae4902937a7386ff", 
    });
    setTimeout(() => {
      MMSDK.init().then(() => {
        this.ethereum = MMSDK.getProvider();
      });
    }, 0);

    this.apiconn.PaymentGettxhash(this.loggeduserdata.LoggedUser.Id)
    .pipe(
      catchError(error => {
        return throwError(() => new Error("Error occured"));
      }),
      map((response) => {
        const data = response.body;
        return{data};
      })
    )
    .subscribe({
      next: (result) => {
        const role = result.data.role;
        if(role != "FUA" && role != "NFUA"){
          this.WaitForTransactionConfirmation(role).then(ev => {
            if(ev == 'confirmed'){
              this.apiconn.PaymentStoretxhash(this.loggeduserdata.LoggedUser.Id, "FUA").subscribe(); //GIVE USER FULL ACCESS IF PAYMENT HAS BEED CONFIRMED
              this.loggeduserdata.LoggedUserRole = "FUA";
              this.loggeduserdata.LoggedUser.Role = "FUA";
              this.loggedUserRole = "FUA";
            }
          })
        }

      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }

  showBalance(){
    this.apiconn.PaymentsChecking(this.loggeduserdata.GetLoggedUserId()).subscribe({
      next: (result) => {
        console.log(result);
      }
    })

    
  }

  async ConnectMetaMask(){
      await this.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts : any) => {    //TO DZIAŁA BEZ ZARZUTU
        this.account = accounts[0];
        console.log(this.account);
      });
  };

  async BuyFullAccess(){     //TO DZIAŁA BEZ ZARZUTU
    let transactionDetails = {
      to: '0x40496e2d5a48779a2721e6effa5be7a7a9caa151',
      from: this.account,
      value: '38D7EA4C68000'
    };

    await this.ethereum.request({method: 'eth_sendTransaction', params:[transactionDetails]}).then((txhash : any) => {
      this.txhash = txhash;
    })

    this.apiconn.PaymentStoretxhash(this.loggeduserdata.LoggedUser.Id, this.txhash).subscribe(
      {
        next: (result) => {
          this.WaitForTransactionConfirmation(this.txhash).then(ev => { //Ponieważ metoda odpytywania jest asynchroniczna to wykonuje się w tle
            if(ev == 'confirmed'){
              this.apiconn.PaymentStoretxhash(this.loggeduserdata.LoggedUser.Id, "FUA").subscribe(); 
              this.loggeduserdata.LoggedUserRole = "FUA";
              this.loggeduserdata.LoggedUser.Role = "FUA";
              this.loggedUserRole = "FUA";
            }
          })
        }
      }
    );
    this.loggeduserdata.LoggedUserRole = this.txhash;
    this.loggeduserdata.LoggedUser.Role = this.txhash;
    this.loggedUserRole = this.txhash;
  }

  async WaitForTransactionConfirmation(txhash : string){
    let loop = () => {
      return this.ethereum.request({method: 'eth_getTransactionReceipt', params:[txhash]}).then((ev: any) => {
        if(ev != null){
          return 'confirmed';
        }
        else{
          return loop();
        }
      })
    }

    return await loop();
  }
}


