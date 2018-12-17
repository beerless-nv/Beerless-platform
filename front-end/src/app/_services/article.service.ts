import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly urlGetAllArticles = environment.backend + 'articles';

  constructor(private http: HttpClient) { }

  getAllArticles(){
    const params = new HttpParams()
            .set('joinTables', 'user');
    return this.http.get(this.urlGetAllArticles, {params})
      .toPromise()
      .then(data => {
        return data;
      });
  }
}
