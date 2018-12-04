import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EMPTY, Observable} from 'rxjs';
import {catchError, share, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BeertypesService {

    readonly urlGetAllBeertypes = environment.backend + 'beertypes/';

    constructor(private http: HttpClient) {
    }

    getAllBeertypes() {
        return this.http.get(this.urlGetAllBeertypes)
            .toPromise()
            .then( data => {
                console.log(data);
                return data;
            });
    }
}
