import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {NgBootstrapModule} from '../../../sharedModules/ng-bootstrap.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgBootstrapModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
