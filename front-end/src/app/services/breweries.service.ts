import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, share, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BreweriesService {

    readonly urlGetBreweriesByName = environment.backend + 'brewery/getByName';
    readonly urlGetAllBreweries = environment.backend + 'brewery/allNameId';

    constructor(private http: HttpClient) {
    }

    getBreweriesByName(name): Observable<any> {
        const params = new HttpParams()
            .set('name', name);

        return this.http.get(this.urlGetBreweriesByName, {params})
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

    getAllBreweries(): Observable<any> {
        return this.http.get(this.urlGetAllBreweries)
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
