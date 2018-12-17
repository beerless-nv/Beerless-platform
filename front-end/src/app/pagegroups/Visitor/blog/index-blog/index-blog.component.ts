import {Component, OnInit} from '@angular/core';
import { TagService } from 'src/app/_services/tag.service';
import { ArticleService } from 'src/app/_services/article.service';

@Component({
    selector: 'app-index-blog',
    templateUrl: './index-blog.component.html',
    styles: []
})
export class IndexBlogComponent implements OnInit {

    tagsList;
    articlesList;

    constructor(private tagService: TagService, private articleService: ArticleService) {
    }

    ngOnInit() {        
        this.getAllTags();
        this.getAllArticles();        
    }

    getBlogsByName(name) {
        console.log(name);
    }

    getAllArticles(){
        this.articleService.getAllArticles()
            .then(data => {
                this.articlesList = data['articles'];
            })
    }

    getAllTags(){
        this.tagService.getAllTags()
            .then(data => {
                this.tagsList = data['tags'];
            })
    }
}
