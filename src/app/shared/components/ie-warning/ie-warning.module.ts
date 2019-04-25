import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IeWarningComponent} from './ie-warning/ie-warning.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        IeWarningComponent
    ],
    exports: [
        IeWarningComponent
    ],
    entryComponents: [
        IeWarningComponent
    ]
})
export class IeWarningModule {
}
