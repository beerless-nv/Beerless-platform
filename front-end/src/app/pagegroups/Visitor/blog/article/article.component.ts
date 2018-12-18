import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from 'src/app/_services/article.service';
import {ArticletagService} from 'src/app/_services/articletag.service';
import {TagService} from 'src/app/_services/tag.service';
import {BlogService} from 'src/app/_services/blog.service';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styles: []
})
export class ArticleComponent implements OnInit {

    slug;
    article;
    firsttag;
    otherArticles = Array();

    constructor(private route: ActivatedRoute, private articleService: ArticleService, private articletagService: ArticletagService, private tagService: TagService, public blogService: BlogService, private router: Router) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.slug = params.get('slug');

            this.articleService.getArticleBySlug(this.slug).then(data => {
                this.article = data[0];

                this.articletagService.getWhereArticleID(this.article.ID).then(articletags => {
                    if (articletags[0] != null) {
                        this.tagService.getTagById(articletags[0].tagID).then(tag => {
                            this.firsttag = tag;
                        });
                    }
                });
            });
        });

        this.setOtherArticles();
    }

    setOtherArticles() {
        let tempArray;
        this.articleService.getAllRecentArticles().then(data => {
            tempArray = data['articles'];
        }).then(() => {
            tempArray.forEach(function (obj, i) {
                if (i <= 3 || this.article.ID !== obj.ID) {
                    this.otherArticles.push(obj);
                }
            }, this);
        });
    }

}
