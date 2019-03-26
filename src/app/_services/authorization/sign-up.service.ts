import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {

    readonly urlSignUp = environment.backend + 'users/signUp';

    constructor(private http: HttpClient) {
    }

    signUp(user) {
        return this.http.post(this.urlSignUp, {
            inputObject: user
        })
            .toPromise()
            .then(data => {
                return data['success'];
            });
    }
}
