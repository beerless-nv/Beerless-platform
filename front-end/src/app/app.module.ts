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
import {BierenModule} from './pagegroups/Member/bieren/bieren.module';
import {HttpClientModule} from '@angular/common/http';
import {LoginModule} from './pagegroups/Visitor/login/login.module';
import {LoginComponent} from './pagegroups/Visitor/login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HeroComponent,
        HomeComponent,
        HeroSubscribeComponent,
        FooterComponent,
        TabsetComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgBootstrapModule,
        NgxBootstrapModule,
        HomeModule,
        BierenModule,
        HttpClientModule,
        LoginModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
