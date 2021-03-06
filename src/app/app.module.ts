import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {CookiePopupModule} from './shared/components/cookie-popup/cookie-popup.module';
import {RestrictPlatformModule} from './shared/components/restrict-platform/restrict-platform.module';
import {TextTruncateModule} from './shared/components/text-truncate/text-truncate.module';
import {ToastModule} from './shared/components/toast/toast.module';
import {NgBootstrapModule} from './shared/modules/ng-bootstrap.module';
import {NgxBootstrapModule} from './shared/modules/ngx-bootstrap.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AutosizeModule} from 'ngx-autosize';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {BidiModule} from '@angular/cdk/bidi';
import {FileDropModule} from 'ngx-file-drop';
import {ChatbotModule} from './shared/components/chatbot/chatbot.module';
import {AgeVerificationModule} from './shared/components/age-verification/age-verification.module';
import {ErrorModule} from './shared/components/error/error.module';
import {FooterModule} from './shared/components/footer/footer.module';
import {IeWarningModule} from './shared/components/ie-warning/ie-warning.module';
import {ModalModule} from './shared/components/modal/modal.module';
import {NavbarModule} from './shared/components/navbar/navbar.module';
import {NavbarMobileModule} from './shared/components/navbar-mobile/navbar-mobile.module';
import {PlatformComponentsModule} from './shared/platform-components/platform-components.module';
import {ClickOutsideModule} from 'ng-click-outside';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgBootstrapModule,
        NgxBootstrapModule,
        HttpClientModule,
        ReactiveFormsModule,
        LoadingBarHttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        AutosizeModule,
        NgScrollbarModule,
        BidiModule,
        FileDropModule,
        NgScrollbarModule,
        ChatbotModule,
        AgeVerificationModule,
        ErrorModule,
        FooterModule,
        IeWarningModule,
        ModalModule,
        NavbarModule,
        NavbarMobileModule,
        ToastModule,
        TextTruncateModule,
        PlatformComponentsModule,
        CoreModule,
        RestrictPlatformModule,
        ClickOutsideModule,
        CookiePopupModule
    ],
    providers: [
        NgbActiveModal
    ],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
