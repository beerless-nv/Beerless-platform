import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService} from './authorization/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedUserService extends AuthService {

    readonly urlUsers = environment.backend + 'users';
    user$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public http: HttpClient) {
        super(http);

        if (localStorage.getItem('accessToken')) {
            this.getLoggedUser();
        }
    }

    getLoggedUser() {
        this.http.get(this.urlUsers + '/getLoggedUser', {params: this.beerlessAuthParams})
            .toPromise()
            .then(data => {
                this.user$.next(data);
            });
    }
}
