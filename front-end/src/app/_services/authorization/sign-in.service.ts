import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LocalStorageService} from "../local-storage.service";
import {BehaviorSubject} from "rxjs";
import {User} from "../../_interfaces/user";

@Injectable({
    providedIn: 'root'
})
export class SignInService {

    readonly urlUsers = environment.backend + 'users';

    userData$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    }

    signIn(user) {
        // Change object, if email is filled in, in order to send it correctly to the API.
        if (user.username.indexOf('@') >= 0) {
            user.email = user.username;
            user.username = null;
        }

        // const header = Hea

        return this.http.post(this.urlUsers + '/login', user)
            .toPromise()
            .then(data => {
                // delete previous access token
                // this.deletePreviousAccessToken(data['userId']);

                // set access_token in local storage
                this.localStorageService.setAccessToken(data['id']);

                // set user in local storage
                this.getUser(data['userId']).then(currentUser => {
                    this.localStorageService.setUser(currentUser);
                    this.userData$.next(currentUser);
                });
            });
    }

    getUser(userId) {
        return this.http.get(this.urlUsers + '/' + userId)
            .toPromise();
    }

    deletePreviousAccessToken(userId) {
        return this.http.delete(this.urlUsers + '/' + userId + '/accessTokens')
            .toPromise();
    }
}
