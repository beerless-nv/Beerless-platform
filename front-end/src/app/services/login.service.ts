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
    readonly urlUser = environment.backend + 'users';
    readonly urlUserSocial = environment.backend + 'usersocials';

    userData$: BehaviorSubject<User> = new BehaviorSubject(null);

    messageLogin$: BehaviorSubject<Array<string>> = new BehaviorSubject(null);
    messageRegister$: BehaviorSubject<Array<string>> = new BehaviorSubject(null);
    errorMessageArray = [];

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
            .catch(error => {
                this.errorMessageArray = error.error['msg'];
                for (let i = 0; i < this.errorMessageArray.length; i++) {
                    switch (this.errorMessageArray[i]) {
                        case 'username_required':
                            this.errorMessageArray[i] = 'Vul een gebruikersnaam in!';
                            break;
                        case 'password_required':
                            this.errorMessageArray[i] = 'Vul een wachtwoord in!';
                            break;
                        case 'user_does_not_exist':
                            this.errorMessageArray[i] = 'Deze gebruikersnaam bestaat niet!';
                            break;
                        case 'password_incorrect':
                            this.errorMessageArray[i] = 'Wachtwoord is fout!';
                            break;
                    }
                }
                this.messageLogin$.next(this.errorMessageArray);

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
            .catch(error => {
                this.errorMessageArray = error.error['msg'];
                for (let i = 0; i < this.errorMessageArray.length; i++) {
                    switch (this.errorMessageArray[i]) {
                        case 'username_required':
                            this.errorMessageArray[i] = 'Vul een gebruikersnaam in!';
                            break;
                        case 'username_not_unique':
                            this.errorMessageArray[i] = 'Deze gebruikersnaam bestaat al!';
                            break;
                        case 'email_required':
                            this.errorMessageArray[i] = 'Vul een e-mailadres in!';
                            break;
                        case 'email_not_valid':
                            this.errorMessageArray[i] = 'Vul een geldig e-mailadres in!';
                            break;
                        case 'email_not_unique':
                            this.errorMessageArray[i] = 'Dit e-mailadres is al in gebruik!';
                            break;
                        case 'password_required':
                            this.errorMessageArray[i] = 'Vul een wachtwoord in!';
                            break;
                    }
                }
                this.messageRegister$.next(this.errorMessageArray);
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

    // Locally log the user in
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

    setUserSocialData(user) {
        if (user !== null) {
            this.userData$.next({
                id: user.id,
                username: '',
                firstname: user.name.substr(0, user.name.indexOf(' ')),
                lastname: user.name.substr(user.name.indexOf(' ') + 1),
                email: user.email,
                picture: user.image || 'https://avatars.dicebear.com/v2/identicon/' + user.email + '.svg',
                userType: 0,
                token: user.token,
            });
            this.userData$.subscribe(data => localStorage.setItem('user', JSON.stringify(data)));

            this.getUserSocial('socialID', user.id)
                .then(data => {
                    const usersocials = data['usersocials'];
                    console.log(usersocials.length);
                    if (usersocials.length === 0) {
                        this.insertUser({
                            firstname: user.name.substr(0, user.name.indexOf(' ')),
                            lastname: user.name.substr(user.name.indexOf(' ') + 1),
                            email: user.email
                        })
                            .then(newUserObject => {
                                const newUser = newUserObject['user'];
                                console.log(
                                    newUserObject
                                );
                                this.insertUserSocial({
                                    userID: newUser.ID,
                                    socialID: user.id,
                                    socialPlatform: user.provider,
                                    picture: user.image
                                });
                            });
                    } else {
                        console.log('al geregistreerd');
                    }
                });
        } else {
            this.userData$.next(null);
        }
    }

    getUserSocial(propName, value) {
        return this.http.post(this.urlUserSocial + '/search', {
            searchParams: [{
                propName: propName,
                value: value,
                operator: 'like'
            }]
        })
            .toPromise();
    }

    insertUser(user) {
        return this.http.post(this.urlUser, {
            inputObject: user
        })
            .toPromise();
    }

    insertUserSocial(usersocial) {
        return this.http.post(this.urlUserSocial, {
            inputObject: usersocial
        })
            .toPromise();
    }
}
