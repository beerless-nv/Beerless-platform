import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    accessToken$: BehaviorSubject<string> = new BehaviorSubject(null);
    beerlessAuthHeader: any;

    constructor(public http: HttpClient) {
        // Set token when loading app
        this.setToken();

        // Authentication params which are needed for 'member only' spaces
        this.accessToken$.subscribe(data => {
            this.beerlessAuthHeaders = data;
        });
    }

    /**
     * Getter and Setter for beerlessAuthHeader
     */
    get beerlessAuthHeaders() {
        return this.beerlessAuthHeader;
    }

    set beerlessAuthHeaders(data) {
        this.beerlessAuthHeader = {
            Authorization: data
        };
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
