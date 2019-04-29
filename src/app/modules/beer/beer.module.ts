import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BeerprofileModule} from '../../shared/platform-components/beerprofile/beerprofile.module';
import {BeerRoutingModule} from './beer-routing.module';
import {RouterModule} from '@angular/router';
import {AddBeersComponent} from './pages/member/add-beers/add-beers.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgBootstrapModule} from '../../shared/modules/ng-bootstrap.module';
import {NgxBootstrapModule} from '../../shared/modules/ngx-bootstrap.module';
import {AddBeerComponent} from './components/add-beer/add-beer.component';
import {AddBeerBreweryItemComponent} from './components/add-beer/add-beer-brewery-item/add-beer-brewery-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DetailBeersComponent} from './pages/visitor/detail-beers/detail-beers.component';
import {BeerbreweryprofileComponent} from './components/beerbreweryprofile/beerbreweryprofile.component';
import {TextTruncateModule} from '../../shared/components/text-truncate/text-truncate.module';
import {BeerService} from './shared/beer.service';
import {BeertypeService} from './shared/beertype.service';
import { BeerRecommendationsComponent } from './components/beer-recommendations/beer-recommendations.component';

@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,
        NgBootstrapModule,
        NgxBootstrapModule,
        FormsModule,
        ReactiveFormsModule,
        TextTruncateModule,
        BeerRoutingModule,
        BeerprofileModule,
    ],
    declarations: [
        AddBeersComponent,
        AddBeerComponent,
        AddBeerBreweryItemComponent,
        DetailBeersComponent,
        BeerbreweryprofileComponent,
        BeerRecommendationsComponent,
    ],
    providers: [
        BeerService,
        BeertypeService
    ]
})
export class BeerModule {
}
