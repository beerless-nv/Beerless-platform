import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgBootstrapModule} from './sharedModules/ng-bootstrap.module';
import {NgxBootstrapModule} from './sharedModules/ngx-bootstrap.module';
import {NavbarComponent} from './navbar/navbar.component';
import {HeroComponent} from './home/hero/hero.component';
import {TabsetComponent} from './home/tabset/tabset.component';
import {HomeComponent} from './home/home.component';
import {HeroSubscribeComponent} from './home/hero/hero-subscribe/hero-subscribe.component';
import {HomeModule} from './home/home.module';
import {FooterComponent} from './footer/footer.component';
import {BierenModule} from './bieren/bieren.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HeroComponent,
        HomeComponent,
        HeroSubscribeComponent,
        FooterComponent,
        TabsetComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgBootstrapModule,
        NgxBootstrapModule,
        HomeModule,
        BierenModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
