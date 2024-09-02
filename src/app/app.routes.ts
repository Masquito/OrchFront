import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { BrowseUserGuard, TokenGuard } from '../../AuthGuardService/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { LoggedUserProfileComponent } from './logged-user-profile/logged-user-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PeopleSearchComponent } from './people-search/people-search.component';
import { MessagesComponent } from './messages/messages.component';
import { PaymentsComponent } from './payments/payments.component';
import {RouterModule} from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { OtherUserProfileComponent } from './other-user-profile/other-user-profile.component';

export const routes: Routes = [
    {path:'', component:LoginPageComponent},
    {path:'Dashboard', component:DashboardComponent, canActivate: [TokenGuard]},
    {path:'Denied', component:AccessDeniedComponent},
    {path:'Register', component:RegisterComponent},
    {path:'Profile', component:LoggedUserProfileComponent, canActivate: [TokenGuard]},
    {path:'Notifications', component:NotificationsComponent, canActivate: [TokenGuard]},
    {path:'Search', component:PeopleSearchComponent, canActivate: [TokenGuard]},
    {path:'Messages', component:MessagesComponent, canActivate: [TokenGuard]},
    {path:'Payments', component:PaymentsComponent, canActivate: [TokenGuard]},
    {path:'Contact', component:ContactComponent, canActivate: [TokenGuard]},
    {path:'BrowseUsers', component:OtherUserProfileComponent, canActivate: [TokenGuard, BrowseUserGuard]}
];
