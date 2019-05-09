import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from '../../../core/authorization/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SignUpService extends AuthService {

    readonly urlSignUp = environment.backend + 'users';

    constructor(public http: HttpClient) {
        super(http);
    }

    signUp(user) {
        return this.http.post(this.urlSignUp, user)
            .toPromise()
            .then(data => data)
            .catch(err => console.error(err));
    }

    sendVerificationEmail(userId) {
        const params = new HttpParams()
            .append('userId', userId);

        return this.http.get(this.urlSignUp + '/sendVerificationEmail', {params, headers: this.beerlessAuthHeaders});
    }

    verifyEmail(userId, verificationToken: string) {
        const params = new HttpParams()
            .append('uid', userId)
            .append('token', verificationToken);

        return this.http.get(this.urlSignUp + '/confirm', {params}).toPromise()
            .then(data => true)
            .catch(err => false);
    }
}
