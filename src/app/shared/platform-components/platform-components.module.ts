import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BeerprofileModule} from './beerprofile/beerprofile.module';
import {BreweryprofileModule} from './breweryprofile/breweryprofile.module';
import {ErrorPagesModule} from './error-pages/error-pages.module';
import {BlankLayoutModule} from './layouts/blank-layout/blank-layout.module';
import {StandardLayoutModule} from './layouts/standard-layout/standard-layout.module';
import {SocialCredentialModule} from './modals/social-credential/social-credential.module';

@NgModule({
    imports: [
        CommonModule,
        BeerprofileModule,
        BreweryprofileModule,
        StandardLayoutModule,
        BlankLayoutModule,
        ErrorPagesModule,
        SocialCredentialModule
    ],
    declarations: [],
    exports: [
        BeerprofileModule,
        BreweryprofileModule,
        StandardLayoutModule,
        BlankLayoutModule,
        ErrorPagesModule,
        SocialCredentialModule
    ]
})
export class PlatformComponentsModule {
}
