import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from '../../core/authorization/auth-guard.service';
import {RoleGuardService} from '../../core/authorization/role-guard.service';
import {AddBeersComponent} from './pages/member/add-beers/add-beers.component';
import {DetailBeersComponent} from './pages/visitor/detail-beers/detail-beers.component';

const routes: Routes = [
    {path: 'add', component: AddBeersComponent, canActivate: [AuthGuardService, RoleGuardService], data: {expectedRole: 'Contributor'}},
    {path: ':id', component: DetailBeersComponent, canActivate: [RoleGuardService], data: {expectedRole: '$everyone'}},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BeerRoutingModule {
}
