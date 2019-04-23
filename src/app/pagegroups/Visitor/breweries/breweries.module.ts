import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailBreweriesComponent} from '../../Visitor/breweries/detail-breweries/detail-breweries.component';
import {BreweryprofileComponent} from '../../Visitor/breweries/detail-breweries/breweryprofile/breweryprofile.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        DetailBreweriesComponent,
        BreweryprofileComponent,
    ]
})
export class BreweriesModule {
}
