import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    readonly urlGetArticleBySlug = environment.backend + 'blog/';

    constructor(private http: HttpClient) {
    }

    getBeerById(id) {
        return this.http.get(this.urlGetArticleBySlug + id)
            .toPromise()
            .then(data => {
                return data;
            });
    }
}
