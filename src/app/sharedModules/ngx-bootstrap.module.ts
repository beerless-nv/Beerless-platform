import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModalModule, TabsModule} from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        TabsModule.forRoot(),
        ModalModule.forRoot(),
    ],
    exports: [
        TabsModule,
        ModalModule,
    ],
    declarations: []
})
export class NgxBootstrapModule {
}
