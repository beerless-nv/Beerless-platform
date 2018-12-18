import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/_services/article.service';
import { ArticletagService } from 'src/app/_services/articletag.service';
import { TagService } from 'src/app/_services/tag.service';
import { BlogService } from 'src/app/_services/blog.service';

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

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private articletagService: ArticletagService, private tagService: TagService, public blogService: BlogService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
    });

    this.articleService.getArticleBySlug(this.slug).then(data => {
      this.blogService.setActiveBlog(data['articles'][0])
    })
    
    this.blogService.activeBlog$.subscribe(data => {
      this.article = data;
    });
    this.blogService.activeFirstTag$.subscribe(data => {
      this.firsttag = data;
    })

    this.setOtherArticles();
  }

  setOtherArticles(){
    let tempArray;
    this.articleService.getAllRecentArticles().then(data => {
      tempArray = data['articles'];
    }).then(() => {
      tempArray.forEach(function(obj, i){
        if(i<=3 || this.article.ID !== obj.ID){
          this.otherArticles.push(obj);
        }
      }, this)
    })
  }
  
}
