import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './pagegroups/Visitor/home/home.component';
import {LoginComponent} from './pagegroups/Visitor/login/login.component';
import {IndexBeersComponent} from './pagegroups/Visitor/beers/index-beers/index-beers.component';
import {AddBeersComponent} from './pagegroups/Member/beers/add-beers/add-beers.component';
import {DetailBeersComponent} from './pagegroups/Visitor/beers/detail-beers/detail-beers.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    // All pages from BIEREN
    {path: 'beers', component: IndexBeersComponent},
    {path: 'beers/add', component: AddBeersComponent},
    {path: 'beers/detail/:id', component: DetailBeersComponent},
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
