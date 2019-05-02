import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxBootstrapModule} from 'src/app/shared/modules/ngx-bootstrap.module';
import {ProfileAboutComponent} from './components/profile-content/profile-about/profile-about.component';
import {ProfileFavouriteComponent} from './components/profile-content/profile-about/profile-favourite/profile-favourite.component';
import {ProfilePersonalComponent} from './components/profile-content/profile-about/profile-personal/profile-personal.component';
import {ProfileActivitiesComponent} from './components/profile-content/profile-activities/profile-activities.component';
import {ProfileContentComponent} from './components/profile-content/profile-content.component';
import {ProfileCoverComponent} from './components/profile-cover/profile-cover.component';
import {ProfileSidebarComponent} from './components/profile-sidebar/profile-sidebar.component';
import {SettingsProfileComponent} from './components/settings-profile/settings-profile.component';
import {SettingsUsersComponent} from './pages/member/settings-users/settings-users.component';
import {ProfileUsersComponent} from './pages/visitor/profile-users/profile-users.component';
import {WishlistUsersComponent} from './pages/visitor/wishlist-users/wishlist-users.component';
import {ActivityService} from './shared/activity.service';
import {UserService} from './shared/user.service';

@NgModule({
    imports: [
        CommonModule,
        NgxBootstrapModule,
        ReactiveFormsModule,
    ],
    declarations: [
        SettingsUsersComponent,
        SettingsProfileComponent,
        ProfileContentComponent,
        ProfileAboutComponent,
        ProfileActivitiesComponent,
        ProfileCoverComponent,
        ProfileSidebarComponent,
        ProfileUsersComponent,
        WishlistUsersComponent,
        ProfileFavouriteComponent,
        ProfilePersonalComponent
    ],
    providers: [
        ActivityService,
        UserService
    ]
})
export class UserModule {
}
