import {BrowserModule} from '@angular/platform-browser';
import {ChangeDetectorRef, NgModule} from '@angular/core';

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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {DetailBeersComponent} from './pagegroups/Visitor/beers/detail-beers/detail-beers.component';
import {BeerprofileComponent} from './pagegroups/Visitor/beers/detail-beers/beerprofile/beerprofile.component';
import {BeerbreweryprofileComponent} from './pagegroups/Visitor/beers/detail-beers/beerbreweryprofile/beerbreweryprofile.component';
import {BlogModule} from './pagegroups/Visitor/blog/blog.module';
import {UsersModule} from './pagegroups/Member/users/users.module';
import {WishlistUsersComponent} from './pagegroups/Visitor/users/wishlist-users/wishlist-users.component';
import {ProfileUsersComponent} from './pagegroups/Visitor/users/profile-users/profile-users.component';
import {NavbarMobileComponent} from './sharedComponents/navbar-mobile/navbar-mobile.component';
import {ToastComponent} from './sharedComponents/toast/toast.component';
import {ProfileCoverComponent} from './pagegroups/Visitor/users/profile-users/profile-cover/profile-cover.component';
import {ProfileSidebarComponent} from './pagegroups/Visitor/users/profile-users/profile-sidebar/profile-sidebar.component';
import {ProfileFavouriteComponent} from './pagegroups/Visitor/users/profile-users/profile-content/profile-about/profile-favourite/profile-favourite.component';
import {ProfileActivitiesComponent} from './pagegroups/Visitor/users/profile-users/profile-content/profile-activities/profile-activities.component';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {ProfileContentComponent} from './pagegroups/Visitor/users/profile-users/profile-content/profile-content.component';
import {ProfileAboutComponent} from './pagegroups/Visitor/users/profile-users/profile-content/profile-about/profile-about.component';
import {ProfilePersonalComponent} from './pagegroups/Visitor/users/profile-users/profile-content/profile-about/profile-personal/profile-personal.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ErrorComponent} from './sharedComponents/error/error.component';
import {SignupComponent} from './pagegroups/Visitor/signup/signup.component';
import {RegularMenuItemComponent} from './sharedComponents/navbar/regular-menu-item/regular-menu-item.component';
import {SignupBackgroundCardComponent} from './pagegroups/Visitor/signup/signup-background-card/signup-background-card.component';
import {SignupFormComponent} from './pagegroups/Visitor/signup/signup-form/signup-form.component';
import {InputFieldComponent} from './sharedComponents/input-field/input-field.component';
import {SigninComponent} from './pagegroups/Visitor/signin/signin.component';
import {MyHttpClientInterceptor} from './_interceptors/My-HttpClientInterceptor';
import {SigninBackgroundCardComponent} from './pagegroups/Visitor/signin/signin-background-card/signin-background-card.component';
import {SigninFormComponent} from './pagegroups/Visitor/signin/signin-form/signin-form.component';
import {ChatbotComponent} from './sharedComponents/chatbot/chatbot.component';
import {AutosizeModule} from 'ngx-autosize';
import {CookieService} from 'ngx-cookie-service';
import {MyHttpClient} from './_interceptors/MY-HttpClient';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {BidiModule} from '@angular/cdk/bidi';
import {AgeVerificationComponent} from './sharedComponents/age-verification/age-verification.component';
import {IeWarningComponent} from './sharedComponents/ie-warning/ie-warning.component';
import {ModalComponent} from './sharedComponents/modal/modal.component';
import {MessagesComponent} from './sharedComponents/chatbot/messages/messages.component';
import {MessageComponent} from './sharedComponents/chatbot/message/message.component';
import {SafeHTMLPipe} from './_pipes/safeHTML.pipe';
import {ExtraComponent} from './sharedComponents/chatbot/extra/extra.component';
import {EmoticonsComponent} from './sharedComponents/chatbot/extra/emoticons/emoticons.component';
import {UploadComponent} from './sharedComponents/chatbot/extra/upload/upload.component';
import {FileDropModule} from 'ngx-file-drop';
import {DragScrollModule} from 'ngx-drag-scroll/lib';
import {SafeURLPipe} from './_pipes/safeURL.pipe';
import {TextTruncateComponent} from './sharedComponents/text-truncate/text-truncate.component';
import {BreweriesModule} from './pagegroups/Visitor/breweries/breweries.module';

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
        ToastComponent,
        ProfileCoverComponent,
        ProfileSidebarComponent,
        ProfileFavouriteComponent,
        ProfileActivitiesComponent,
        ProfileContentComponent,
        ProfileAboutComponent,
        ProfilePersonalComponent,
        ProfilePersonalComponent,
        ErrorComponent,
        SignupComponent,
        RegularMenuItemComponent,
        SignupBackgroundCardComponent,
        SignupFormComponent,
        InputFieldComponent,
        SigninComponent,
        SigninBackgroundCardComponent,
        SigninFormComponent,
        ChatbotComponent,
        AgeVerificationComponent,
        IeWarningComponent,
        ModalComponent,
        MessagesComponent,
        MessageComponent,
        SafeHTMLPipe,
        SafeURLPipe,
        ExtraComponent,
        EmoticonsComponent,
        UploadComponent,
        TextTruncateComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgBootstrapModule,
        NgxBootstrapModule,
        HomeModule,
        BeersModule,
        HttpClientModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        BlogModule,
        UsersModule,
        LoadingBarHttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        AutosizeModule,
        NgScrollbarModule,
        BidiModule,
        FileDropModule,
        DragScrollModule,
        NgScrollbarModule,
        BreweriesModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyHttpClientInterceptor,
            multi: true
        },
        CookieService,
    ],
    entryComponents: [
        AgeVerificationComponent,
        IeWarningComponent,
        BeerprofileComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
