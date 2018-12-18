import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    readonly urlGetAllArticles = environment.backend + 'articles';
    readonly urlSearchArticles = environment.backend + 'articles/search';

    constructor(private http: HttpClient) {
    }

    getAllArticles() {
        const params = new HttpParams()
            .set('joinTables', 'user');
        return this.http.get(this.urlGetAllArticles, {params})
            .toPromise()
            .then(data => {
                return data;
            });
    }

    getAllRecentArticles() {
        const params = new HttpParams()
            .set('orderBy', 'timestampCreated.desc')
            .set('limit', '10');

        return this.http.get(this.urlGetAllArticles, {params})
            .toPromise()
            .then(data => {
                return data;
            });
    }

    getArticleBySlug(value) {
        return this.http.post(this.urlSearchArticles, {
            searchParams: [
                {
                    propName: 'slug',
                    value: value
                }
            ]
        }).toPromise()
            .then(data => {
                return data['articles'];
            });
    }
}
