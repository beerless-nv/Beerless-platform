import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbCollapseModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        NgbCollapseModule.forRoot(),
        NgbModalModule.forRoot(),
    ],
    exports: [
        NgbCollapseModule,
        NgbModalModule
    ],
    declarations: []
})
export class NgBootstrapModule {
}
