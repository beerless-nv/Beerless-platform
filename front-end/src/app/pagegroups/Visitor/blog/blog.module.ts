import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexBlogComponent} from './index-blog/index-blog.component';
import {RouterModule} from '@angular/router';
import { ArticleComponent } from '../../Visitor/blog/article/article.component';
import { ArticleItemComponent } from '../../Visitor/blog/index-blog/article-item/article-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [IndexBlogComponent, ArticleComponent, ArticleItemComponent]
})
export class BlogModule {
}
