import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {BierenComponent} from './bieren/bieren.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'bieren', component: BierenComponent},
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
