import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {ChatbotService} from '../../shared/components/chatbot/chatbot.service';
import {AuthService} from '../authorization/auth.service';
import {LoggedUserService} from './logged-user.service';

@Injectable({
    providedIn: 'root'
})
export class SignOutService {

    readonly urlUsers = environment.backend + 'users';

    constructor(public http: HttpClient, private loggedUserService: LoggedUserService, private router: Router, private cookieService: CookieService, private auth: AuthService, private chatbotService: ChatbotService) {
    }

    logout(user) {
        this.http.post(this.urlUsers + '/logout', {}, {headers: this.auth.beerlessAuthHeaders})
            .subscribe(() => {
                // Set r-u-data cookie to remember user
                const remeberUserObject = {
                    picture: user.picture,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username
                };
                const date = new Date(Date.now());
                date.setFullYear(date.getFullYear() + 1);
                this.cookieService.set('r-u-data', JSON.stringify(remeberUserObject), date , '/');

                // Remove accessToken and userId from cookies, clear user object and remove chatbotSession
                document.cookie = 'access_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=' + environment.domain + ';path=/';
                document.cookie = 'userId=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=' + environment.domain + ';path=/';
                this.auth.accessToken$.next(null);
                this.loggedUserService.user$.next(null);

                // close chatbot
                sessionStorage.removeItem('chatbotSession');
                this.chatbotService.isOpen$.next(false);
                this.chatbotService.messages.next(null);

                // Redirect to login
                this.router.navigate(['sign-in']);
            });
    }
}
