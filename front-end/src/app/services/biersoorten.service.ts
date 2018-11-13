import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EMPTY, Observable} from 'rxjs';
import {catchError, share, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BiersoortenService {

    readonly urlGetAllBiersoorten = environment.backend + 'biersoorten/all';

    constructor(private http: HttpClient) {
    }

    getAllBiersoorten(): Observable<any> {
        return this.http.get(this.urlGetAllBiersoorten)
            .pipe(
                tap(req => console.log('get-request', req)),
                catchError(
                    (error) => {
                        console.log(error);
                        alert(error.message);
                        return EMPTY;
                    }),
                share()
            );
    }
}
