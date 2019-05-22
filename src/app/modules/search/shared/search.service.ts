import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    readonly urlBeerSearch = environment.backend + '/beers';

    headers = new HttpHeaders()
        .append('ignoreLoadingBar', '');

    constructor(public http: HttpClient) {
    }

    search(q, from, size) {
        const params = new HttpParams()
            .append('q', q)
            .append('from', from)
            .append('size', size);

        if (q) {
            return this.http.get(this.urlBeerSearch + '/search', {params});
        }
    }

    suggest(q) {
        const params = new HttpParams()
            .append('q', q);

        if (q) {
            return this.http.get(this.urlBeerSearch + '/suggest', {params, headers: this.headers});
        }
    }
}
