import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipesModule} from '../../shared/pipes/pipes.module';
import {BreweryprofileModule} from '../../shared/platform-components/breweryprofile/breweryprofile.module';
import {BreweryRoutingModule} from './brewery-routing.module';
import {DetailBreweriesComponent} from './pages/visitor/detail-breweries/detail-breweries.component';
import {BreweryService} from './shared/brewery.service';
import {TextTruncateModule} from 'src/app/shared/components/text-truncate/text-truncate.module';
import {BrewerybeerprofileComponent} from './components/brewerybeerprofile/brewerybeerprofile.component';
import { BreweryLocationComponent } from './components/brewery-location/brewery-location.component';

@NgModule({
    imports: [
        CommonModule,
        BreweryRoutingModule,
        TextTruncateModule,
        BreweryprofileModule,
        PipesModule
    ],
    declarations: [
        DetailBreweriesComponent,
        BrewerybeerprofileComponent,
        BreweryLocationComponent,
    ],
    providers: [
        BreweryService
    ]
})
export class BreweryModule {
}
