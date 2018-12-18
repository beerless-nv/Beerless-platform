import { Component, OnInit, Input } from '@angular/core';
import { ArticletagService } from 'src/app/services/articletag.service';
import { TagService } from 'src/app/services/tag.service';
import { ArticleService } from 'src/app/services/article.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-suggested-article-item',
  templateUrl: './suggested-article-item.component.html',
  styles: []
})
export class SuggestedArticleItemComponent implements OnInit {

  @Input() article: any;
  firsttag;

  constructor(private articletagService: ArticletagService, private tagService: TagService, private articleService: ArticleService, private blogService: BlogService) { }

  ngOnInit() {
    this.setFirstTag();
  }

  setFirstTag(){
    this.articletagService.getWhereArticleID(this.article.ID).then(data => {      
      
      if(data['articletags'][0] !== undefined){
        
        let firstTagID = data['articletags'][0].tagID;
        this.tagService.getTagById(firstTagID).then(tagdata => {
          
          this.firsttag = tagdata['tag'];
        })
      }                
    });
  }

  loadArticle(ID){
    this.blogService.setActiveBlog(this.article);
  }

}
