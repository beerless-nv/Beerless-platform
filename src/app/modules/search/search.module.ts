import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {ButtonsModule} from '../../shared/components/buttons/buttons.module';
import {HeadersModule} from '../../shared/components/headers/headers.module';
import {NgBootstrapModule} from '../../shared/modules/ng-bootstrap.module';
import {BeerService} from '../beer/shared/beer.service';
import {SearchItemComponent} from './components/search-item/search-item.component';
import {BeersSidebarComponent} from './components/beers-sidebar/beers-sidebar.component';
import {SearchIndexComponent} from './pages/visitor/search-index/search-index.component';
import {SearchRoutingModule} from './search-routing.module';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {ClickOutsideModule} from 'ng-click-outside';

@NgModule({
    imports: [
        CommonModule,
        SearchRoutingModule,
        NgBootstrapModule,
        NgxPaginationModule,
        ButtonsModule,
        ClickOutsideModule,
        HeadersModule
    ],
    declarations: [
        SearchIndexComponent,
        SearchItemComponent,
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
