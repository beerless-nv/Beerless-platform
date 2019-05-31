import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../core/authorization/auth.service';
import {LoggedUserService} from '../../../core/user/logged-user.service';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {

    private readonly urlUsers = environment.backend + 'users';

    constructor(public http: HttpClient, private loggedUserService: LoggedUserService, private auth: AuthService) {
    }

    updateProfile(user: any) {
        const userId = this.loggedUserService.user$.value.id;

        return this.http.patch(this.urlUsers + '/' + userId, user, {headers: this.auth.beerlessAuthHeaders})
            .toPromise()
            .then(data => true)
            .catch(err => err);
    }

    resetPassword(currentPassword, password) {
        return this.http.post(this.urlUsers + '/reset-password', {currentPassword: currentPassword, newPassword: password}, {headers: this.auth.beerlessAuthHeaders})
            .toPromise()
            .then(data => true)
            .catch(err => err);
    }
}
