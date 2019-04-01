import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {

    readonly urlSignUp = environment.backend + 'users';

    constructor(private http: HttpClient) {
    }

    signUp(user) {
        return this.http.post(this.urlSignUp, user)
            .toPromise();
    }
}
