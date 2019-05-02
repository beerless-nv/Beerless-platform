import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ResetFormComponent} from './components/reset-form/reset-form.component';
import {ResetPasswordComponent} from './pages/visitor/reset-password/reset-password.component';
import {ResetComponent} from './pages/visitor/reset/reset.component';
import {ResetRoutingModule} from './reset-routing.module';
import {ResetPasswordFormComponent} from './components/reset-password-form/reset-password-form.component';
import {ResetPasswordService} from './shared/reset-password.service';

@NgModule({
    imports: [
        CommonModule,
        ResetRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        ResetComponent,
        ResetFormComponent,
        ResetPasswordFormComponent,
        ResetPasswordComponent
    ],
    providers: [
        ResetPasswordService
    ]
})
export class ResetModule {
}
