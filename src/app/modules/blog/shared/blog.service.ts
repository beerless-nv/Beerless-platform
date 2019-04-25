import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ArticleService} from './article.service';
import {TagService} from './tag.service';
import {BehaviorSubject} from 'rxjs';
import {ArticletagService} from './articletag.service';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    activeBlog$: BehaviorSubject<any> = new BehaviorSubject(null);
    activeFirstTag$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private http: HttpClient, private articleService: ArticleService, private articletagService: ArticletagService, private tagService: TagService) {
    }

    setActiveBlog(article) {
        this.activeBlog$.next(article);

        // Set first tag
        this.articletagService.getWhereArticleID(article.ID).then(data => {

            if (data[0]) {
                this.tagService.getTagById(data[0].ID).then(tagdata => {
                    this.setActiveFirstTag(tagdata['tag']);
                });
            } else {
                this.activeFirstTag$.next(null);
            }

        });
    }

    setActiveFirstTag(tag) {
        this.activeFirstTag$.next(tag);
    }
}
