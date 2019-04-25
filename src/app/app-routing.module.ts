import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './modules/Visitor/home/home.component';
import {IndexBeersComponent} from './modules/beer/pages/visitor/index-beers/index-beers.component';
import {AddBeersComponent} from './modules/beer/pages/member/add-beers/add-beers.component';
import {DetailBeersComponent} from './modules/beer/pages/visitor/detail-beers/detail-beers.component';
import {IndexBlogComponent} from './modules/blog/pages/visitor/index-blog/index-blog.component';
import {ArticleComponent} from './modules/blog/pages/visitor/article/article.component';
import {SettingsUsersComponent} from './modules/user/pages/member/settings-users/settings-users.component';
import {ProfileUsersComponent} from './modules/user/pages/visitor/profile-users/profile-users.component';
import {WishlistUsersComponent} from './modules/user/pages/visitor/wishlist-users/wishlist-users.component';
import {AuthGuardService} from './core/authorization/auth-guard.service';
import {SignupComponent} from './modules/sign-up/pages/visitor/signup/signup.component';
import {SigninComponent} from './modules/sign-in/pages/visitor/signin/signin.component';
import {BeerprofileComponent} from './modules/beer/components/beerprofile/beerprofile.component';
import {DetailBreweriesComponent} from './modules/brewery/pages/visitor/detail-breweries/detail-breweries.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'sign-up', component: SignupComponent},
    {path: 'sign-in', component: SigninComponent},
    // search page
    {path: 'search', component: IndexBeersComponent},
    // All pages from beers
    {
        path: 'beers', children: [
            {path: 'add', component: AddBeersComponent, canActivate: [AuthGuardService]},
            {path: ':id', component: DetailBeersComponent},
        ]
    },
    // All pages from breweries
    {
        path: 'breweries', children: [
            // {path: 'add', component: AddBreweriesComponent, canActivate: [AuthGuardService]},
            {path: ':id', component: DetailBreweriesComponent},
        ]
    },
    // ALL pages from blog
    {
        path: 'blog', children: [
            {path: '', component: IndexBlogComponent},
            {path: 'article/:slug', component: ArticleComponent},
        ]
    },
    // ALL pages from users
    {
        path: 'user', children: [
            {path: 'settings', component: SettingsUsersComponent},
            {path: 'profile/:id', component: ProfileUsersComponent},
            {path: 'wishlist/:id', component: WishlistUsersComponent},
        ]
    },
    // Homepage doorverwijzen naar home
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    // {path: '', component: HomeComponent},
    // Niet gedefinieerde routes doorverwijzen naar error page
    {path: '**', redirectTo: 'home'},
    // {path: '**', component: HomeComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    providers: [],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
