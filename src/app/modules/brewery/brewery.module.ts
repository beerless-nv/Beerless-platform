import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreweryRoutingModule} from './brewery-routing.module';
import {DetailBreweriesComponent} from './pages/visitor/detail-breweries/detail-breweries.component';
import {BreweryprofileComponent} from './components/breweryprofile/breweryprofile.component';
import {BreweryService} from './shared/brewery.service';

@NgModule({
    imports: [
        CommonModule,
        BreweryRoutingModule
    ],
    declarations: [
        DetailBreweriesComponent,
        BreweryprofileComponent,
    ],
    providers: [
        BreweryService
    ]
})
export class BreweryModule {
}
