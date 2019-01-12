import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BeerSearchResolverService implements Resolve<any> {

    readonly urlBeers = environment.backend + 'beers';

    constructor(private http: HttpClient) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<any> {

        const params = new HttpParams()
            .set('joinTables', 'brewery')
            .set('orderBy', 'timestampCreated.desc');

        return this.http.get(this.urlBeers, {params})
            .toPromise()
            .then(data => {
                return data['beers'];
            });
    }
}
