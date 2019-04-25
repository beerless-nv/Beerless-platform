import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {RegularMenuItemComponent} from './navbar/regular-menu-item/regular-menu-item.component';
import {AppRoutingModule} from '../../../app-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
    ],
    declarations: [
        NavbarComponent,
        RegularMenuItemComponent
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule {
}
