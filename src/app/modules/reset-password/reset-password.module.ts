import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ResetPasswordComponent} from './pages/visitor/reset-password/reset-password.component';
import {ResetPasswordRoutingModule} from './reset-password-routing.module';
import {ResetPasswordFormComponent} from './components/reset-password-form/reset-password-form.component';

@NgModule({
    imports: [
        CommonModule,
        ResetPasswordRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        ResetPasswordComponent,
        ResetPasswordFormComponent
    ]
})
export class ResetPasswordModule {
}
