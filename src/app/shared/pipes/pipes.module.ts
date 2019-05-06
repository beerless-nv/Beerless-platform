import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafeCssPipe} from './safe-css.pipe';
import {SafeHtmlPipe} from './safe-html.pipe';
import {SafeUrlPipe} from './safe-url.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SafeHtmlPipe,
        SafeUrlPipe,
        SafeCssPipe
    ],
    exports: [
        SafeHtmlPipe,
        SafeUrlPipe,
        SafeCssPipe
    ]
})
export class PipesModule {
}
