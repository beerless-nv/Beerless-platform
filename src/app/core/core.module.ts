import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {AuthGuardService} from './authorization/auth-guard.service';
import {AuthService} from './authorization/auth.service';
import {RoleGuardService} from './authorization/role-guard.service';
import {MyHttpClientInterceptor} from './interceptors/My-HttpClientInterceptor';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        AuthService,
        AuthGuardService,
        RoleGuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyHttpClientInterceptor,
            multi: true
        },
        CookieService,
    ]
})
export class CoreModule {
}
