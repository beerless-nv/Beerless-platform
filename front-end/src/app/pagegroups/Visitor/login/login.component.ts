import {Component, OnInit, Testability} from '@angular/core';
import {LoginService} from '../../../_services/login.service';
import {ErrorService} from '../../../_services/error.service';
import {Observable, of, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider} from 'angular-6-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {

    registrationSuccessful = false;
    isRegistrated = true;
    messageLogin;
    messageRegister;
    user = {};

    formLogin: FormGroup;
    formRegister: FormGroup;

    constructor(public loginService: LoginService, private errorService: ErrorService, private router: Router, private socialAuthService: AuthService) {
    }

    ngOnInit() {
        this.formLogin = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });

        this.formRegister = new FormGroup({
            firstName: new FormControl('', [
                Validators.required
            ]),
            lastName: new FormControl('', [
                Validators.required
            ]),
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(25),
                Validators.pattern('^([a-zA-ZÀ-ÿ0-9-])*$')
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$')
            ]),
            picture: new FormControl('https://avatars.dicebear.com/v2/identicon/' + Math.random().toString(36).substr(0, 13) + '.svg'),
        });

        this.loginService.messageLogin$.subscribe(data => this.messageLogin = data);
        this.loginService.messageRegister$.subscribe(data => this.messageRegister = data);
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

    register() {
        this.loginService.signUp(this.formRegister.value).then(data => {
            if (data['success'] === true) {
                this.registrationSuccessful = true;
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
                console.log(socialPlatform + ' sign in data : ', userData);
                this.loginService.setUserSocialData(userData);
            }
        );
    }
}
