import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './pagegroups/Visitor/home/home.component';
import {LoginComponent} from './pagegroups/Visitor/login/login.component';
import {IndexBeersComponent} from './pagegroups/Visitor/beers/index-beers/index-beers.component';
import {AddBeersComponent} from './pagegroups/Member/beers/add-beers/add-beers.component';
import {DetailBeersComponent} from './pagegroups/Visitor/beers/detail-beers/detail-beers.component';
import {IndexBlogComponent} from './pagegroups/Visitor/blog/index-blog/index-blog.component';
import {ArticleComponent} from './pagegroups/Visitor/blog/article/article.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    // All pages from BIEREN
    {
        path: 'beers', children: [
            {path: '', component: IndexBeersComponent},
            {path: 'add', component: AddBeersComponent},
            {path: 'detail/:id', component: DetailBeersComponent},
        ]
    },
    // ALL pages from blog
    {
        path: 'blog', children: [
            {path: '', component: IndexBlogComponent},
            {path: 'article/:id', component: ArticleComponent},
        ]
    },
    // Homepage doorverwijzen naar home
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    // Niet gedefinieerde routes doorverwijzen naar error page
    {path: '**', redirectTo: 'home'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
