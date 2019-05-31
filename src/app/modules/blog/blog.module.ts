import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeadersModule} from '../../shared/components/headers/headers.module';
import {BlogRoutingModule} from './blog-routing.module';
import {IndexBlogComponent} from './pages/visitor/index-blog/index-blog.component';
import {ArticleComponent} from './pages/visitor/article/article.component';
import {ArticleItemComponent} from './components/article-item/article-item.component';
import {SuggestedArticleItemComponent} from './components/suggested-article-item/suggested-article-item.component';
import {ArticleService} from './shared/article.service';
import {ArticletagService} from './shared/articletag.service';
import {BlogService} from './shared/blog.service';
import {TagService} from './shared/tag.service';

@NgModule({
    imports: [
        CommonModule,
        BlogRoutingModule,
        HeadersModule
    ],
    declarations: [
        IndexBlogComponent,
        ArticleComponent,
        ArticleItemComponent,
        SuggestedArticleItemComponent,
    ],
    providers: [
        ArticleService,
        ArticletagService,
        BlogService,
        TagService
    ]
})
export class BlogModule {
}
