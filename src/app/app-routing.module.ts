import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './core/authorization/auth-guard.service';
import {RoleGuardService} from './core/authorization/role-guard.service';
import {AdminLayoutComponent} from './core/layouts/admin-layout/admin-layout/admin-layout.component';
import {BlankLayoutComponent} from './core/layouts/blank-layout/blank-layout/blank-layout.component';
import {StandardLayoutComponent} from './core/layouts/standard-layout/standard-layout/standard-layout.component';

const routes: Routes = [
    {
        path: '', component: StandardLayoutComponent,
        children: [
            {path: '', redirectTo: '/search', pathMatch: 'full'},
            {path: 'search', loadChildren: './modules/search/search.module#SearchModule'},
            {path: 'beers', loadChildren: './modules/beer/beer.module#BeerModule'},
            {path: 'breweries', loadChildren: './modules/brewery/brewery.module#BreweryModule'},
            {path: 'blog', loadChildren: './modules/blog/blog.module#BlogModule'},
            {path: 'user', loadChildren: './modules/user/user.module#UserModule'},
            {
                path: 'error',
                loadChildren: './shared/platform-components/error-pages/error-pages.module#ErrorPagesModule'
            },
        ]
    },
    {
        path: '', component: AdminLayoutComponent,
        canActivate: [AuthGuardService, RoleGuardService], data: {expectedRole: 'Editor'},
        children: [
            {
                path: 'admin/approval-system',
                loadChildren: './modules/approval-system/approval-system.module#ApprovalSystemModule'
            },
            {
                path: 'admin/dashboard',
                loadChildren: './modules/approval-system/approval-system.module#ApprovalSystemModule'
            },
        ]
    },
    {
        path: '', component: BlankLayoutComponent,
        children: [
            {path: 'sign-up', loadChildren: './modules/sign-up/sign-up.module#SignUpModule'},
            {path: 'sign-in', loadChildren: './modules/sign-in/sign-in.module#SignInModule'},
            {path: 'reset', loadChildren: './modules/reset/reset.module#ResetModule'},
        ]
    },
    {path: '**', redirectTo: '/error/404'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    providers: [],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
