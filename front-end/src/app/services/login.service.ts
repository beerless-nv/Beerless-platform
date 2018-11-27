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

    readonly urlSignIn = environment.backend + 'user/signIn';
    readonly urlSignUp = environment.backend + 'user/signUp';
    userData$: BehaviorSubject<User> = new BehaviorSubject(null);

    constructor(private http: HttpClient) {
    }

    // Authenticate user through API
    signIn(username, password): Observable<any> {
        return this.http.post(this.urlSignIn, 
            {
                username : username,
                password : password
            }).pipe(
                tap(function(req) {                    
                    if(req['success'] == true){
                                             
                        console.log(req); 
                        this.setUserData(req['user'], req['token']);  
                    }
                }),
                catchError(
                    (error) => {
                        if(error['error'] && error['error']['errors']){
                            console.log(error['error']['errors']);
                        }                        
                        return EMPTY;
                    }),
                share()
            )
    }

    // Create user through API
    signUp(username, email, password): Observable<any> {
        return this.http.post(this.urlSignUp,
            {
                username : username,
                email : email,
                password : password
            }).pipe(
                tap(function(req){

                }),
                catchError(
                    (error) => {
                        console.log('error' + error);
                        return EMPTY;
                }),
                share()
            )
    }

    // Locally log the user out
    logout(){        
        this.userData$.next(null);
    }

    // Locally log the user int
    private setUserData(user, token: string){        
        console.log(user);
        if (user !== null) {
            this.userData$.next({
                id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                profilepicture: user.profilepicture || 'https://avatars.dicebear.com/v2/identicon/' + user.username + '.svg',
                userType: user.userType,
                token: token,
            });
        } else {
            this.userData$.next(null);
        }
    }
}
