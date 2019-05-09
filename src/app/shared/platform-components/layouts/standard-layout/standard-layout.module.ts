import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../../../../app-routing.module';
import {FooterModule} from '../../../components/footer/footer.module';
import {NavbarMobileModule} from '../../../components/navbar-mobile/navbar-mobile.module';
import {NavbarModule} from '../../../components/navbar/navbar.module';
import {StandardLayoutComponent} from './standard-layout/standard-layout.component';

@NgModule({
    imports: [
        CommonModule,
        NavbarModule,
        NavbarMobileModule,
        FooterModule,
        RouterModule
    ],
    declarations: [
        StandardLayoutComponent
    ],
    exports: [
        StandardLayoutComponent
    ]
})
export class StandardLayoutModule {
}
