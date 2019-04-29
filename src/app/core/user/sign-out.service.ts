import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AuthService} from '../authorization/auth.service';
import {LoggedUserService} from './logged-user.service';

@Injectable({
    providedIn: 'root'
})
export class SignOutService extends AuthService {

    readonly urlUsers = environment.backend + 'users';

    constructor(public http: HttpClient, private loggedUserService: LoggedUserService) {
        super(http);
    }

    signOut() {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));

        localStorage.setItem('rememberAccessToken', JSON.stringify({
            accessToken: accessToken['accessToken'],
            userId: accessToken['userId'],
            expires: accessToken['expires'],
        }));
        localStorage.removeItem('accessToken');
        this.accessToken$.next(null);
        this.loggedUserService.user$.next(null);
    }

    logout() {
        this.http.post(this.urlUsers + '/logout', {}, {headers: this.beerlessAuthHeaders})
            .toPromise()
            .then(() => {

            });
    }
}
