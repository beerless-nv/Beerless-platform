import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SettingsUsersComponent} from './pages/member/settings-users/settings-users.component';
import {ProfileUsersComponent} from './pages/visitor/profile-users/profile-users.component';
import {WishlistUsersComponent} from './pages/visitor/wishlist-users/wishlist-users.component';

const routes: Routes = [
    {path: 'settings', component: SettingsUsersComponent},
    {path: 'profile/:id', component: ProfileUsersComponent},
    {path: 'wishlist/:id', component: WishlistUsersComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
