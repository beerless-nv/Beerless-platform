import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EMPTY, Observable} from 'rxjs';
import {catchError, share, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BeertypesService {

    readonly urlGetAllBeertypes = environment.backend + 'beertype/all';

    constructor(private http: HttpClient) {
    }

    getAllBeertypes(): Observable<any> {
        return this.http.get(this.urlGetAllBeertypes)
            .pipe(
                tap(),
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
