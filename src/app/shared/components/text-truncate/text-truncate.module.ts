import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextTruncateComponent} from './text-truncate/text-truncate.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        TextTruncateComponent,
    ],
    exports: [
        TextTruncateComponent,
    ]
})
export class TextTruncateModule {
}
