import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, share, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BierenService {

    readonly urlGetBierenByNaam = environment.backend + 'bieren/getByNaam';
    readonly urlGetAllBieren = environment.backend + 'bieren/getAll';

    constructor(private http: HttpClient) {
    }

    getBierenByNaam(naam): Observable<any> {
        const params = new HttpParams()                                 // (5)
            .set('naam', naam);

        return this.http.get(this.urlGetBierenByNaam, {params})
            .pipe(
                tap(req => console.log('get-request', req)),          // (6)
                catchError(                                                // (7)
                    (error) => {
                        console.log(error);
                        alert(error.message);
                        return EMPTY;
                    }),
                share()                                                    // (8)
            );
    }
}
