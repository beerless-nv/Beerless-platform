import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../../app-routing.module';
import {IndexBlogComponent} from './pages/visitor/index-blog/index-blog.component';
import {ArticleComponent} from './pages/visitor/article/article.component';
import {ArticleItemComponent} from './components/article-item/article-item.component';
import {SuggestedArticleItemComponent} from './components/suggested-article-item/suggested-article-item.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
    ],
    declarations: [
        IndexBlogComponent,
        ArticleComponent,
        ArticleItemComponent,
        SuggestedArticleItemComponent
    ]
})
export class BlogModule {
}
