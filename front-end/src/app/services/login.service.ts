import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, share, tap} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly urlLogin = environment.backend + 'gebruikers/checkUser';
  readonly urlTest = environment.backend + 'bieren/insert';

  constructor(private http: HttpClient) { }

  checkUser(username) {
    const params = new HttpParams()
        .set('username', username);

    return this.http.get(this.urlLogin, {params})
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
