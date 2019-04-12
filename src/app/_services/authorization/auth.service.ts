import {Injectable} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private localStorageService: LocalStorageService, private http: HttpClient) {}

    // Check if user is authenticated
    public isAuthenticated(): boolean {
        const token = this.getToken();

        return !!token;
    }

    public getToken(): string {
        return this.localStorageService.getAccessToken();
    }
}
