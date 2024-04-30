import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { TokenGuard } from '../../AuthGuardService/auth-guard.service';

export const routes: Routes = [
    {path:'', component:LoginPageComponent},
    {path:'Dashboard', component:DashboardComponent, canActivate: [TokenGuard]},
    {path:'**', component:DashboardComponent},
    {path:'Denied', component:AccessDeniedComponent}
];
