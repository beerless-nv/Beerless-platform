import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SassHelperComponent} from './sass-helper.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SassHelperComponent
    ],
    exports: [
        SassHelperComponent
    ]
})
export class SassHelperModule {
}
