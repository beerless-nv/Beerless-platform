import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextTruncateModule} from '../../components/text-truncate/text-truncate.module';
import {BreweryprofileComponent} from './breweryprofile/breweryprofile.component';

@NgModule({
    imports: [
        CommonModule,
        TextTruncateModule
    ],
    declarations: [
        BreweryprofileComponent
    ],
    exports: [
        BreweryprofileComponent
    ]
})
export class BreweryprofileModule {
}
