import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../../../app-routing.module';
import {NavbarMobileComponent} from './navbar-mobile/navbar-mobile.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
    ],
    declarations: [
        NavbarMobileComponent
    ],
    exports: [
        NavbarMobileComponent
    ]
})
export class NavbarMobileModule {
}
