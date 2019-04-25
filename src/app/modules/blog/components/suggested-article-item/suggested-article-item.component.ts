import {Component, OnInit, Input} from '@angular/core';
import {ArticletagService} from 'src/app/modules/blog/shared/articletag.service';
import {TagService} from 'src/app/modules/blog/shared/tag.service';
import {ArticleService} from 'src/app/modules/blog/shared/article.service';
import {BlogService} from 'src/app/modules/blog/shared/blog.service';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-suggested-article-item',
    templateUrl: './suggested-article-item.component.html',
    styles: []
})
export class SuggestedArticleItemComponent implements OnInit {

    @Input() article: any;
    firsttag;
    environment = environment;

    constructor(private articletagService: ArticletagService, private tagService: TagService, private articleService: ArticleService, private blogService: BlogService, private router: Router) {
    }

    ngOnInit() {
        this.setFirstTag();
    }

    setFirstTag() {
        this.articletagService.getWhereArticleID(this.article.ID).then(data => {

            if (data[0] !== undefined) {

                const firstTagID = data[0].tagID;
                this.tagService.getTagById(firstTagID).then(tagdata => {

                    this.firsttag = tagdata;
                });
            }
        });
    }

    loadArticle() {
        this.router.navigate(['/blog/article/' + this.article.slug]);
    }

}
