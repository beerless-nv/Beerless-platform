import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BeertypeService {

    readonly urlGetAllBeertypes = environment.backend + 'beertypes';

    constructor(private http: HttpClient) {
    }

    getAllBeertypes() {
        return this.http.get(this.urlGetAllBeertypes)
            .toPromise()
            .then( data => {
                return data;
            });
    }
}
