import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
    NgbCollapseModule,
    NgbModalModule,
    NgbPopoverModule,
    NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        NgbCollapseModule.forRoot(),
        NgbModalModule.forRoot(),
        NgbTooltipModule.forRoot(),
        NgbPopoverModule.forRoot()
    ],
    exports: [
        NgbCollapseModule,
        NgbModalModule,
        NgbTooltipModule,
        NgbPopoverModule
    ],
    declarations: []
})
export class NgBootstrapModule {
}
