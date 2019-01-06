import {Component, OnInit, Input} from '@angular/core';
import {ArticletagService} from 'src/app/_services/articletag.service';
import {TagService} from 'src/app/_services/tag.service';
import {ArticleService} from 'src/app/_services/article.service';
import {BlogService} from 'src/app/_services/blog.service';
import {Router} from '@angular/router';
import {environment} from '../../../../../../environments/environment';

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
        // this.blogService.setActiveBlog(this.article);
        this.router.navigate(['/blog/article/' + this.article.slug]);
    }

}
