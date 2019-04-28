import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {LocalStorageService} from '../../../_services/local-storage.service';
import {BehaviorSubject} from 'rxjs';
import {LoggedUserService} from '../../../core/logged-user.service';

@Injectable({
    providedIn: 'root'
})
export class SignInService {

    readonly urlUsers = environment.backend + 'users';

    constructor(private http: HttpClient, private router: Router, private loggedUserService: LoggedUserService) {
        this.loggedUserService.user$.subscribe(data => console.log(data));
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
                // set access_token in local storage
                localStorage.setItem('accessToken', data['id']);

                // set member in local storage
                this.loggedUserService.user$.next(await this.getUser((data['userId'])));

                // redirect to previous page
                this.router.navigate(['search']);
            });
    }

    logout() {
        this.http.get(this.urlUsers + 'logout')
            .toPromise()
            .then(() => {
                localStorage.removeItem('accessToken');
                this.loggedUserService.user$.next(null);
            });
    }

    getUser(userId) {
        return this.http.get(this.urlUsers + '/' + userId)
            .toPromise();
    }

    deletePreviousAccessToken(userId) {
        return this.http.delete(this.urlUsers + '/' + userId + '/accessTokens')
            .toPromise();
    }
}
