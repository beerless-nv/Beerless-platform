import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './pagegroups/Visitor/home/home.component';
import {IndexBeersComponent} from './pagegroups/Visitor/beers/index-beers/index-beers.component';
import {AddBeersComponent} from './pagegroups/Member/beers/add-beers/add-beers.component';
import {DetailBeersComponent} from './pagegroups/Visitor/beers/detail-beers/detail-beers.component';
import {IndexBlogComponent} from './pagegroups/Visitor/blog/index-blog/index-blog.component';
import {ArticleComponent} from './pagegroups/Visitor/blog/article/article.component';
import {SettingsUsersComponent} from './pagegroups/Member/users/settings-users/settings-users.component';
import {ProfileUsersComponent} from './pagegroups/Visitor/users/profile-users/profile-users.component';
import {WishlistUsersComponent} from './pagegroups/Visitor/users/wishlist-users/wishlist-users.component';
import {AuthGuardService} from './_services/authorization/auth-guard.service';
import {SignupComponent} from './pagegroups/Visitor/signup/signup.component';
import {SigninComponent} from './pagegroups/Visitor/signin/signin.component';
import {BeerprofileComponent} from './pagegroups/Visitor/beers/detail-beers/beerprofile/beerprofile.component';
import {DetailBreweriesComponent} from './pagegroups/Visitor/breweries/detail-breweries/detail-breweries.component';

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
