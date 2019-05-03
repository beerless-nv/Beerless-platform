import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BeerprofileModule} from './beerprofile/beerprofile.module';
import {BreweryprofileModule} from './breweryprofile/breweryprofile.module';

@NgModule({
    imports: [
        CommonModule,
        BeerprofileModule,
        BreweryprofileModule
    ],
    declarations: [],
    exports: [
        BeerprofileModule,
        BreweryprofileModule
    ]
})
export class PlatformComponentsModule {
}
