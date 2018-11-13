import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, share, tap} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly urlCheckUser = environment.backend + 'gebruikers/checkUser';
  readonly urlCheckPass = environment.backend + 'gebruikers/checkPass';

  constructor(private http: HttpClient) { }

  checkUser(username) {
    const params = new HttpParams().set('username', username);

    return this.http.post(this.urlCheckUser, {username:username});
        .subscribe(
            req => {
                console.log(req);
            },
            err => {
                console.log('Error occured');
            }
        );
  }

  checkPass(username, password){
    const params = new HttpParams()
            .set('password', password)
            .set('username', username);

    return this.http.post(this.urlCheckPass, {params})
        .subscribe(
            req => {
                console.log(req);
            },
            err => {
                console.log('Error occured');
            }
        );
  }
}
