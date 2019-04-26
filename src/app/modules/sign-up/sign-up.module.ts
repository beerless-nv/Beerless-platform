import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SignupBackgroundCardComponent} from './components/signup-background-card/signup-background-card.component';
import {SignupFormComponent} from './components/signup-form/signup-form.component';
import {SignupComponent} from './pages/visitor/signup/signup.component';
import {SignUpService} from './shared/sign-up.service';
import {SignUpRoutingModule} from './sign-up-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SignUpRoutingModule
    ],
    declarations: [
        SignupComponent,
        SignupBackgroundCardComponent,
        SignupFormComponent
    ],
    providers: [
        SignUpService
    ]
})
export class SignUpModule {
}
