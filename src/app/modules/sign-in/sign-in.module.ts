import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../../app-routing.module';
import {SigninBackgroundCardComponent} from './components/signin-background-card/signin-background-card.component';
import {SigninFormComponent} from './components/signin-form/signin-form.component';
import {SigninComponent} from './pages/visitor/signin/signin.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ],
    declarations: [
        SigninComponent,
        SigninBackgroundCardComponent,
        SigninFormComponent
    ]
})
export class SignInModule {
}
