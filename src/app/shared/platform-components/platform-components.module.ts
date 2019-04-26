import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BeerprofileModule} from './beerprofile/beerprofile.module';

@NgModule({
    imports: [
        CommonModule,
        BeerprofileModule,
    ],
    declarations: [],
    exports: [
        BeerprofileModule
    ]
})
export class PlatformComponentsModule {
}
