import {HttpParamsOptions} from '@angular/common/http/src/params';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    accessToken: string;
    beerlessAuthParams;

    constructor(public http: HttpClient) {
        // Set token when loading app
        this.setToken();

        // Authentication params which are needed for 'member only' spaces
        this.beerlessAuthParams = {
            access_token: this.accessToken
        };
    }

    /**
     * Check if member is authenticated.
     */
    public isAuthenticated(): boolean {
        this.setToken();

        const token = this.accessToken;

        return !!token;
    }

    /**
     * Get token from Local Storage.
     */
    public getToken(): string {
        return localStorage.getItem('accessToken');
    }

    /**
     * If accessToken is empty, assign token from Local Storage.
     */
    public setToken() {
        if (this.accessToken !== this.getToken()) {
            this.accessToken = this.getToken();
        }
    }
}
