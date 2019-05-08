import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoleGuardService} from '../../core/authorization/role-guard.service';
import {SettingsUsersComponent} from './pages/member/settings-users/settings-users.component';
import {ProfileUsersComponent} from './pages/visitor/profile-users/profile-users.component';
import {WishlistUsersComponent} from './pages/visitor/wishlist-users/wishlist-users.component';

const routes: Routes = [
    {path: 'settings', component: SettingsUsersComponent, canActivate: [RoleGuardService], data: {expectedRole: '$everyone'}},
    {path: 'profile/:id', component: ProfileUsersComponent, canActivate: [RoleGuardService], data: {expectedRole: '$everyone'}},
    {path: 'wishlist/:id', component: WishlistUsersComponent, canActivate: [RoleGuardService], data: {expectedRole: '$everyone'}},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
