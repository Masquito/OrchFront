import { inject } from "@angular/core";
import { DashboardComponent } from "../src/app/dashboard/dashboard.component";
import { TokenContainerService } from "./token-container.service";
import { Router } from "@angular/router";
import { LoggedUserDataServiceService } from "../LoggedUserData/logged-user-data-service.service";

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

export const BrowseUserGuard = () => {
  const router = inject(Router);
  const loggedUserService = inject(LoggedUserDataServiceService);
  if(loggedUserService.LoggedUser != null){
    return true;
  }
  else{
    router.navigate([""]);
    return false;
  }
}