import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SigninBackgroundCardComponent} from './components/signin-background-card/signin-background-card.component';
import {SigninFormComponent} from './components/signin-form/signin-form.component';
import {SigninComponent} from './pages/visitor/signin/signin.component';
import {SignInService} from './shared/sign-in.service';
import {SignInRoutingModule} from './sign-in-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SignInRoutingModule
    ],
    declarations: [
        SigninComponent,
        SigninBackgroundCardComponent,
        SigninFormComponent
    ],
    providers: [
        SignInService
    ]
})
export class SignInModule {
}
