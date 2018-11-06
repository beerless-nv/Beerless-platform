import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, share, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BierenService {

    readonly url = 'http://localhost/Beerless-platform/back-end/public/bieren/getByNaam';

    constructor(private http: HttpClient) {
    }

    getBieren(naam): Observable<any> {
        const params = new HttpParams()                                 // (5)
            .set('naam', naam);

        return this.http.get(this.url, {params})
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
