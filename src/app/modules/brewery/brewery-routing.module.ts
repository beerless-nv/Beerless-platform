import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoleGuardService} from '../../core/authorization/role-guard.service';
import {DetailBreweriesComponent} from './pages/visitor/detail-breweries/detail-breweries.component';

const routes: Routes = [
    // {path: 'add', component: AddBreweriesComponent, canActivate: [AuthGuardService]},
    {path: ':id', component: DetailBreweriesComponent, canActivate: [RoleGuardService], data: {expectedRole: '$everyone'}},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BreweryRoutingModule {
}
