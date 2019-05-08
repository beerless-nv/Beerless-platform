import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoleGuardService} from '../../core/authorization/role-guard.service';
import {ArticleComponent} from './pages/visitor/article/article.component';
import {IndexBlogComponent} from './pages/visitor/index-blog/index-blog.component';

const routes: Routes = [
    {path: '', component: IndexBlogComponent, canActivate: [RoleGuardService], data: {expectedRole: '$everyone'}},
    {path: 'article/:slug', component: ArticleComponent, canActivate: [RoleGuardService], data: {expectedRole: '$everyone'}},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule {
}
