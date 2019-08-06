import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminLayoutModule} from './admin-layout/admin-layout.module';
import {BlankLayoutModule} from './blank-layout/blank-layout.module';
import {StandardLayoutModule} from './standard-layout/standard-layout.module';

@NgModule({
    imports: [
        CommonModule,
        BlankLayoutModule,
        StandardLayoutModule,
        AdminLayoutModule
    ],
    declarations: [],
    exports: [
        BlankLayoutModule,
        StandardLayoutModule,
        AdminLayoutModule
    ]
})
export class LayoutsModule {
}
