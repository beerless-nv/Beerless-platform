import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StickyHeaderComponent} from './sticky-header/sticky-header.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        StickyHeaderComponent
    ],
    exports: [
        StickyHeaderComponent
    ]
})
export class HeadersModule {
}
