import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {AuthGuardService} from './authorization/auth-guard.service';
import {AuthService} from './authorization/auth.service';
import {RoleGuardService} from './authorization/role-guard.service';
import {ErrorInterceptor} from './interceptors/errorInterceptor';
import {LoggedUserService} from './logged-user.service';

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
            useClass: ErrorInterceptor,
            multi: true
        },
        CookieService,
        LoggedUserService
    ]
})
export class CoreModule {
}
