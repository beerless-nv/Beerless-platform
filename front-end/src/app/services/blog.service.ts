import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { ArticleService } from './article.service';
import { ArticletagService } from './articletag.service';
import { TagService } from './tag.service';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../interfaces/article';
import { Tag } from '../interfaces/tag';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    activeBlog$: BehaviorSubject<Article> = new BehaviorSubject(null);
    activeFirstTag$: BehaviorSubject<Tag> = new BehaviorSubject(null);

    constructor(private http: HttpClient, private articleService: ArticleService, private articletagService: ArticletagService, private tagService: TagService) {
    }

    setActiveBlog(article: Article){
        this.activeBlog$.next(article);
        
        //Set first tag
        this.articletagService.getWhereArticleID(article.ID).then(data => {

            if(data['articletags'][0]){
                this.tagService.getTagById(data['articletags'][0].ID).then(tagdata => {
                    this.setActiveFirstTag(tagdata['tag'])
                })
            } else{
                this.activeFirstTag$.next(null);
            }
            
        })
    }

    setActiveFirstTag(tag: Tag){
        this.activeFirstTag$.next(tag);
    }
}
