import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
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

    constructor(private signInService: SignInService, private authService: AuthService, private router: Router, private route: ActivatedRoute, private cookieService: CookieService) {
        route.queryParams.subscribe(params => {
            this.showRemembered = !!params['remembered'];
        });
    }

    ngOnInit() {
        if (this.cookieService.get('r-u-data')) {
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
        const user = JSON.parse(this.cookieService.get('r-u-data'));
        if (user) {
            this.rememberedUser = user;
        }
    }
}
