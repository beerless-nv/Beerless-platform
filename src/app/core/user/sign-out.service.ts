import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AuthService} from '../authorization/auth.service';
import {LoggedUserService} from './logged-user.service';

@Injectable({
    providedIn: 'root'
})
export class SignOutService extends AuthService {

    readonly urlUsers = environment.backend + 'users';

    constructor(public http: HttpClient, private loggedUserService: LoggedUserService, private router: Router) {
        super(http);
    }

    logout(user) {
        this.accessToken$.next(JSON.parse(localStorage.getItem('accessToken'))['accessToken']);

        this.http.post(this.urlUsers + '/logout', {}, {headers: this.beerlessAuthHeaders$.value})
            .subscribe(() => {
                // Set userId to remember user
                localStorage.setItem('r-u-data', JSON.stringify({
                    picture: user.picture,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username
                }));

                // Remove accessToken from localStorage and clear user object
                localStorage.removeItem('accessToken');
                this.accessToken$.next(null);
                this.loggedUserService.user$.next(null)

                // Redirect to login
                this.router.navigate(['sign-in']);
            });
    }
}
