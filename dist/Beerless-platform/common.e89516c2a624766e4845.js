(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"d+NZ":function(e,t,n){"use strict";n.d(t,"a",function(){return s}),n.d(t,"b",function(){return c});var i=n("CcnG"),r=n("Ip0R"),l=n("sdOs"),s=(n("vPfJ"),n("OQnT"),i["\u0275crt"]({encapsulation:2,styles:[],data:{}}));function a(e){return i["\u0275vid"](0,[(e()(),i["\u0275eld"](0,0,null,null,1,"span",[["class","bs-remove-tab"]],null,[[null,"click"]],function(e,t,n){var i=!0,r=e.component;return"click"===t&&(n.preventDefault(),i=!1!==r.removeTab(e.parent.context.$implicit)&&i),i},null,null)),(e()(),i["\u0275ted"](-1,null,[" \u274c"]))],null,null)}function u(e){return i["\u0275vid"](0,[(e()(),i["\u0275eld"](0,0,null,null,8,"li",[],[[2,"active",null],[2,"disabled",null]],null,null,null,null)),i["\u0275did"](1,278528,null,0,r.NgClass,[i.IterableDiffers,i.KeyValueDiffers,i.ElementRef,i.Renderer2],{ngClass:[0,"ngClass"]},null),i["\u0275pad"](2,2),(e()(),i["\u0275eld"](3,0,null,null,5,"a",[["class","nav-link"],["href","javascript:void(0);"]],[[1,"id",0],[2,"active",null],[2,"disabled",null]],[[null,"click"]],function(e,t,n){var i=!0;return"click"===t&&(i=0!=(e.context.$implicit.active=!0)&&i),i},null,null)),(e()(),i["\u0275eld"](4,16777216,null,null,2,"span",[],null,null,null,null,null)),i["\u0275did"](5,16384,null,0,l.a,[i.ViewContainerRef],{ngTransclude:[0,"ngTransclude"]},null),(e()(),i["\u0275ted"](6,null,["",""])),(e()(),i["\u0275and"](16777216,null,null,1,null,a)),i["\u0275did"](8,16384,null,0,r.NgIf,[i.ViewContainerRef,i.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(e,t){e(t,1,0,e(t,2,0,"nav-item",t.context.$implicit.customClass||"")),e(t,5,0,t.context.$implicit.headingRef),e(t,8,0,t.context.$implicit.removable)},function(e,t){e(t,0,0,t.context.$implicit.active,t.context.$implicit.disabled),e(t,3,0,t.context.$implicit.id?t.context.$implicit.id+"-link":"",t.context.$implicit.active,t.context.$implicit.disabled),e(t,6,0,t.context.$implicit.heading)})}function c(e){return i["\u0275vid"](0,[(e()(),i["\u0275eld"](0,0,null,null,3,"ul",[["class","nav"]],null,[[null,"click"]],function(e,t,n){var i=!0;return"click"===t&&(i=!1!==n.preventDefault()&&i),i},null,null)),i["\u0275did"](1,278528,null,0,r.NgClass,[i.IterableDiffers,i.KeyValueDiffers,i.ElementRef,i.Renderer2],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(e()(),i["\u0275and"](16777216,null,null,1,null,u)),i["\u0275did"](3,278528,null,0,r.NgForOf,[i.ViewContainerRef,i.TemplateRef,i.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(e()(),i["\u0275eld"](4,0,null,null,1,"div",[["class","tab-content"]],null,null,null,null,null)),i["\u0275ncd"](null,0)],function(e,t){var n=t.component;e(t,1,0,"nav",n.classMap),e(t,3,0,n.tabs)},null)}},mgGZ:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var i=n("mrSG"),r=n("t/Na"),l=n("AytR"),s=n("MhMf"),a=n("Socn"),u=n("vnZu"),c=n("CcnG"),o=function(e){function t(t,n,i){var r=e.call(this,t)||this;return r.http=t,r.toastsService=n,r.localStorageService=i,r.urlBeer=l.a.backend+"beers",r.urlTastingprofile=l.a.backend+"tastingprofiles",r}return Object(i.c)(t,e),t.prototype.getBeerById=function(e){var t=(new r.i).append("filter",'{"include":[{"relation":"breweries","scope":{"include":{"relation":"beerFromBreweries","scope":{"where":{"beerId":'+e+'}}}}},"styleTags"]}');return this.http.get(this.urlBeer+"/"+e,{params:t})},t.prototype.getBeersNewest=function(e){var t=(new r.i).set("filter[fields][id]","true").set("filter[fields][name]","true").set("filter[fields][logo]","true").set("filter[fields][timestampCreated]","true").set("filter[include]","breweries").set("filter[order]","timestampCreated DESC").set("filter[limit]",e);return this.http.get(this.urlBeer,{params:t})},t.prototype.getTastingprofiles=function(e){return this.http.get(this.urlTastingprofile+"/averages/"+e)},t.prototype.insertBeer=function(e){var t=this;this.http.post(this.urlBeer,{inputObject:e},{headers:this.beerlessAuthHeaders}).subscribe(function(){t.toastsService.addToast("Bevestiging","Het bier werd succesvol toegevoegd.",0)})},t.prototype.uploadImageBeer=function(e,t,n){var i=new FormData;i.append("image",e),i.append("imageName",t),i.append("imagePath",n),this.http.post(this.urlBeer+"/uploadImage",i).subscribe()},t.prototype.getItemBasedRecommendations=function(e,t){var n=(new r.i).append("beerId",e).append("amount",t);return this.http.get(this.urlBeer+"/itemBasedRecommendation",{params:n})},t.ngInjectableDef=c.defineInjectable({factory:function(){return new t(c.inject(r.c),c.inject(u.a),c.inject(s.a))},token:t,providedIn:"root"}),t}(a.a)},oRMG:function(e,t,n){"use strict";n.d(t,"a",function(){return s});var i=n("t/Na"),r=n("AytR"),l=n("CcnG"),s=function(){function e(e){this.http=e,this.urlBrewery=r.a.backend+"breweries"}return e.prototype.getBreweriesByName=function(e,t){var n=(new i.i).set("value","ID,name");return this.http.post(this.urlBrewery+"/search",{searchParams:[{propName:e,value:t},{params:n}]}).toPromise().then(function(e){return e.breweries})},e.prototype.getBreweryById=function(e){var t=(new i.i).append("filter[include]","contact").append("filter[include]","beers");return this.http.get(this.urlBrewery+"/"+e,{params:t})},e.prototype.getAllBreweries=function(){var e=(new i.i).set("value","ID,name");return this.http.get(this.urlBrewery,{params:e}).toPromise().then(function(e){return e.breweries})},e.ngInjectableDef=l.defineInjectable({factory:function(){return new e(l.inject(i.c))},token:e,providedIn:"root"}),e}()},xkgV:function(e,t,n){"use strict";n.d(t,"a",function(){return l}),n.d(t,"b",function(){return r});var i=n("CcnG"),r=function(){function e(){this.change=new i.EventEmitter,this.instances={},this.DEFAULT_ID="DEFAULT_PAGINATION_ID"}return e.prototype.defaultId=function(){return this.DEFAULT_ID},e.prototype.register=function(e){null==e.id&&(e.id=this.DEFAULT_ID),this.instances[e.id]?this.updateInstance(e)&&this.change.emit(e.id):(this.instances[e.id]=e,this.change.emit(e.id))},e.prototype.updateInstance=function(e){var t=!1;for(var n in this.instances[e.id])e[n]!==this.instances[e.id][n]&&(this.instances[e.id][n]=e[n],t=!0);return t},e.prototype.getCurrentPage=function(e){if(this.instances[e])return this.instances[e].currentPage},e.prototype.setCurrentPage=function(e,t){if(this.instances[e]){var n=this.instances[e];t<=Math.ceil(n.totalItems/n.itemsPerPage)&&1<=t&&(this.instances[e].currentPage=t,this.change.emit(e))}},e.prototype.setTotalItems=function(e,t){this.instances[e]&&0<=t&&(this.instances[e].totalItems=t,this.change.emit(e))},e.prototype.setItemsPerPage=function(e,t){this.instances[e]&&(this.instances[e].itemsPerPage=t,this.change.emit(e))},e.prototype.getInstance=function(e){return void 0===e&&(e=this.DEFAULT_ID),this.instances[e]?this.clone(this.instances[e]):{}},e.prototype.clone=function(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t},e}();Number;var l=function(){}}}]);