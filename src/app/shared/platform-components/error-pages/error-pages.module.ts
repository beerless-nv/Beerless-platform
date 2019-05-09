import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Err404Component} from './err404/err404.component';

import {ErrorPagesRoutingModule} from './error-pages-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ErrorPagesRoutingModule
    ],
    declarations: [
        Err404Component
    ]
})
export class ErrorPagesModule {
}
