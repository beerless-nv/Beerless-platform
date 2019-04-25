import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TagService {

    readonly urlGetAllTags = environment.backend + 'tags';
    readonly urlGetOne = environment.backend + 'tags/';

    constructor(private http: HttpClient) {
    }

    getAllTags() {
        return this.http.get(this.urlGetAllTags)
            .toPromise()
            .then(data => {
                return data;
            });
    }

    getTagById(id) {
        return this.http.get(this.urlGetOne + id)
            .toPromise()
            .then(data => {
                return data['tag'];
            });
    }
}
