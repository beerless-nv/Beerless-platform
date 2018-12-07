import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, share, tap} from 'rxjs/operators';
import {EMPTY, Observable, BehaviorSubject} from 'rxjs';
import {User} from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    readonly urlSignIn = environment.backend + 'users/signIn';
    readonly urlSignUp = environment.backend + 'users/signUp';
    userData$: BehaviorSubject<User> = new BehaviorSubject(null);

    constructor(private http: HttpClient) {
        if (localStorage.getItem('user')) {
            this.userData$.next(JSON.parse(localStorage.getItem('user')));
        }
    }

    // Authenticate user through API
    signIn(username, password) {
        return this.http.post(this.urlSignIn, {
            username: username,
            password: password
        })
            .toPromise()
            .then(data => {
                localStorage.removeItem('user');
                console.log(data);
                this.setUserData(data['user'], data['token']);
            })
            .then(() => {
                console.log(this.userData$);
            });
    }

    // Create user through API
    signUp(user) {
        return this.http.post(this.urlSignUp, {
            inputArray: user
        })
            .toPromise()
            .then(data => {
                console.log(data);
                return data;
            });
    }

    // Locally log the user out
    logout() {
        this.userData$.next(null);
        localStorage.removeItem('user');
    }

    getUserData() {
        return this.userData$;
    }

    // Locally log the user int
    private setUserData(user, token: string) {
        if (user !== null) {
            this.userData$.next({
                id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                picture: user.picture || 'https://avatars.dicebear.com/v2/identicon/' + user.email + '.svg',
                userType: user.userType,
                token: token,
            });
            this.userData$.subscribe(data => localStorage.setItem('user', JSON.stringify(data)));

            console.log(user);
        } else {
            this.userData$.next(null);
        }
    }
}
