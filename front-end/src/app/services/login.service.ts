import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, share, tap} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    readonly urlSignIn = environment.backend + 'gebruikers/signIn';
    readonly urlSignUp = environment.backend + 'gebruikers/signUp';
    userData$;

    constructor(private http: HttpClient) {
    }

    signIn(username, password): Observable<any> {
        return this.http.post(this.urlSignIn, 
            {
                username : username,
                password : password
            }).pipe(
                tap(function(req) {                    
                    if(req['success'] == true){
                        this.userData = req['user'];
                        console.log('user', this.userData);
                    }
                }),
                catchError(
                    (error) => {
                        console.log(error);
                        return EMPTY;
                    }),
                share()
            )
    }

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
}
