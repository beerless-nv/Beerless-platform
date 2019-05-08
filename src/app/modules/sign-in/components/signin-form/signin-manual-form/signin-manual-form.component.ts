import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {LoginService} from '../../../../../_services/login.service';
import {AuthService} from '../../../../../core/authorization/auth.service';
import {LoggedUserService} from '../../../../../core/user/logged-user.service';
import {ErrorService} from '../../../../../shared/components/error/error.service';
import {Router} from '@angular/router';
import {SignInService} from '../../../../../core/user/sign-in.service';
import {SigninFormComponent} from '../signin-form.component';

@Component({
    selector: 'app-signin-manual-form',
    templateUrl: './signin-manual-form.component.html',
    styles: []
})
export class SigninManualFormComponent implements OnInit {

    user = {};
    serverSideMessages;
    formLogin: FormGroup;

    constructor(public signInService: SignInService, private errorService: ErrorService, private signinFormComponent: SigninFormComponent) {
    }

    ngOnInit() {
        this.formLogin = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });

        this.errorService.errorMessages$.subscribe(data => this.serverSideMessages = {type: 'error', data: data});
    }

    signIn() {
        this.signinFormComponent.signIn(this.formLogin.value);
    }

    socialLogin(socialPlatform: string) {
        // let socialPlatformProvider;
        // if (socialPlatform === 'facebook') {
        //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        // } else if (socialPlatform === 'google') {
        //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        // } else if (socialPlatform === 'linkedin') {
        //     socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
        // }
        //
        // this.socialAuthService.signIn(socialPlatformProvider).then(
        //     (userData) => {
        //         console.log(userData);
        //         // this.loginService.setUserSocialData(userData);
        //     }
        // );
    }
}
