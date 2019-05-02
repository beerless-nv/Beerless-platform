import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BreweryService {

    readonly urlBrewery = environment.backend + 'breweries';

    constructor(private http: HttpClient) {
    }

    getBreweriesByName(name, value) {
        const params = new HttpParams()
            .set('value', 'ID,name');

        return this.http.post(this.urlBrewery + '/search', {
            searchParams: [{
                propName: name,
                value: value
            }, { params }]
        })
            .toPromise()
            .then(data => {
                console.log(data);
                return data['breweries'];
            });
    }

    getBreweryById(id) {

        const params = new HttpParams()
            .append('filter[include]', 'contact')
            .append('filter[include]', 'beers');

        return this.http.get(this.urlBrewery + '/' + id, { params });
    }

    getAllBreweries() {
        const params = new HttpParams()
            .set('value', 'ID,name');

        return this.http.get(this.urlBrewery, { params })
            .toPromise()
            .then(data => {
                console.log(data);
                return data['breweries'];
            });
    }
}
