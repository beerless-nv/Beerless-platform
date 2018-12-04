import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexBlogComponent} from './index-blog/index-blog.component';
import {RouterModule} from '@angular/router';
import { ArticleComponent } from '../../Visitor/blog/article/article.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [IndexBlogComponent, ArticleComponent]
})
export class BlogModule {
}
