import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../../_services/login.service';
import {ErrorService} from '../../../../_services/error.service';
import {Router} from '@angular/router';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider} from 'angular-6-social-login';
import {SignInService} from "../../../../_services/authorization/sign-in.service";

@Component({
    selector: 'app-signin-form',
    templateUrl: './signin-form.component.html',
    styles: []
})
export class SigninFormComponent implements OnInit {

    user = {};
    messageLogin;
    formLogin: FormGroup;

    constructor(public signInService: SignInService, private errorService: ErrorService, private router: Router, private socialAuthService: AuthService) {
    }

    ngOnInit() {
        this.formLogin = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });

        // this.loginService.messageLogin$.subscribe(data => this.messageLogin = data);
    }

    signIn() {
        this.signInService.signIn(this.formLogin.value);

        // this.loginService.userData$.subscribe(data => {
        //     if (data != null) {
        //         this.router.navigate(['/']);
        //     }
        // });
    }

    socialLogin(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform === 'facebook') {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        } else if (socialPlatform === 'linkedin') {
            socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                console.log(userData);
                // this.loginService.setUserSocialData(userData);
            }
        );
    }
}