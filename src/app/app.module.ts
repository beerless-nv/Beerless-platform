import {BrowserModule} from '@angular/platform-browser';
import {ChangeDetectorRef, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignInModule} from './modules/sign-in/sign-in.module';
import {SignUpModule} from './modules/sign-up/sign-up.module';
import {ToastModule} from './shared/components/toast/toast.module';
import {NgBootstrapModule} from './shared/modules/ng-bootstrap.module';
import {NgxBootstrapModule} from './shared/modules/ngx-bootstrap.module';
import {HeroComponent} from './modules/Visitor/home/hero/hero.component';
import {TabsetComponent} from './modules/Visitor/home/tabset/tabset.component';
import {HomeComponent} from './modules/Visitor/home/home.component';
import {HeroSubscribeComponent} from './modules/Visitor/home/hero/hero-subscribe/hero-subscribe.component';
import {HomeModule} from './modules/Visitor/home/home.module';
import {BeerModule} from './modules/beer/beer.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {BlogModule} from './modules/blog/blog.module';
import {UsersModule} from './modules/user/user.module';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {SignupComponent} from './modules/sign-up/pages/visitor/signup/signup.component';
import {SignupBackgroundCardComponent} from './modules/sign-up/components/signup-background-card/signup-background-card.component';
import {SignupFormComponent} from './modules/sign-up/components/signup-form/signup-form.component';
import {SigninComponent} from './modules/sign-in/pages/visitor/signin/signin.component';
import {MyHttpClientInterceptor} from './core/interceptors/My-HttpClientInterceptor';
import {SigninBackgroundCardComponent} from './modules/sign-in/components/signin-background-card/signin-background-card.component';
import {SigninFormComponent} from './modules/sign-in/components/signin-form/signin-form.component';
import {AutosizeModule} from 'ngx-autosize';
import {CookieService} from 'ngx-cookie-service';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {BidiModule} from '@angular/cdk/bidi';
import {FileDropModule} from 'ngx-file-drop';
import {BreweryModule} from './modules/brewery/brewery.module';
import {ChatbotModule} from './shared/components/chatbot/chatbot.module';
import {AgeVerificationModule} from './shared/components/age-verification/age-verification.module';
import {ErrorModule} from './shared/components/error/error.module';
import {FooterModule} from './shared/components/footer/footer.module';
import {IeWarningModule} from './shared/components/ie-warning/ie-warning.module';
import {ModalModule} from './shared/components/modal/modal.module';
import {NavbarModule} from './shared/components/navbar/navbar.module';
import {NavbarMobileModule} from './shared/components/navbar-mobile/navbar-mobile.module';

@NgModule({
    declarations: [
        AppComponent,
        HeroComponent,
        HomeComponent,
        HeroSubscribeComponent,
        TabsetComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgBootstrapModule,
        NgxBootstrapModule,
        HomeModule,
        BeerModule,
        HttpClientModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        UsersModule,
        LoadingBarHttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        AutosizeModule,
        NgScrollbarModule,
        BidiModule,
        FileDropModule,
        NgScrollbarModule,
        BreweryModule,
        ChatbotModule,
        AgeVerificationModule,
        ErrorModule,
        FooterModule,
        IeWarningModule,
        ModalModule,
        NavbarModule,
        NavbarMobileModule,
        ToastModule,
        BlogModule,
        SignInModule,
        SignUpModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyHttpClientInterceptor,
            multi: true
        },
        CookieService,
    ],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
