import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AuthService} from '../authorization/auth.service';
import {LoggedUserService} from './logged-user.service';

@Injectable({
    providedIn: 'root'
})
export class SignInService extends AuthService {

    readonly urlUsers = environment.backend + 'users';

    constructor(public http: HttpClient, private router: Router, private loggedUserService: LoggedUserService) {
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
                localStorage.removeItem('rememberAccessToken');
                localStorage.setItem('accessToken', JSON.stringify({
                    accessToken: data['id'],
                    userId: data['userId'],
                    expires: Date.parse(data['created']) + (data['ttl'] * 1000)
                }));
                this.accessToken$.next(data['id']);

                // set member in observable
                this.loggedUserService.user$.next(await this.getUser((data['userId'])));

                // redirect to previous page
                this.router.navigate(['search']);
            });
    }

    signInRememberedUser() {
        // check if accessToken is set in localStorage
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        if (accessToken) {
            // redirect to previous page
            this.router.navigate(['search']);
            return;
        }

        // check if rememberAccessToken is set in localStorage
        const rememberAccessToken = JSON.parse(localStorage.getItem('rememberAccessToken'));
        if (!rememberAccessToken) {
            return;
        }

        // set accessToken
        this.accessToken$.next(rememberAccessToken['accessToken']);

        this.http.get(this.urlUsers + '/' + rememberAccessToken['userId'] + '/accessTokens/' + rememberAccessToken['accessToken'], {headers: this.beerlessAuthHeaders})
            .toPromise()
            .then(async data => {
                // If expire dates don't match, return
                if (Date.now() > (Date.parse(data['created']) + (data['ttl'] * 1000))) {
                    return;
                }

                // set accessToken in localStorage
                localStorage.setItem('accessToken', JSON.stringify({
                    accessToken: data['id'],
                    userId: data['userId'],
                    expires: Date.parse(data['created']) + (data['ttl'] * 1000)
                }));

                // set member in observable
                this.loggedUserService.user$.next(await this.getUser((data['userId'])));
            });

        // remove rememberedAccessToken from localStorage
        localStorage.removeItem('rememberAccessToken');

        // redirect to previous page
        this.router.navigate(['search']);
    }

    getUser(userId) {
        return this.http.get(this.urlUsers + '/' + userId, {headers: this.beerlessAuthHeaders})
            .toPromise();
    }
}
