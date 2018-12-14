import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgBootstrapModule} from './sharedModules/ng-bootstrap.module';
import {NgxBootstrapModule} from './sharedModules/ngx-bootstrap.module';
import {NavbarComponent} from './sharedComponents/navbar/navbar.component';
import {HeroComponent} from './pagegroups/Visitor/home/hero/hero.component';
import {TabsetComponent} from './pagegroups/Visitor/home/tabset/tabset.component';
import {HomeComponent} from './pagegroups/Visitor/home/home.component';
import {HeroSubscribeComponent} from './pagegroups/Visitor/home/hero/hero-subscribe/hero-subscribe.component';
import {HomeModule} from './pagegroups/Visitor/home/home.module';
import {FooterComponent} from './sharedComponents/footer/footer.component';
import {BeersModule} from './pagegroups/Member/beers/beers.module';
import {HttpClientModule} from '@angular/common/http';
import {LoginModule} from './pagegroups/Visitor/login/login.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {DetailBeersComponent} from './pagegroups/Visitor/beers/detail-beers/detail-beers.component';
import {BeerprofileComponent} from './pagegroups/Visitor/beers/detail-beers/beerprofile/beerprofile.component';
import {BeerbreweryprofileComponent} from './pagegroups/Visitor/beers/detail-beers/beerbreweryprofile/beerbreweryprofile.component';
import {BlogModule} from './pagegroups/Visitor/blog/blog.module';
import {UsersModule} from './pagegroups/Member/users/users.module';
import { WishlistUsersComponent } from './pagegroups/Visitor/users/wishlist-users/wishlist-users.component';
import { ProfileUsersComponent } from './pagegroups/Visitor/users/profile-users/profile-users.component';
import { NavbarMobileComponent } from './sharedComponents/navbar-mobile/navbar-mobile.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HeroComponent,
        HomeComponent,
        HeroSubscribeComponent,
        FooterComponent,
        TabsetComponent,
        DetailBeersComponent,
        BeerprofileComponent,
        BeerbreweryprofileComponent,
        WishlistUsersComponent,
        ProfileUsersComponent,
        NavbarMobileComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgBootstrapModule,
        NgxBootstrapModule,
        HomeModule,
        BeersModule,
        HttpClientModule,
        LoginModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        BlogModule,
        UsersModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
