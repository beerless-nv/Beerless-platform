import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SigninBackgroundCardComponent} from './components/signin-background-card/signin-background-card.component';
import {SigninManualFormComponent} from './components/signin-form/signin-manual-form/signin-manual-form.component';
import {SigninComponent} from './pages/visitor/signin/signin.component';
import {SignInRoutingModule} from './sign-in-routing.module';
import {SigninRememberFormComponent} from './components/signin-form/signin-remember-form/signin-remember-form.component';
import {SigninFormComponent} from './components/signin-form/signin-form.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SignInRoutingModule
    ],
    declarations: [
        SigninComponent,
        SigninBackgroundCardComponent,
        SigninManualFormComponent,
        SigninRememberFormComponent,
        SigninFormComponent,
    ],
    providers: []
})
export class SignInModule {
}
