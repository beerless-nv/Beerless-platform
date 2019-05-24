import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
    NgbCollapseModule, NgbDropdownModule,
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
        NgbPopoverModule.forRoot(),
        NgbDropdownModule.forRoot()
    ],
    exports: [
        NgbCollapseModule,
        NgbModalModule,
        NgbTooltipModule,
        NgbPopoverModule,
        NgbDropdownModule
    ],
    declarations: []
})
export class NgBootstrapModule {
}
