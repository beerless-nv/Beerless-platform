import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, share, tap} from 'rxjs/operators';
import {EMPTY, Observable, BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {ToastService} from '../shared/components/toast/toast.service';
import {LocalStorageService} from './local-storage.service';
import {AuthService} from '../core/authorization/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    readonly urlSignIn = environment.backend + 'users/signIn';
    readonly urlSignUp = environment.backend + 'users/signUp';
    readonly urlUser = environment.backend + 'users/';
    readonly urlUserSocial = environment.backend + 'usersocials';

    userData$: BehaviorSubject<any> = new BehaviorSubject(null);

    messageLogin$: BehaviorSubject<Array<string>> = new BehaviorSubject(null);
    messageRegister$: BehaviorSubject<Array<string>> = new BehaviorSubject(null);
    errorMessageArray = [];

    constructor(private http: HttpClient, private router: Router, private toastsService: ToastService, private localStorageService: LocalStorageService, private authService: AuthService) {
        if (this.authService.isAuthenticated()) {
            this.userData$.next(this.localStorageService.getUser());
        } else {
            this.userData$.next(null);
        }
    }

    // Authenticate member through API
    signIn(username, password) {
        return this.http.post(this.urlSignIn, {
            username: username,
            password: password
        })
            .toPromise()
            .then(data => {
                this.localStorageService.clearUser();
                this.setUserData(data['member'].ID, data['token']);
            })
            .catch(error => {
                this.errorMessageArray = error.error['msg'];
                if (this.errorMessageArray != null) {
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
                } else {
                    this.errorMessageArray = null;
                }
                this.messageLogin$.next(this.errorMessageArray);

            });
    }

    // Locally log the member out
    logout() {
        this.userData$.next(null);
        this.messageLogin$.next(null);
        this.messageRegister$.next(null);
        this.localStorageService.clearUser();
        this.router.navigate(['']);
    }

    getUserData() {
        return this.userData$;
    }

    // Locally log the member in
    setUserData(userId: number, token) {
        if (userId !== null) {
            this.getCurrentUser(userId).then(data => {
                const user = data['member'];
                const usersocial = [];

                for (let i = 0; i < user.usersocial.length; i++) {
                    usersocial[i] = {
                        ID: user.usersocial[i].ID,
                        socialID: user.usersocial[i].socialID,
                        socialPlatform: user.usersocial[i].socialPlatform,
                        picture: user.usersocial[i].picture
                    };
                }
                // token
                user.token = token;

                // let socialpicture;
                if (user.usersocial.length > 0) {
                    user.picture = usersocial[0].picture;
                }

                this.localStorageService.setUser(user);
                this.userData$.next(user);
            });
        } else {
            this.userData$.next(null);
        }
    }

    // log in member via social login
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
                                const newUser = newUserObject['member'];

                                this.insertUserSocial({
                                    userID: newUser.ID,
                                    socialID: user.id,
                                    socialPlatform: user.provider,
                                    picture: 'https://graph.facebook.com/' + user.id + '/picture?height=500'
                                })
                                    .then(() => {
                                        const token = this.getToken(user.id);
                                        this.setUserData(newUser.ID, token);
                                    });

                            })
                            .then(() => {
                                this.router.navigate(['']);
                            });
                    } else {
                        this.router.navigate(['']);
                        this.getToken(user.id).then(token => {
                            this.setUserData(usersocials[0].userID, token);
                        });
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

    getCurrentUser(userId: number) {
        return this.http.get(this.urlUser + userId)
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

    getToken(socialID: string) {
        return this.http.post(this.urlUser + 'socialToken', {
            socialID: socialID
        })
            .toPromise()
            .then(data => {
                console.log(data);
                return data['token'];
            })
            .catch(error => {
                console.error(error);
            });
    }
}
