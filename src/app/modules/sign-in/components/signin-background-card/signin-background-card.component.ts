import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/authorization/auth.service';
import {SignInService} from '../../../../core/user/sign-in.service';

@Component({
    selector: 'app-signin-background-card',
    templateUrl: './signin-background-card.component.html',
    styles: []
})
export class SigninBackgroundCardComponent implements OnInit {

    showAutoLogin = false;
    rememberedUser: any;

    constructor(private signInService: SignInService, private authService: AuthService) {
    }

    ngOnInit() {
        if (localStorage.getItem('accessToken') || localStorage.getItem('rememberAccessToken')) {
            this.showAutoLogin = true;
            this.getRememberedUser();
        }
    }

    signInRememberedUser() {
        this.signInService.signInRememberedUser();
    }

    async getRememberedUser() {
        // check accessToken
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        if (accessToken) {
            this.authService.accessToken$.next(accessToken['accessToken']);
            this.rememberedUser = await this.signInService.getUser(accessToken['userId']);
        }

        // check rememberAccessToken
        const rememberAccessToken = JSON.parse(localStorage.getItem('rememberAccessToken'));
        if (rememberAccessToken) {
            this.authService.accessToken$.next(rememberAccessToken['accessToken']);
            this.rememberedUser = await this.signInService.getUser(rememberAccessToken['userId']);
        }
    }
}
