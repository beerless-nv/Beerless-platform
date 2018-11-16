import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BeerItemComponent} from '../../Visitor/beers/index-beers/beer-item/beer-item.component';
import {BeersSidebarComponent} from '../../Visitor/beers/index-beers/beers-sidebar/beers-sidebar.component';
import {RouterModule} from '@angular/router';
import {IndexBeersComponent} from '../../Visitor/beers/index-beers/index-beers.component';
import {AddBeersComponent} from './add-beers/add-beers.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgBootstrapModule} from '../../../sharedModules/ng-bootstrap.module';
import {NgxBootstrapModule} from '../../../sharedModules/ngx-bootstrap.module';
import {AddBeerComponent} from './add-beers/add-beer/add-beer.component';
import {AddBeerBreweryItemComponent} from './add-beers/add-beer/add-beer-brewery-item/add-beer-brewery-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxPaginationModule,
        NgBootstrapModule,
        NgxBootstrapModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        BeerItemComponent,
        BeersSidebarComponent,
        IndexBeersComponent,
        AddBeersComponent,
        AddBeerComponent,
        AddBeerBreweryItemComponent
    ]
})
export class BeersModule {
}
