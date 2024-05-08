import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { TokenGuard } from '../../AuthGuardService/auth-guard.service';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path:'', component:LoginPageComponent},
    {path:'Dashboard', component:DashboardComponent, canActivate: [TokenGuard]},
    {path:'Denied', component:AccessDeniedComponent},
    {path:'Register', component:RegisterComponent}
];
