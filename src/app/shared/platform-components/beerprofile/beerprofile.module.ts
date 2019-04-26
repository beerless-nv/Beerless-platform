import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextTruncateModule} from '../../components/text-truncate/text-truncate.module';
import {BeerprofileComponent} from './beerprofile/beerprofile.component';

@NgModule({
    imports: [
        CommonModule,
        TextTruncateModule
    ],
    declarations: [
        BeerprofileComponent
    ],
    exports: [
        BeerprofileComponent
    ]
})
export class BeerprofileModule {
}
