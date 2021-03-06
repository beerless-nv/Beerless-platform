import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ChatbotModule} from '../../../shared/components/chatbot/chatbot.module';
import {FooterModule} from '../../../shared/components/footer/footer.module';
import {NavbarMobileModule} from '../../../shared/components/navbar-mobile/navbar-mobile.module';
import {NavbarModule} from '../../../shared/components/navbar/navbar.module';
import {StandardLayoutComponent} from './standard-layout/standard-layout.component';

@NgModule({
    imports: [
        CommonModule,
        NavbarModule,
        NavbarMobileModule,
        FooterModule,
        RouterModule,
        ChatbotModule
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
