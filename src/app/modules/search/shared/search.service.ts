import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {empty} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    readonly urlBeerSearch = environment.backend + 'beers';
    readonly urlBrewerySearch = environment.backend + 'breweries';

    headers = new HttpHeaders()
        .append('ignoreLoadingBar', '');

    constructor(public http: HttpClient) {
    }

    search(q, from, size, type) {
        const params = new HttpParams()
            .append('q', q)
            .append('from', from)
            .append('size', size);

        if (q) {
            let result;

            switch (type) {
                case 'Beer':
                    result = this.http.get(this.urlBeerSearch + '/search', {params, headers: this.headers});
                    break;
                case 'Brewery':
                    result = this.http.get(this.urlBrewerySearch + '/search', {params, headers: this.headers});
                    break;
            }

            return result;
        }
        return empty();
    }

    async suggest(q, type) {
        const result = [];

        if (q) {
            let paramsBeer = new HttpParams()
                .append('q', q);

            let paramsBrewery = new HttpParams()
                .append('q', q);

            // type based params
            switch (type) {
                case 'Beer':
                    paramsBeer = paramsBeer
                        .append('size', '3');
                    paramsBrewery = paramsBrewery
                        .append('size', '2');
                    break;
                case 'Brewery':
                    paramsBeer = paramsBeer
                        .append('size', '2');
                    paramsBrewery = paramsBrewery
                        .append('size', '3');
                    break;
            }

            // requests for suggestions
            const beerSuggestions = await this.http.get(this.urlBeerSearch + '/suggest', {
                params: paramsBeer,
                headers: this.headers
            }).toPromise();

            const brewerySuggestions = await this.http.get(this.urlBrewerySearch + '/suggest', {
                params: paramsBrewery,
                headers: this.headers
            }).toPromise();

            // push responses to array
            result.push({
                type: 'Beer',
                size: paramsBeer.get('size'),
                results: beerSuggestions
            });

            result.push({
                type: 'Brewery',
                size: paramsBrewery.get('size'),
                results: brewerySuggestions
            });

            // sort result array
            result.sort((a, b) => (a.size < b.size) ? 1 : -1);
            console.log(result);
        }

        return result;
    }
}
