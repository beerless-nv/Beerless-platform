import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {AuthService} from '../authorization/auth.service';
import {LoggedUserService} from './logged-user.service';

@Injectable({
    providedIn: 'root'
})
export class SignInService extends AuthService {

    readonly urlUsers = environment.backend + 'users';

    constructor(public http: HttpClient, private router: Router, private loggedUserService: LoggedUserService, private cookieService: CookieService) {
        super(http);
    }

    signIn(user) {
        // Change object, if email is filled in, in order to send it correctly to the API.
        if (user.username.indexOf('@') >= 0) {
            user.email = user.username;
            user.username = null;
        }

        return this.http.post(this.urlUsers + '/login', user)
            .toPromise()
            .then(async data => {
                // set access_token in local storage and auth service
                localStorage.removeItem('r-u-data');
                const accessToken = {
                    accessToken: data['id'],
                    userId: data['userId'],
                    expires: Date.parse(data['created']) + (data['ttl'] * 1000)
                };
                localStorage.setItem('accessToken', JSON.stringify(accessToken));
                this.cookieService.set('accessToken', accessToken.accessToken, new Date(accessToken.expires), '/');
                this.accessToken$.next(this.getToken());

                // set member in observable
                this.loggedUserService.user$.next(await this.getUser((data['userId'])));

                // redirect to previous page
                this.router.navigate(['search']);
            });
    }

    getUser(userId) {
        return this.http.get(this.urlUsers + '/' + userId, {headers: this.beerlessAuthHeaders$.value})
            .toPromise();
    }
}
