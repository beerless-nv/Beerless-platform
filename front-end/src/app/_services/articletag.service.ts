import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticletagService {

  readonly urlSearchArticleTags = environment.backend + 'articletags/search';

  constructor(private http: HttpClient) { }

  getWhereArticleID(articleID){
    return this.http.post(this.urlSearchArticleTags, {
      searchParams: [
        {
          propName: 'articleID',
          value: articleID,
          operator: '='
        }        
      ]
    }).toPromise()
      .then(data => {
        return data;
      })
  }
}
