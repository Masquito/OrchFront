import { Component, OnInit } from '@angular/core';
import { LoggedUserDataServiceService } from '../../../LoggedUserData/logged-user-data-service.service';
import { APIConnectionService } from '../../../APIConnectionService/api-connection.service';
import { subscribe } from 'diagnostics_channel';
import { CommonModule } from '@angular/common';
import { MetaMaskSDK } from '@metamask/sdk';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent{
  account : any = null;
  ethereum : any;
  txhash : any = null;
  loggedUserRole : any;
  constructor(private loggeduserdata : LoggedUserDataServiceService, private apiconn : APIConnectionService){
    this.loggedUserRole = loggeduserdata.LoggedUser.Role;
    const MMSDK = new MetaMaskSDK({
      dappMetadata: {
        name: "Orchard",
        url: window.location.href,
      },
      infuraAPIKey: "b8af0de6aa8e4d8aae4902937a7386ff",
    });
    setTimeout(() => {
  
      this.ethereum = MMSDK.getProvider();
    }, 0);
  }

  showBalance(){
    this.apiconn.PaymentsChecking(this.loggeduserdata.GetLoggedUserId()).subscribe({
      next: (result) => {
        console.log(result);
      }
    })
  }

  async ConnectMetaMask(){
    await this.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts : any) => {
      this.account = accounts[0];
      console.log(this.account);
    });
  };

  async BuyFullAccess(){
    let transactionDetails = {
      to: '0x40496e2d5a48779a2721e6effa5be7a7a9caa151',
      from: this.account,
      value: '38D7EA4C68000'
    };

    await this.ethereum.request({method: 'eth_sendTransaction', params:[transactionDetails]}).then((txhash : any) => {
      this.txhash = txhash;
    })

    this.apiconn.PaymentStoretxhash(this.loggeduserdata.LoggedUser.Id, this.txhash).subscribe();
  }
}


