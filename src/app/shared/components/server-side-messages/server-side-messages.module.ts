import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServerSideMessagesComponent} from './server-side-messages/server-side-messages.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ServerSideMessagesComponent
    ],
    exports: [
        ServerSideMessagesComponent
    ]
})
export class ServerSideMessagesModule {
}
