import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../core/authorization/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ApprovalSystemService {

    constructor(public http: HttpClient, private auth: AuthService) {
    }

    getEntries() {
        const params = new HttpParams()
            .append('filter[where][statusId]', '1')
            .append('filter[include]', 'editors')
            .append('filter[include]', 'activityTypes');

        return this.http.get(environment.backend + 'beers', {params: params, headers: this.auth.beerlessAuthHeaders});
    }

    getEntry(id: number) {
        const params = new HttpParams()
            .append('filter[where][statusId]', '1')
            .append('filter[include]', 'editors')
            .append('filter[include]', 'activityTypes')
            .append('filter[include]', 'breweries')
            .append('filter[include]', 'styleTags');

        return this.http.get(environment.backend + 'beers/' + id, {params: params, headers: this.auth.beerlessAuthHeaders});
    }

    acceptEntry(id: number, entry: any) {
        entry.statusId = 2;

        console.log(entry);

        // this.http.put(environment.backend + 'beers/' + id, entry, {headers: this.auth.beerlessAuthHeaders});
    }
}
