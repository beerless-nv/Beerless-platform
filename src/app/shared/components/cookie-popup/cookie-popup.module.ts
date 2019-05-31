import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CookiePopupComponent} from './cookie-popup/cookie-popup.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CookiePopupComponent
    ],
    exports: [
        CookiePopupComponent
    ]
})
export class CookiePopupModule {
}
