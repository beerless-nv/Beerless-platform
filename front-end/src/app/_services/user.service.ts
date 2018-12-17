import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly URLUsers = environment.backend + 'users';

    constructor(private http: HttpClient) {
    }

    getUserById(userId) {
        return this.http.get(this.URLUsers + '/' + userId)
            .toPromise()
            .then(data => data['user']);
    }
}
