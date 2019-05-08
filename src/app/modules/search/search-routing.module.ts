import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoleGuardService} from '../../core/authorization/role-guard.service';
import {SearchIndexComponent} from './pages/visitor/search-index/search-index.component';

const routes: Routes = [
    {path: '', component: SearchIndexComponent, canActivate: [RoleGuardService], data: {expectedRole: '$everyone'}},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchRoutingModule {
}
