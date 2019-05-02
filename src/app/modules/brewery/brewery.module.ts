import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreweryRoutingModule} from './brewery-routing.module';
import {DetailBreweriesComponent} from './pages/visitor/detail-breweries/detail-breweries.component';
import {BreweryprofileComponent} from './components/breweryprofile/breweryprofile.component';
import {BreweryService} from './shared/brewery.service';
import { TextTruncateModule } from 'src/app/shared/components/text-truncate/text-truncate.module';
import { BrewerybeerprofileComponent } from './components/brewerybeerprofile/brewerybeerprofile.component';

@NgModule({
    imports: [
        CommonModule,
        BreweryRoutingModule,
        TextTruncateModule
    ],
    declarations: [
        DetailBreweriesComponent,
        BreweryprofileComponent,
        BrewerybeerprofileComponent,
    ],
    providers: [
        BreweryService
    ]
})
export class BreweryModule {
}
