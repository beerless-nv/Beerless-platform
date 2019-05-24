import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfiniteScrollerDirective} from './directives/infinite-scroller.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        InfiniteScrollerDirective
    ]
})
export class DirectivesModule {
}
