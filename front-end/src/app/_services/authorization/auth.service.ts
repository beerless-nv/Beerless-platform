import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LocalStorageService} from '../local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private localStorageService: LocalStorageService) {}

    // Check if user is authenticated
    public isAuthenticated(): boolean {
        // const jwtHelper = new JwtHelperService();
        //
        // const user = this.localStorageService.getUser();
        // // Check whether the token is expired and return
        // // true or false
        // if (user != null) {
        //     return !jwtHelper.isTokenExpired(user.token);
        // } else {
        //     return false;
        // }
        return true;
    }

    public getToken(): string {
        return this.localStorageService.getAccessToken();
    }
}
