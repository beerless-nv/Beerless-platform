(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"9kKi":function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),e=function(){},r=u("pMnS"),i=u("ZYCi"),a=u("cxbk"),c=function(){function l(){this.environment=a.a}return l.prototype.ngOnInit=function(){},l}(),s=t.rb({encapsulation:2,styles:[],data:{}});function o(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,11,"div",[["class","card card-sm-100w card-hover card-hover-blog"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Db(l,1).onClick()&&e),e},null,null)),t.sb(1,16384,null,0,i.n,[i.m,i.a,[8,null],t.G,t.l],{routerLink:[0,"routerLink"]},null),(l()(),t.tb(2,0,null,null,0,"img",[["alt","Card image cap"],["class","card-img-top"]],[[8,"src",4]],null,null,null,null)),(l()(),t.tb(3,0,null,null,4,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t.tb(4,0,null,null,1,"h5",[["class","card-title"]],null,null,null,null,null)),(l()(),t.Lb(5,null,["",""])),(l()(),t.tb(6,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),t.Lb(7,null,["",""])),(l()(),t.tb(8,0,null,null,3,"div",[["class","card-footer"]],null,null,null,null,null)),(l()(),t.tb(9,0,null,null,2,"small",[["class","text-grey"]],null,null,null,null,null)),(l()(),t.tb(10,0,null,null,0,"img",[["class","rounded-circle mr-3"],["style","width: 30px"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),(l()(),t.Lb(11,null,[""," ",""]))],function(l,n){var u=n.component;l(n,1,0,t.vb(1,"/blog/article/",null==u.article?null:u.article.slug,""))},function(l,n){var u=n.component;l(n,2,0,t.vb(1,"",u.environment.articlePictureURL+(null==u.article?null:u.article.picture),"")),l(n,5,0,null==u.article?null:u.article.title),l(n,7,0,null==u.article?null:u.article.intro),l(n,10,0,t.vb(1,"",null==u.user?null:u.user.picture,""),t.vb(2,"profielfoto ",null==u.user?null:u.user.firstName," ",null==u.user?null:u.user.lastName,"")),l(n,11,0,null==u.user?null:u.user.firstName,null==u.user?null:u.user.lastName)})}var b=u("Ip0R"),g=u("AytR"),f=u("t/Na"),p=function(){function l(l){this.http=l,this.urlGetAllTags=g.a.backend+"tags",this.urlGetOne=g.a.backend+"tags/"}return l.prototype.getAllTags=function(){return this.http.get(this.urlGetAllTags).toPromise().then(function(l){return l})},l.prototype.getTagById=function(l){return this.http.get(this.urlGetOne+l).toPromise().then(function(l){return l.tag})},l.ngInjectableDef=t.W({factory:function(){return new l(t.ab(f.c))},token:l,providedIn:"root"}),l}(),m=function(){function l(l){this.http=l,this.urlGetAllArticles=g.a.backend+"articles",this.urlSearchArticles=g.a.backend+"articles/search"}return l.prototype.getAllArticles=function(){var l=(new f.i).set("joinTables","user");return this.http.get(this.urlGetAllArticles,{params:l}).toPromise().then(function(l){return l})},l.prototype.getAllRecentArticles=function(){var l=(new f.i).set("orderBy","timestampCreated.desc").set("limit","3");return this.http.get(this.urlGetAllArticles,{params:l}).toPromise().then(function(l){return l})},l.prototype.getArticleBySlug=function(l){return this.http.post(this.urlSearchArticles,{searchParams:[{propName:"slug",value:l}]}).toPromise().then(function(l){return l.articles})},l.ngInjectableDef=t.W({factory:function(){return new l(t.ab(f.c))},token:l,providedIn:"root"}),l}(),d=function(){function l(l,n){this.tagService=l,this.articleService=n}return l.prototype.ngOnInit=function(){this.getAllTags(),this.getAllArticles()},l.prototype.getBlogsByName=function(l){console.log(l)},l.prototype.getAllArticles=function(){var l=this;this.articleService.getAllArticles().then(function(n){l.articlesList=n.articles})},l.prototype.getAllTags=function(){var l=this;this.tagService.getAllTags().then(function(n){l.tagsList=n.tags})},l}(),h=t.rb({encapsulation:2,styles:[],data:{}});function v(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"app-article-item",[],null,null,null,o,s)),t.sb(1,114688,null,0,c,[],{user:[0,"user"],article:[1,"article"]},null)],function(l,n){l(n,1,0,n.context.$implicit.user,n.context.$implicit)},null)}function k(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"span",[["class","badge badge-pill badge-primary text-white py-2 px-3 mr-2 mb-2 font-waight-normal"]],null,null,null,null,null)),(l()(),t.Lb(1,null,["",""]))],null,function(l,n){l(n,1,0,n.context.$implicit.name)})}function y(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,3,"div",[["class","page-header"]],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,2,"div",[["class","container-no-m"]],null,null,null,null,null)),(l()(),t.tb(2,0,null,null,1,"span",[["class","page-header-title"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Blog"])),(l()(),t.tb(4,0,null,null,55,"div",[["class","container"]],null,null,null,null,null)),(l()(),t.tb(5,0,null,null,54,"div",[["class","col-12 px-0 d-flex flex-wrap"]],null,null,null,null,null)),(l()(),t.tb(6,0,null,null,3,"div",[["class","col-md-8 col-12 pl-0 pr-md-3 pr-0"]],null,null,null,null,null)),(l()(),t.tb(7,0,null,null,2,"div",[["class","card-columns"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,v)),t.sb(9,278528,null,0,b.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null),(l()(),t.tb(10,0,null,null,49,"div",[["class","col-md-4 col-12 pl-md-3 pl-0 pr-0 position-relative mt-md-0 mt-5"]],null,null,null,null,null)),(l()(),t.tb(11,0,null,null,48,"div",[["class","sticky-sidebar"]],null,null,null,null,null)),(l()(),t.tb(12,0,null,null,2,"div",[["class","form-group mb-1 input-icon"]],null,null,null,null,null)),(l()(),t.tb(13,0,[["blog",1]],null,0,"input",[["class","form-control"],["placeholder","Zoek een blogpost"],["type","text"]],null,[[null,"blur"],[null,"keyup.enter"]],function(l,n,u){var e=!0;return"blur"===n&&(e=!1!==l.component.getBlogsByName(t.Db(l,13).value)&&e),"keyup.enter"===n&&(e=!1!==t.Db(l,13).blur()&&e),e},null,null)),(l()(),t.tb(14,0,null,null,0,"i",[["class","fas fa-search"]],null,null,null,null,null)),(l()(),t.tb(15,0,null,null,4,"div",[["class","mt-4 pt-2 mb-4"]],null,null,null,null,null)),(l()(),t.tb(16,0,null,null,1,"p",[["class",""]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Tags"])),(l()(),t.kb(16777216,null,null,1,null,k)),t.sb(19,278528,null,0,b.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null),(l()(),t.tb(20,0,null,null,39,"div",[["class","mb-5"]],null,null,null,null,null)),(l()(),t.tb(21,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Categori\xebn"])),(l()(),t.tb(23,0,null,null,36,"div",[["class","small"]],null,null,null,null,null)),(l()(),t.tb(24,0,null,null,5,"div",[["class","border-bottom text-grey mb-2 pb-2"]],null,null,null,null,null)),(l()(),t.tb(25,0,null,null,2,"a",[["class","link-muted-yellow"],["routerLink",""]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Db(l,26).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.sb(26,671744,null,0,i.p,[i.m,i.a,b.l],{routerLink:[0,"routerLink"]},null),(l()(),t.Lb(-1,null,["Biernieuws"])),(l()(),t.tb(28,0,null,null,1,"span",[["class","badge badge-pill badge-light text-grey float-right"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["156"])),(l()(),t.tb(30,0,null,null,5,"div",[["class","border-bottom text-grey mb-2 pb-2"]],null,null,null,null,null)),(l()(),t.tb(31,0,null,null,2,"a",[["class","link-muted-yellow"],["routerLink",""]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Db(l,32).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.sb(32,671744,null,0,i.p,[i.m,i.a,b.l],{routerLink:[0,"routerLink"]},null),(l()(),t.Lb(-1,null,["Foodpairing"])),(l()(),t.tb(34,0,null,null,1,"span",[["class","badge badge-pill badge-light text-grey float-right"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["23"])),(l()(),t.tb(36,0,null,null,5,"div",[["class","border-bottom text-grey mb-2 pb-2"]],null,null,null,null,null)),(l()(),t.tb(37,0,null,null,2,"a",[["class","link-muted-yellow"],["routerLink",""]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Db(l,38).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.sb(38,671744,null,0,i.p,[i.m,i.a,b.l],{routerLink:[0,"routerLink"]},null),(l()(),t.Lb(-1,null,["Brouwen"])),(l()(),t.tb(40,0,null,null,1,"span",[["class","badge badge-pill badge-light text-grey float-right"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["18"])),(l()(),t.tb(42,0,null,null,5,"div",[["class","border-bottom text-grey mb-2 pb-2"]],null,null,null,null,null)),(l()(),t.tb(43,0,null,null,2,"a",[["class","link-muted-yellow"],["routerLink",""]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Db(l,44).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.sb(44,671744,null,0,i.p,[i.m,i.a,b.l],{routerLink:[0,"routerLink"]},null),(l()(),t.Lb(-1,null,["Brouwerijen"])),(l()(),t.tb(46,0,null,null,1,"span",[["class","badge badge-pill badge-light text-grey float-right"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["43"])),(l()(),t.tb(48,0,null,null,5,"div",[["class","border-bottom text-grey mb-2 pb-2"]],null,null,null,null,null)),(l()(),t.tb(49,0,null,null,2,"a",[["class","link-muted-yellow"],["routerLink",""]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Db(l,50).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.sb(50,671744,null,0,i.p,[i.m,i.a,b.l],{routerLink:[0,"routerLink"]},null),(l()(),t.Lb(-1,null,["Evenementen"])),(l()(),t.tb(52,0,null,null,1,"span",[["class","badge badge-pill badge-light text-grey float-right"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["48"])),(l()(),t.tb(54,0,null,null,5,"div",[["class","border-bottom text-grey mb-2 pb-2"]],null,null,null,null,null)),(l()(),t.tb(55,0,null,null,2,"a",[["class","link-muted-yellow"],["routerLink",""]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Db(l,56).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.sb(56,671744,null,0,i.p,[i.m,i.a,b.l],{routerLink:[0,"routerLink"]},null),(l()(),t.Lb(-1,null,["Onderzoek"])),(l()(),t.tb(58,0,null,null,1,"span",[["class","badge badge-pill badge-light text-grey float-right"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["9"]))],function(l,n){var u=n.component;l(n,9,0,u.articlesList),l(n,19,0,u.tagsList),l(n,26,0,""),l(n,32,0,""),l(n,38,0,""),l(n,44,0,""),l(n,50,0,""),l(n,56,0,"")},function(l,n){l(n,25,0,t.Db(n,26).target,t.Db(n,26).href),l(n,31,0,t.Db(n,32).target,t.Db(n,32).href),l(n,37,0,t.Db(n,38).target,t.Db(n,38).href),l(n,43,0,t.Db(n,44).target,t.Db(n,44).href),l(n,49,0,t.Db(n,50).target,t.Db(n,50).href),l(n,55,0,t.Db(n,56).target,t.Db(n,56).href)})}var L=t.pb("app-index-blog",d,function(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"app-index-blog",[],null,null,null,y,h)),t.sb(1,114688,null,0,d,[p,m],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),A=function(){function l(l){this.http=l,this.urlSearchArticleTags=g.a.backend+"articletags/search"}return l.prototype.getWhereArticleID=function(l){return this.http.post(this.urlSearchArticleTags,{searchParams:[{propName:"articleID",value:l,operator:"="}]}).toPromise().then(function(l){return l.articletags})},l.ngInjectableDef=t.W({factory:function(){return new l(t.ab(f.c))},token:l,providedIn:"root"}),l}(),D=u("26FU"),w=function(){function l(l,n,u,t){this.http=l,this.articleService=n,this.articletagService=u,this.tagService=t,this.activeBlog$=new D.a(null),this.activeFirstTag$=new D.a(null)}return l.prototype.setActiveBlog=function(l){var n=this;this.activeBlog$.next(l),this.articletagService.getWhereArticleID(l.ID).then(function(l){l[0]?n.tagService.getTagById(l[0].ID).then(function(l){n.setActiveFirstTag(l.tag)}):n.activeFirstTag$.next(null)})},l.prototype.setActiveFirstTag=function(l){this.activeFirstTag$.next(l)},l.ngInjectableDef=t.W({factory:function(){return new l(t.ab(f.c),t.ab(m),t.ab(A),t.ab(p))},token:l,providedIn:"root"}),l}(),x=function(){function l(l,n,u,t,e){this.articletagService=l,this.tagService=n,this.articleService=u,this.blogService=t,this.router=e,this.environment=g.a}return l.prototype.ngOnInit=function(){this.setFirstTag()},l.prototype.setFirstTag=function(){var l=this;this.articletagService.getWhereArticleID(this.article.ID).then(function(n){void 0!==n[0]&&l.tagService.getTagById(n[0].tagID).then(function(n){l.firsttag=n})})},l.prototype.loadArticle=function(){this.router.navigate(["/blog/article/"+this.article.slug])},l}(),I=t.rb({encapsulation:2,styles:[],data:{}});function S(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"span",[["class","article-category"]],null,null,null,null,null)),(l()(),t.Lb(1,null,["",""]))],null,function(l,n){var u=n.component;l(n,1,0,null==u.firsttag?null:u.firsttag.name)})}function B(l){return t.Nb(0,[t.Fb(0,b.e,[t.w]),(l()(),t.tb(1,0,null,null,11,"a",[["class","link-black-yellow mouse-pointer"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.loadArticle()&&t),t},null,null)),(l()(),t.tb(2,0,null,null,10,"div",[["class","media mt-3 d-flex align-items-center"]],null,null,null,null,null)),(l()(),t.tb(3,0,null,null,0,"div",[["class","footer-next-articles-img"]],[[4,"background-image",null]],null,null,null,null)),(l()(),t.tb(4,0,null,null,8,"div",[["class","media-body ml-3"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,S)),t.sb(6,16384,null,0,b.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null),(l()(),t.tb(7,0,null,null,1,"h6",[["class","article-title mt-2 mb-1"]],null,null,null,null,null)),(l()(),t.Lb(8,null,["",""])),(l()(),t.tb(9,0,null,null,3,"small",[["class","article-timestamp"]],null,null,null,null,null)),(l()(),t.tb(10,0,null,null,0,"i",[["class","far fa-clock mr-1"]],null,null,null,null,null)),(l()(),t.Lb(11,null,[" "," "])),t.Hb(12,2)],function(l,n){l(n,6,0,n.component.firsttag)},function(l,n){var u=n.component;l(n,3,0,"url("+u.environment.articlePictureURL+(null==u.article?null:u.article.picture)+")"),l(n,8,0,null==u.article?null:u.article.title),l(n,11,0,t.Mb(n,11,0,l(n,12,0,t.Db(n,0),null==u.article?null:u.article.timestampCreated,"mediumDate")))})}var N=function(){function l(l,n,u,t,e,r){this.route=l,this.articleService=n,this.articletagService=u,this.tagService=t,this.blogService=e,this.router=r,this.otherArticles=Array(),this.environment=a.a}return l.prototype.ngOnInit=function(){var l=this;this.route.paramMap.subscribe(function(n){l.slug=n.get("slug"),l.articleService.getArticleBySlug(l.slug).then(function(n){l.article=n[0],l.setOtherArticles(),l.articletagService.getWhereArticleID(l.article.ID).then(function(n){null!=n[0]&&l.tagService.getTagById(n[0].tagID).then(function(n){l.firsttag=n})})})})},l.prototype.setOtherArticles=function(){var l,n=this;this.otherArticles=Array(),this.articleService.getAllRecentArticles().then(function(n){l=n.articles}).then(function(){l.forEach(function(l,n){(n<=3||this.article.ID!==l.ID)&&this.otherArticles.push(l)},n)})},l}(),K=t.rb({encapsulation:2,styles:[],data:{}});function T(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"small",[["class","article-category"]],null,null,null,null,null)),(l()(),t.Lb(1,null,["",""]))],null,function(l,n){var u=n.component;l(n,1,0,null==u.firsttag?null:u.firsttag.name)})}function F(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,2,"small",[],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,0,"i",[["class","fas fa-tag mr-1 mt-2"]],null,null,null,null,null)),(l()(),t.Lb(2,null,[" ",""]))],null,function(l,n){var u=n.component;l(n,2,0,null==u.firsttag?null:u.firsttag.name)})}function P(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"app-suggested-article-item",[],null,null,null,B,I)),t.sb(1,114688,null,0,x,[A,p,m,w,i.m],{article:[0,"article"]},null)],function(l,n){l(n,1,0,n.context.$implicit)},null)}function C(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"app-suggested-article-item",[],null,null,null,B,I)),t.sb(1,114688,null,0,x,[A,p,m,w,i.m],{article:[0,"article"]},null)],function(l,n){l(n,1,0,n.context.$implicit)},null)}function O(l){return t.Nb(0,[t.Fb(0,b.e,[t.w]),(l()(),t.tb(1,0,null,null,66,"div",[["class","container py-5"]],null,null,null,null,null)),(l()(),t.tb(2,0,null,null,65,"div",[["class","col-12 px-0 d-flex flex-wrap"]],null,null,null,null,null)),(l()(),t.tb(3,0,null,null,21,"div",[["class","article-image position-relative article-image-sm-100w"]],[[4,"background-image",null]],null,null,null,null)),(l()(),t.tb(4,0,null,null,6,"div",[["class","article-share-container"]],null,null,null,null,null)),(l()(),t.tb(5,0,null,null,5,"small",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,[" Delen "])),(l()(),t.tb(7,0,null,null,1,"a",[["class","link-white-yellow ml-1"],["href",""]],null,null,null,null,null)),(l()(),t.tb(8,0,null,null,0,"i",[["class","fab fa-twitter"]],null,null,null,null,null)),(l()(),t.tb(9,0,null,null,1,"a",[["class","link-white-yellow ml-1"],["href",""]],null,null,null,null,null)),(l()(),t.tb(10,0,null,null,0,"i",[["class","fab fa-facebook-f"]],null,null,null,null,null)),(l()(),t.tb(11,0,null,null,13,"div",[["class","article-title-container"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,T)),t.sb(13,16384,null,0,b.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null),(l()(),t.tb(14,0,null,null,1,"h2",[["class","article-title my-2 d-lg-block d-none"]],null,null,null,null,null)),(l()(),t.Lb(15,null,["",""])),(l()(),t.tb(16,0,null,null,1,"h4",[["class","article-title my-2 d-lg-none d-md-block d-none"]],null,null,null,null,null)),(l()(),t.Lb(17,null,["",""])),(l()(),t.tb(18,0,null,null,1,"h5",[["class","article-title my-2 d-md-none d-block"]],null,null,null,null,null)),(l()(),t.Lb(19,null,["",""])),(l()(),t.tb(20,0,null,null,4,"small",[],null,null,null,null,null)),(l()(),t.tb(21,0,null,null,0,"i",[["class","far fa-clock mr-1"]],null,null,null,null,null)),(l()(),t.Lb(22,null,[""," ",""])),t.Hb(23,2),t.Hb(24,2),(l()(),t.tb(25,0,null,null,26,"div",[["class","col-xl-9 col-lg-8 col-md-7 col-12 pl-0 pr-md-3 pr-0"]],null,null,null,null,null)),(l()(),t.tb(26,0,null,null,25,"div",[["class","card card-sm-100w article-content"]],null,null,null,null,null)),(l()(),t.tb(27,0,null,null,24,"div",[["class","p-md-5 p-3"]],null,null,null,null,null)),(l()(),t.tb(28,0,null,null,1,"p",[["class","article-intro"]],null,null,null,null,null)),(l()(),t.Lb(29,null,[" "," "])),(l()(),t.tb(30,0,null,null,1,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),t.Lb(31,null,[" "," "])),(l()(),t.tb(32,0,null,null,14,"div",[["class","article-footer"]],null,null,null,null,null)),(l()(),t.tb(33,0,null,null,7,"div",[["class","d-flex flex-column"]],null,null,null,null,null)),(l()(),t.tb(34,0,null,null,4,"small",[],null,null,null,null,null)),(l()(),t.tb(35,0,null,null,0,"i",[["class","fas fa-clock mr-1"]],null,null,null,null,null)),(l()(),t.Lb(36,null,[""," ",""])),t.Hb(37,2),t.Hb(38,2),(l()(),t.kb(16777216,null,null,1,null,F)),t.sb(40,16384,null,0,b.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null),(l()(),t.tb(41,0,null,null,5,"strong",[["class","font-weight-bold small"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,[" Delen "])),(l()(),t.tb(43,0,null,null,1,"a",[["class","link-muted-yellow ml-1"],["href",""]],null,null,null,null,null)),(l()(),t.tb(44,0,null,null,0,"i",[["class","fab fa-twitter"]],null,null,null,null,null)),(l()(),t.tb(45,0,null,null,1,"a",[["class","link-muted-yellow ml-1"],["href",""]],null,null,null,null,null)),(l()(),t.tb(46,0,null,null,0,"i",[["class","fab fa-facebook-f"]],null,null,null,null,null)),(l()(),t.tb(47,0,null,null,4,"div",[["class","footer-next-articles text-dark"]],null,null,null,null,null)),(l()(),t.tb(48,0,null,null,1,"h5",[["class","font-weight-bold mb-3"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Bekijk ook"])),(l()(),t.kb(16777216,null,null,1,null,P)),t.sb(51,278528,null,0,b.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null),(l()(),t.tb(52,0,null,null,15,"div",[["class","col-xl-3 col-lg-4 col-md-5 col-12 pr-0 pl-md-3 pl-0"]],null,null,null,null,null)),(l()(),t.tb(53,0,null,null,8,"div",[["class","featured"]],null,null,null,null,null)),(l()(),t.tb(54,0,null,null,7,"a",[["routerLink",""]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Db(l,55).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.sb(55,671744,null,0,i.p,[i.m,i.a,b.l],{routerLink:[0,"routerLink"]},null),(l()(),t.tb(56,0,null,null,5,"div",[["class","featured-image"],["style","background-image: url('src/assets/images/home_hero.jpg');"]],null,null,null,null,null)),(l()(),t.tb(57,0,null,null,4,"div",[["class","featured-content"]],null,null,null,null,null)),(l()(),t.tb(58,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),t.tb(59,0,null,null,0,"img",[["alt","logo Beerless"],["class","mb-3"],["src","src/assets/images/logo_beerless_wit.svg"],["style","width: 50%"]],null,null,null,null,null)),(l()(),t.tb(60,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Intalleer de Beerless-app!"])),(l()(),t.tb(62,0,null,null,5,"div",[["class","sticky-sidebar"]],null,null,null,null,null)),(l()(),t.tb(63,0,null,null,4,"div",[["class","popular-articles"]],null,null,null,null,null)),(l()(),t.tb(64,0,null,null,1,"h5",[["class","font-weight-bold mb-3"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Populair"])),(l()(),t.kb(16777216,null,null,1,null,C)),t.sb(67,278528,null,0,b.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null)],function(l,n){var u=n.component;l(n,13,0,u.firsttag),l(n,40,0,u.firsttag),l(n,51,0,u.otherArticles),l(n,55,0,""),l(n,67,0,u.otherArticles)},function(l,n){var u=n.component;l(n,3,0,"url("+u.environment.articlePictureURL+(null==u.article?null:u.article.picture)+")"),l(n,15,0,null==u.article?null:u.article.title),l(n,17,0,null==u.article?null:u.article.title),l(n,19,0,null==u.article?null:u.article.title),l(n,22,0,t.Mb(n,22,0,l(n,23,0,t.Db(n,0),null==u.article?null:u.article.timestampCreated,"mediumDate")),t.Mb(n,22,1,l(n,24,0,t.Db(n,0),null==u.article?null:u.article.timestampCreated,"HHumm"))),l(n,29,0,null==u.article?null:u.article.intro),l(n,30,0,null==u.article?null:u.article.content),l(n,31,0,null==u.article?null:u.article.content),l(n,36,0,t.Mb(n,36,0,l(n,37,0,t.Db(n,0),null==u.article?null:u.article.timestampCreated,"mediumDate")),t.Mb(n,36,1,l(n,38,0,t.Db(n,0),null==u.article?null:u.article.timestampCreated,"HHumm"))),l(n,54,0,t.Db(n,55).target,t.Db(n,55).href)})}var $=t.pb("app-article",N,function(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"app-article",[],null,null,null,O,K)),t.sb(1,114688,null,0,N,[i.a,m,A,p,w,i.m],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),H=u("yhP2"),G={expectedRole:"$everyone"},M={expectedRole:"$everyone"},R=function(){};u.d(n,"BlogModuleNgFactory",function(){return j});var j=t.qb(e,[],function(l){return t.Ab([t.Bb(512,t.k,t.fb,[[8,[r.a,L,$]],[3,t.k],t.z]),t.Bb(4608,b.q,b.p,[t.w,[2,b.B]]),t.Bb(4608,m,m,[f.c]),t.Bb(4608,A,A,[f.c]),t.Bb(4608,p,p,[f.c]),t.Bb(4608,w,w,[f.c,m,A,p]),t.Bb(1073742336,b.c,b.c,[]),t.Bb(1073742336,i.q,i.q,[[2,i.w],[2,i.m]]),t.Bb(1073742336,R,R,[]),t.Bb(1073742336,e,e,[]),t.Bb(1024,i.k,function(){return[[{path:"",component:d,canActivate:[H.a],data:G},{path:"article/:slug",component:N,canActivate:[H.a],data:M}]]},[])])})}}]);