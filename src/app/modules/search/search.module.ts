import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {ButtonsModule} from '../../shared/components/buttons/buttons.module';
import {NgBootstrapModule} from '../../shared/modules/ng-bootstrap.module';
import {BeerService} from '../beer/shared/beer.service';
import {BeerItemComponent} from './components/beer-item/beer-item.component';
import {BeersSidebarComponent} from './components/beers-sidebar/beers-sidebar.component';
import {SearchIndexComponent} from './pages/visitor/search-index/search-index.component';
import {SearchRoutingModule} from './search-routing.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

@NgModule({
    imports: [
        CommonModule,
        SearchRoutingModule,
        NgBootstrapModule,
        NgxPaginationModule,
        ButtonsModule
    ],
    declarations: [
        SearchIndexComponent,
        BeerItemComponent,
        BeersSidebarComponent,
        SearchBarComponent,
        SearchResultsComponent,
    ],
    providers: [
        BeerService
    ]
})
export class SearchModule {
}
