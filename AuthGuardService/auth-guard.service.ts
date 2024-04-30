import { inject } from "@angular/core";
import { DashboardComponent } from "../src/app/dashboard/dashboard.component";
import { TokenContainerService } from "./token-container.service";
import { Router } from "@angular/router";

export const TokenGuard = () => {

  const TC = inject(TokenContainerService);
  const router = inject(Router);
  if(TC.getToken() != null){
    return true;
  }
  else{
    router.navigate([""]);
    return false;
  }
}