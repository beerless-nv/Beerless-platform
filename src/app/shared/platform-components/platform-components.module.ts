import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BeerprofileModule} from './beerprofile/beerprofile.module';
import {BreweryprofileModule} from './breweryprofile/breweryprofile.module';
import {ErrorPagesModule} from './error-pages/error-pages.module';
import {SocialCredentialModule} from './modals/social-credential/social-credential.module';

@NgModule({
    imports: [
        CommonModule,
        BeerprofileModule,
        BreweryprofileModule,
        ErrorPagesModule,
        SocialCredentialModule
    ],
    declarations: [],
    exports: [
        BeerprofileModule,
        BreweryprofileModule,
        ErrorPagesModule,
        SocialCredentialModule
    ]
})
export class PlatformComponentsModule {
}
