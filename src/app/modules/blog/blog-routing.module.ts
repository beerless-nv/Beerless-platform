import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ArticleComponent} from './pages/visitor/article/article.component';
import {IndexBlogComponent} from './pages/visitor/index-blog/index-blog.component';

const routes: Routes = [
    {path: '', component: IndexBlogComponent},
    {path: 'article/:slug', component: ArticleComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule {
}
