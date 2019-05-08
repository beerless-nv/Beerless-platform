import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthService} from '../authorization/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedUserService extends AuthService {

    readonly urlUsers = environment.backend + 'users';
    user$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public http: HttpClient) {
        super(http);

        this.setToken();
        this.checkToken().then(isValid => {
            if (isValid) {
                this.getLoggedUser();
            }
        });
    }

    getLoggedUser() {
        this.http.get(this.urlUsers + '/getLoggedUser', {headers: this.beerlessAuthHeaders})
            .toPromise()
            .then(data => {
                this.user$.next(data);
            });
    }

    checkToken() {
        const accessToken = localStorage.getItem('accessToken');

        const params = new HttpParams()
                .append('token', accessToken);

        return this.http.get(this.urlUsers + '/checkToken', {params})
            .toPromise()
            .then(data => {
                if (data === false) {
                    localStorage.removeItem('accessToken');
                }
                return data === true;
            })
            .catch(err => false);
    }
}
