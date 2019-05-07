import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestrictPlatformComponent} from './restrict-platform/restrict-platform.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RestrictPlatformComponent
    ],
    exports: [
        RestrictPlatformComponent
    ],
    entryComponents: [
        RestrictPlatformComponent
    ]
})
export class RestrictPlatformModule {
}
