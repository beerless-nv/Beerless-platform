import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BeerItemComponent} from './components/beer-item/beer-item.component';
import {BeersSidebarComponent} from './components/beers-sidebar/beers-sidebar.component';
import {RouterModule} from '@angular/router';
import {IndexBeersComponent} from './pages/visitor/index-beers/index-beers.component';
import {AddBeersComponent} from './pages/member/add-beers/add-beers.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgBootstrapModule} from '../../shared/modules/ng-bootstrap.module';
import {NgxBootstrapModule} from '../../shared/modules/ngx-bootstrap.module';
import {AddBeerComponent} from './components/add-beer/add-beer.component';
import {AddBeerBreweryItemComponent} from './components/add-beer/add-beer-brewery-item/add-beer-brewery-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DetailBeersComponent} from './pages/visitor/detail-beers/detail-beers.component';
import {BeerbreweryprofileComponent} from './components/beerbreweryprofile/beerbreweryprofile.component';
import {BeerprofileComponent} from './components/beerprofile/beerprofile.component';
import {TextTruncateModule} from '../../shared/components/text-truncate/text-truncate.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxPaginationModule,
        NgBootstrapModule,
        NgxBootstrapModule,
        FormsModule,
        ReactiveFormsModule,
        TextTruncateModule
    ],
    declarations: [
        BeerItemComponent,
        BeersSidebarComponent,
        IndexBeersComponent,
        AddBeersComponent,
        AddBeerComponent,
        AddBeerBreweryItemComponent,
        DetailBeersComponent,
        BeerbreweryprofileComponent,
        BeerprofileComponent,
    ]
})
export class BeerModule {
}
