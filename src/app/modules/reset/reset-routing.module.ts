import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ResetPasswordComponent} from './pages/visitor/reset-password/reset-password.component';
import {ResetComponent} from './pages/visitor/reset/reset.component';

const routes: Routes = [
    {path: '', component: ResetComponent},
    {path: ':accessToken', component: ResetPasswordComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResetRoutingModule {
}
