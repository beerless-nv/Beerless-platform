import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {AuthService} from '../authorization/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SignInService {

    readonly urlUsers = environment.backend + 'users';

    constructor(public http: HttpClient, private router: Router, private cookieService: CookieService, private auth: AuthService) {
    }

    signIn(user) {
        // Change object, if email is entered in order to send it correctly to the API.
        if (user.username.indexOf('@') >= 0) {
            user.email = user.username;
            user.username = null;
        }

        const params = new HttpParams()
            .append('include', 'User');

        return this.http.post(this.urlUsers + '/login', user, {params});
    }
}
