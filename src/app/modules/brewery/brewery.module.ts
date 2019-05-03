import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreweryprofileModule} from '../../shared/platform-components/breweryprofile/breweryprofile.module';
import {BreweryRoutingModule} from './brewery-routing.module';
import {DetailBreweriesComponent} from './pages/visitor/detail-breweries/detail-breweries.component';
import {BreweryService} from './shared/brewery.service';
import {TextTruncateModule} from 'src/app/shared/components/text-truncate/text-truncate.module';
import {BrewerybeerprofileComponent} from './components/brewerybeerprofile/brewerybeerprofile.component';

@NgModule({
    imports: [
        CommonModule,
        BreweryRoutingModule,
        TextTruncateModule,
        BreweryprofileModule
    ],
    declarations: [
        DetailBreweriesComponent,
        BrewerybeerprofileComponent,
    ],
    providers: [
        BreweryService
    ]
})
export class BreweryModule {
}
