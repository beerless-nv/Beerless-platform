import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../core/authorization/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService extends AuthService {

    readonly urlResetPassword = environment.backend + 'users';

    constructor(public http: HttpClient) {
        super(http);
    }

    reset(email) {
        console.log(email);
        this.http.post(this.urlResetPassword + '/reset', {email: email.email})
            .toPromise()
            .then(data => console.log(data))
            .catch(err => console.error(err));
    }

    resetPassword(password, accessToken) {
        const params = new HttpParams()
            .set('access_token', accessToken);

        this.http.post(this.urlResetPassword + '/reset-password', {newPassword: password}, {params: params})
            .toPromise()
            .then(data => console.log(data))
            .catch(err => console.error(err));
    }
}
