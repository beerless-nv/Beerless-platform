import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ChatbotModule} from '../../../components/chatbot/chatbot.module';
import {BlankLayoutComponent} from './blank-layout/blank-layout.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ChatbotModule
    ],
    declarations: [
        BlankLayoutComponent
    ],
    exports: [
        BlankLayoutComponent
    ]
})
export class BlankLayoutModule {
}
