import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../../app-routing.module';
import {SignupBackgroundCardComponent} from './components/signup-background-card/signup-background-card.component';
import {SignupFormComponent} from './components/signup-form/signup-form.component';
import {SignupComponent} from './pages/visitor/signup/signup.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ],
    declarations: [
        SignupComponent,
        SignupBackgroundCardComponent,
        SignupFormComponent
    ]
})
export class SignUpModule {
}
