import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from '../../core/authorization/auth-guard.service';
import {RoleGuardService} from '../../core/authorization/role-guard.service';
import {AddBeersComponent} from './pages/member/add-beers/add-beers.component';
import {AddTastingprofilesComponent} from './pages/member/add-tastingprofiles/add-tastingprofiles.component';
import {DetailBeersComponent} from './pages/visitor/detail-beers/detail-beers.component';

const routes: Routes = [
    {
        path: 'add', canActivate: [AuthGuardService, RoleGuardService], data: {expectedRole: 'Contributor'},
        children: [
            {path: '', component: AddBeersComponent}
        ]
    },
    {
        path: ':id', canActivate: [RoleGuardService], data: {expectedRole: '$everyone'},
        children: [
            {path: '', component: DetailBeersComponent},
            {
                path: 'add/tastingprofile',
                component: AddTastingprofilesComponent,
                canActivate: [AuthGuardService, RoleGuardService],
                data: {expectedRole: 'Contributor'}
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BeerRoutingModule {
}
