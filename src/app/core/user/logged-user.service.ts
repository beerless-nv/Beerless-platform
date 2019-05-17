import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthService} from '../authorization/auth.service';
import {ModalService} from '../modals/modal.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedUserService {

    readonly urlUsers = environment.backend + 'users';
    user$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public http: HttpClient, private router: Router, private cookieService: CookieService, private auth: AuthService, private modalService: ModalService) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                console.log(event.url);
                this.setToken();
                this.checkToken().then(isValid => {
                    if (isValid) {
                        this.getLoggedUser();
                    }
                });
            }
        });
    }

    getLoggedUser() {
        this.http.get(this.urlUsers + '/getLoggedUser', {headers: this.auth.beerlessAuthHeaders})
            .toPromise()
            .then(data => {
                this.user$.next(data);
                if (data['username'].indexOf('facebook.') === 0 || data['username'].indexOf('google.') === 0) {
                    this.modalService.showSocialCredential();
                }
            });
    }

    checkToken() {
        const accessToken = this.getToken();

        const params = new HttpParams()
            .append('token', accessToken);

        return this.http.get(this.urlUsers + '/checkToken', {params})
            .toPromise()
            .then(data => {
                if (data === false) {
                    this.cookieService.delete('access_token');
                    this.auth.accessToken$.next(null);
                }
                return data === true;
            })
            .catch(err => false);
    }


    /**
     * Get token from Cookie Service.
     */
    public getToken(): string {
        const accessToken = this.cookieService.get('access_token');
        if (accessToken) {
            return accessToken;
        }
    }

    /**
     * If accessToken is empty, assign token from Cookie Service.
     */
    public setToken() {
        if (this.auth.accessToken$.value !== this.getToken()) {
            this.auth.accessToken$.next(this.getToken());
        }
    }
}
