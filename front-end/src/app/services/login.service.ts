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
    readonly urlCheckUser = environment.backend + 'gebruikers/checkUser';
    readonly urlCheckPass = environment.backend + 'gebruikers/checkPass';
    readonly urlLogin = environment.backend + 'gebruikers/login';
    userData$;

    constructor(private http: HttpClient) {
    }

    checkUser(username, password): Observable<any> {
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
                        alert(error.message);
                        return EMPTY;
                    }),
                share()
            )
    }
}
