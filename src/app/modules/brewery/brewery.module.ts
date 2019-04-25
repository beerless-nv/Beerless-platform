import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailBreweriesComponent} from './pages/visitor/detail-breweries/detail-breweries.component';
import {BreweryprofileComponent} from './components/breweryprofile/breweryprofile.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        DetailBreweriesComponent,
        BreweryprofileComponent,
    ]
})
export class BreweryModule {
}
