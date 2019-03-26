import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TabsModule} from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        TabsModule.forRoot()
    ],
    exports: [
        TabsModule
    ],
    declarations: []
})
export class NgxBootstrapModule {
}
