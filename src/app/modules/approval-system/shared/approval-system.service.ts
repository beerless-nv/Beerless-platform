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
        /**
         * {"where":{"statusId":"1"},"include":[{"relation":"activity","scope":{"include":["user","beer","brewery","article","activityType"]}},{"relation":"beerEntry","scope":{"include":["beerstyleEntries","beerFromBreweryEntries"]}},{"relation":"breweryEntry","scope":{"include":"contactEntry"}},"articleEntry"]}
         */
        const params = new HttpParams()
            .append('filter', '{"where":{"statusId":"1"},"include":[{"relation":"activity",' +
                '"scope":{"include":["user","activityType"]}},"beerEntry","breweryEntry","articleEntry"]}');

        return this.http.get(environment.backend + 'entries', {params: params, headers: this.auth.beerlessAuthHeaders});
    }

    getEntry(id: number) {
        const params = new HttpParams()
            .append('filter', '{"where":{"statusId":"1"},"include":[{"relation":"activity",' +
                '"scope":{"include":["user","beer","brewery","article","activityType"]}},' +
                '{"relation":"beerEntry","scope":{"include":["beerstyleEntries","beerFromBreweryEntries"]}},' +
                '{"relation":"breweryEntry","scope":{"include":"contactEntry"}},"articleEntry"]}');

        return this.http.get(environment.backend + 'entries/' + id, {params: params, headers: this.auth.beerlessAuthHeaders});
    }

    acceptEntry(id: number, entry: any) {
        entry.statusId = 2;

        console.log(entry);

        // this.http.put(environment.backend + 'beers/' + id, entry, {headers: this.auth.beerlessAuthHeaders});
    }
}
