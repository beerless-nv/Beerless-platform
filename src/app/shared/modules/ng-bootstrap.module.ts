import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbCollapseModule, NgbModalModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        NgbCollapseModule.forRoot(),
        NgbModalModule.forRoot(),
        NgbTooltipModule.forRoot()
    ],
    exports: [
        NgbCollapseModule,
        NgbModalModule,
        NgbTooltipModule
    ],
    declarations: []
})
export class NgBootstrapModule {
}
