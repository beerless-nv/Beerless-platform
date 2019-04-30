import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../core/authorization/auth.service';
import {SignInService} from '../../../../core/user/sign-in.service';
import {SigninRememberFormComponent} from '../signin-form/signin-remember-form/signin-remember-form.component';

@Component({
    selector: 'app-signin-background-card',
    templateUrl: './signin-background-card.component.html',
    styles: []
})
export class SigninBackgroundCardComponent implements OnInit {

    showAutoLogin = false;
    rememberedUser: any;
    showRemembered = false;

    constructor(private signInService: SignInService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
        route.queryParams.subscribe(params => {
            this.showRemembered = !!params['remembered'];
        });
    }

    ngOnInit() {
        if (localStorage.getItem('r-u-data')) {
            this.showAutoLogin = true;
            this.getRememberedUser();
        }
    }

    signInRememberedUser() {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                remembered: true
            }
        });
    }

    async getRememberedUser() {
        const user = JSON.parse(localStorage.getItem('r-u-data'));
        if (user) {
            this.rememberedUser = user;
        }
    }
}
