import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './pagegroups/Visitor/home/home.component';
import {LoginComponent} from './pagegroups/Visitor/login/login.component';
import {IndexBierenComponent} from './pagegroups/Visitor/bieren/index-bieren/index-bieren.component';
import {AddBierenComponent} from './pagegroups/Member/bieren/add-bieren/add-bieren.component';
import {DetailBierenComponent} from "./pagegroups/Visitor/bieren/detail-bieren/detail-bieren.component";

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    // All pages from BIEREN
    {path: 'beers', component: IndexBierenComponent},
    {path: 'beers/add', component: AddBierenComponent},
    {path: 'beers/detail/:id', component: DetailBierenComponent},
    // Homepage doorverwijzen naar home
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    // Niet gedefinieerde routes doorverwijzen naar error page
    {path: '**', redirectTo: 'home'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
