import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ChatbotModule} from '../../../shared/components/chatbot/chatbot.module';
import {FooterModule} from '../../../shared/components/footer/footer.module';
import {NavbarMobileModule} from '../../../shared/components/navbar-mobile/navbar-mobile.module';
import {NavbarModule} from '../../../shared/components/navbar/navbar.module';
import {SidebarModule} from '../../../shared/components/sidebar/sidebar.module';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';

@NgModule({
    imports: [
        CommonModule,
        NavbarModule,
        NavbarMobileModule,
        FooterModule,
        RouterModule,
        ChatbotModule,
        SidebarModule
    ],
    declarations: [
        AdminLayoutComponent
    ],
    exports: [
        AdminLayoutComponent
    ]
})
export class AdminLayoutModule {
}
