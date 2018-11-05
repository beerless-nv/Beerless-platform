import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pagegroups/Visitor/home/home.component';
// import {BierenComponent} from './pagegroups/Member/bieren/bieren.component';
import {LoginComponent} from './pagegroups/Visitor/login/login.component';
import {IndexBierenComponent} from './pagegroups/Member/bieren/index-bieren/index-bieren.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'bieren', component: IndexBierenComponent},
    // Homepage doorverwijzen naar home
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    // Niet gedefinieerde routes doorverwijzen naar error page
    {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
