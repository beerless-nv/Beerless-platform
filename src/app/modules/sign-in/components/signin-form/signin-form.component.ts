import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../../../../core/authorization/auth.service';
import {LoggedUserService} from '../../../../core/user/logged-user.service';
import {SignInService} from '../../../../core/user/sign-in.service';

@Component({
    selector: 'app-signin-form',
    templateUrl: './signin-form.component.html',
    styles: []
})
export class SigninFormComponent implements OnInit {

    showRemembered = false;

    constructor(private router: Router, private route: ActivatedRoute, private signInService: SignInService, private loggedUserService: LoggedUserService, private authService: AuthService, private cookieService: CookieService) {
        route.queryParams.subscribe(params => {
            this.showRemembered = !!params['remembered'];
        });
    }

    ngOnInit() {
    }

    signIn(credentials) {
        this.signInService.signIn(credentials).subscribe(data => {
            // set access_token in local storage and auth service
            localStorage.removeItem('r-u-data');
            const accessToken = {
                accessToken: data['id'],
                userId: data['userId'],
                expires: Date.parse(data['created']) + (data['ttl'] * 1000)
            };
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            this.cookieService.set('accessToken', accessToken.accessToken, new Date(accessToken.expires), '/');
            this.authService.accessToken$.next(data['id']);

            console.log(localStorage.getItem('accessToken'));

            // set member in observable
            this.loggedUserService.user$.next(data['user']);

            // redirect to previous page
            this.router.navigate(['/']);
        });
    }

}
