import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../../../app-routing.module';
import {SidebarService} from './sidebar.service';
import {SidebarComponent} from './sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    declarations: [
        SidebarComponent
    ],
    exports: [
        SidebarComponent
    ],
    providers: [
        SidebarService
    ]
})
export class SidebarModule {
}
