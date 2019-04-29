import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    accessToken$: BehaviorSubject<any> = new BehaviorSubject(null);
    beerlessAuthHeaders;

    constructor(public http: HttpClient) {
        // Set token when loading app
        this.setToken();

        // Authentication params which are needed for 'member only' spaces
        this.accessToken$.subscribe(data => {
            this.beerlessAuthHeaders = new HttpHeaders({
                Authorization: data
            });
        });
    }

    /**
     * Check if member is authenticated.
     */
    public isAuthenticated(): boolean {
        this.setToken();

        const token = this.accessToken$.value;

        return !!token;
    }

    /**
     * Get token from Local Storage.
     */
    public getToken(): string {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        if (accessToken) {
            return accessToken['accessToken'];
        }

        const rememberAccessToken = JSON.parse(localStorage.getItem('rememberAccessToken'));
        if (rememberAccessToken) {
            return rememberAccessToken['accessToken'];
        }
    }

    /**
     * If accessToken is empty, assign token from Local Storage.
     */
    public setToken() {
        if (this.accessToken$.value !== this.getToken()) {
            this.accessToken$.next(this.getToken());
        }
    }
}
