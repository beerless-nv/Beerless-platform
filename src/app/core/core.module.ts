import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {AuthGuardService} from './authorization/auth-guard.service';
import {AuthService} from './authorization/auth.service';
import {RoleGuardService} from './authorization/role-guard.service';
import {ErrorHandlerModule} from './error-handler/error-handler.module';
import {ErrorInterceptor} from './interceptors/errorInterceptor';
import {LoggedUserService} from './user/logged-user.service';
import {SignInService} from './user/sign-in.service';
import {SignOutService} from './user/sign-out.service';

@NgModule({
    imports: [
        CommonModule,
        ErrorHandlerModule,
    ],
    declarations: [
    ],
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
        LoggedUserService,
        SignInService,
        SignOutService
    ],
    exports: [
    ]
})
export class CoreModule {
}
