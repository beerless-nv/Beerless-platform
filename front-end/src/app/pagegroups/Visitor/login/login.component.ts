import {Component, OnInit, Testability} from '@angular/core';
import {LoginService} from '../../../_services/login.service';
import {ErrorService} from '../../../_services/error.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider} from 'angular-6-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {

    isRegistrated = true;
    user = {};

    messageLogin;
    formLogin: FormGroup;

    constructor(public loginService: LoginService, private errorService: ErrorService, private router: Router, private socialAuthService: AuthService) {
    }

    ngOnInit() {
        this.formLogin = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });

        this.loginService.messageLogin$.subscribe(data => this.messageLogin = data);
    }

    login() {
        this.user = this.formLogin.value;
        this.loginService.signIn(this.user['username'], this.user['password']);
        this.loginService.userData$.subscribe(data => {
            if (data != null) {
                this.router.navigate(['/']);
            }
        });
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
                this.loginService.setUserSocialData(userData);
            }
        );
    }
}
