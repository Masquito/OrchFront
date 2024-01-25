import { Routes } from '@angular/router';
import { CenterBarComponent } from './center-bar/center-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './front-page/front-page.component';

export const routes: Routes = [
    { path: "", component: FrontPageComponent },
    { path: "bb", component: BottomBarComponent },
  ];

