import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
    messageLogin$: BehaviorSubject<string> = new BehaviorSubject(null);
    messageRegister$: BehaviorSubject<string> = new BehaviorSubject(null);

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
                this.setUserData(data['user'], data['token']);
            })
            .catch( error => {
                switch (error.error.msg) {
                    case 'username_required':
                        this.messageLogin$.next('Vul een gebruikersnaam in!');
                        break;
                    case 'password_required':
                        this.messageLogin$.next('Vul een wachtwoord in!');
                        break;
                    case 'user_does_not_exist':
                        this.messageLogin$.next('Deze gebruikersnaam bestaat niet!');
                        break;
                    case 'password_incorrect':
                        this.messageLogin$.next('Wachtwoord is fout!');
                        break;
                }
            });
    }

    // Create user through API
    signUp(user) {
        const headers = new HttpHeaders();
        headers.append('X-Requested-With', 'XMLHttpRequest');

        return this.http.post(this.urlSignUp, {
            inputObject: user
        }, {headers: headers})
            .toPromise()
            .then(data => {
                console.log(data);
                return data;
            })
            .catch( error => {
                console.log(error.error.msg);
                switch (error.error.msg) {
                    case 'username_required':
                        this.messageRegister$.next('Vul een gebruikersnaam in!');
                        break;
                    case 'username_not_unique':
                        this.messageRegister$.next('Deze gebruikersnaam bestaat al!');
                        break;
                    case 'email_required':
                        this.messageRegister$.next('Vul een e-mailadres in!');
                        break;
                    case 'email_not_valid':
                        this.messageRegister$.next('Vul een geldig e-mailadres in!');
                        break;
                    case 'email_not_unique':
                        this.messageRegister$.next('Dit e-mailadres is al in gebruik!');
                        break;
                    case 'password_required':
                        this.messageRegister$.next('Vul een wachtwoord in!');
                        break;
                }
            });
    }

    // Locally log the user out
    logout() {
        this.userData$.next(null);
        this.messageLogin$.next(null);
        this.messageRegister$.next(null);
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
