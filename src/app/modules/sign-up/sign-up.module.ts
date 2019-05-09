import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule} from '../../shared/components/buttons/buttons.module';
import {InputFieldsModule} from '../../shared/components/input-fields/input-fields.module';
import {ServerSideMessagesModule} from '../../shared/components/server-side-messages/server-side-messages.module';
import {SignupBackgroundCardComponent} from './components/signup-background-card/signup-background-card.component';
import {SignupFormComponent} from './components/signup-form/signup-form.component';
import {SignupComponent} from './pages/visitor/signup/signup.component';
import {SignUpService} from './shared/sign-up.service';
import {SignUpRoutingModule} from './sign-up-routing.module';
import { ConfirmEmailComponent } from './pages/visitor/confirm-email/confirm-email.component';
import { ConfirmEmailFormComponent } from './components/confirm-email-form/confirm-email-form.component';
import { ConfirmEmailErrorComponent } from './components/confirm-email-error/confirm-email-error.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SignUpRoutingModule,
        ServerSideMessagesModule,
        InputFieldsModule,
        ButtonsModule
    ],
    declarations: [
        SignupComponent,
        SignupBackgroundCardComponent,
        SignupFormComponent,
        ConfirmEmailComponent,
        ConfirmEmailFormComponent,
        ConfirmEmailErrorComponent
    ],
    providers: [
        SignUpService
    ]
})
export class SignUpModule {
}
