import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {InputFieldsModule} from '../../../components/input-fields/input-fields.module';
import {ServerSideMessagesModule} from '../../../components/server-side-messages/server-side-messages.module';
import {SocialCredentialComponent} from './social-credential/social-credential.component';

@NgModule({
    imports: [
        CommonModule,
        InputFieldsModule,
        ReactiveFormsModule,
        ServerSideMessagesModule
    ],
    declarations: [
        SocialCredentialComponent
    ],
    entryComponents: [
        SocialCredentialComponent
    ]
})
export class SocialCredentialModule {
}
