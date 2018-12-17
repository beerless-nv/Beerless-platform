import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {}

    // Check if user is authenticated
    public isAuthenticated(): boolean {
        const jwtHelper = new JwtHelperService();

        const user = JSON.parse(localStorage.getItem('user'));
        // Check whether the token is expired and return
        // true or false
        if (user != null) {
            return !jwtHelper.isTokenExpired(user.token);
        } else {
            return false;
        }
    }
}
