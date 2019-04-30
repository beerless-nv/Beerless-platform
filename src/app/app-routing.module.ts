import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: 'sign-up', loadChildren: './modules/sign-up/sign-up.module#SignUpModule'},
    {path: 'sign-in', loadChildren: './modules/sign-in/sign-in.module#SignInModule'},
    {path: 'reset-password', loadChildren: './modules/reset-password/reset-password.module#ResetPasswordModule'},
    {path: 'search', loadChildren: './modules/search/search.module#SearchModule'},
    {path: 'beers', loadChildren: './modules/beer/beer.module#BeerModule'},
    {path: 'breweries', loadChildren: './modules/brewery/brewery.module#BreweryModule'},
    {path: 'blog', loadChildren: './modules/blog/blog.module#BlogModule'},
    {path: 'user', loadChildren: './modules/user/user.module#UserModule'},
    {path: '', redirectTo: 'search', pathMatch: 'full'},
    {path: '**', redirectTo: 'search'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    providers: [],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
