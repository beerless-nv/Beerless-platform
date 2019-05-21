import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../../../environments/environment';
import {AuthService} from '../../../../core/authorization/auth.service';
import {LoggedUserService} from '../../../../core/user/logged-user.service';
import {SignInService} from '../../../../core/user/sign-in.service';
import {ChatbotService} from '../../../../shared/components/chatbot/chatbot.service';

@Component({
    selector: 'app-signin-form',
    templateUrl: './signin-form.component.html',
    styles: []
})
export class SigninFormComponent implements OnInit {

    showRemembered = false;

    constructor(private router: Router, private route: ActivatedRoute, private signInService: SignInService, private loggedUserService: LoggedUserService, private authService: AuthService, private cookieService: CookieService, private chatbotService: ChatbotService) {
        route.queryParams.subscribe(params => {
            this.showRemembered = !!params['remembered'];
        });
    }

    ngOnInit() {
    }

    signIn(credentials) {
        this.signInService.signIn(credentials).subscribe(data => {

            // set access_token in local storage and auth service
            this.cookieService.delete('r-u-data');

            // set new access_token and userId cookie
            document.cookie = 'access_token=' + data['id'] + ';expires=' + new Date(Date.parse(data['created']) + (data['ttl'] * 1000)) + ';domain=' + environment.domain + ';path=/';
            document.cookie = 'userId=' + data['userId'] + ';expires=' + new Date(Date.parse(data['created']) + (data['ttl'] * 1000)) + ';domain=' + environment.domain + ';path=/';

            // close chatbot
            sessionStorage.removeItem('chatbotSession');
            this.chatbotService.isOpen$.next(false);
            this.chatbotService.messages.next(null);

            // redirect to previous page
            this.router.navigate(['/']);
        });
    }
}
