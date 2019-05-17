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
        document.cookie = 'username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/';

        console.log('ok');
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
        const token = this.accessToken$.value;

        return !!token;
    }
}
