import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ConfirmEmailComponent} from './pages/visitor/confirm-email/confirm-email.component';
import {SignupComponent} from './pages/visitor/signup/signup.component';

const routes: Routes = [
    {path: '', component: SignupComponent},
    {path: 'confirm', component: ConfirmEmailComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignUpRoutingModule {
}
