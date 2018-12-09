import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, share, tap} from 'rxjs/operators';
import {EMPTY, Observable, BehaviorSubject} from 'rxjs';
import {User} from '../interfaces/user';
import {Router} from '@angular/router';

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

    constructor(private http: HttpClient, private router: Router) {
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
                this.setUserData(data['user'].ID, data['token']);
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
    private setUserData(userId, token: string) {
        if (userId !== null) {
            this.getCurrentUser(userId).then(data => {
                const user = data['user'];
                const usersocial = [];

                for (let i = 0; i < user.usersocial.length; i++) {
                    usersocial[i] = {
                        ID: user.usersocial[i].ID,
                        socialID: user.usersocial[i].socialID,
                        socialPlatform: user.usersocial[i].socialPlatform,
                        picture: user.usersocial[i].picture
                    };
                }

                let socialpicture;
                if (user.usersocial.length > 0) {
                    console.log('leeg');
                    socialpicture = usersocial[0].picture;
                }

                this.userData$.next({
                    id: user.ID,
                    username: user.username,
                    firstname: user.firstName,
                    lastname: user.lastName,
                    email: user.email,
                    picture: user.picture || socialpicture || 'https://avatars.dicebear.com/v2/identicon/' + user.email + '.svg',
                    userType: user.userType,
                    token: token,
                    socials: usersocial,
                });
                console.log(data['user']);
                this.userData$.subscribe(userData => localStorage.setItem('user', JSON.stringify(userData)));
            });


        } else {
            this.userData$.next(null);
        }
    }

    setUserSocialData(user) {
        if (user !== null) {
            this.getUserSocial('socialID', user.id)
                .then(data => {
                    const usersocials = data['usersocials'];

                    if (usersocials.length === 0) {
                        this.insertUser({
                            firstname: user.name.substr(0, user.name.indexOf(' ')),
                            lastname: user.name.substr(user.name.indexOf(' ') + 1),
                            email: user.email
                        })
                            .then(newUserObject => {
                                const newUser = newUserObject['user'];
                                this.insertUserSocial({
                                    userID: newUser.ID,
                                    socialID: user.id,
                                    socialPlatform: user.provider,
                                    picture: user.image
                                })
                                    .then(() => {
                                        console.log('setUserData');
                                        this.setUserData(newUser.ID, '5');
                                    });

                            })
                            .then(() => {
                                this.router.navigate(['']);
                            });
                    } else {
                        this.router.navigate(['']);
                        this.setUserData(usersocials[0].userID, '5');
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

    getCurrentUser(userId) {
        return this.http.get(this.urlUser + '/' + userId)
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
