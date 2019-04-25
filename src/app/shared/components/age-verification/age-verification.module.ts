import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgeVerificationComponent} from './age-verification/age-verification.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AgeVerificationComponent
    ],
    exports: [
        AgeVerificationComponent
    ],
    entryComponents: [
        AgeVerificationComponent
    ]
})
export class AgeVerificationModule {
}
