import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeadersModule} from '../../shared/components/headers/headers.module';
import {InputFieldsModule} from '../../shared/components/input-fields/input-fields.module';
import {ServerSideMessagesModule} from '../../shared/components/server-side-messages/server-side-messages.module';
import {TextTruncateModule} from '../../shared/components/text-truncate/text-truncate.module';
import {SettingsUsersComponent} from './pages/member/settings-users/settings-users.component';
import {NgxBootstrapModule} from '../../shared/modules/ngx-bootstrap.module';
import {SettingsProfileComponent} from './components/settings-profile/settings-profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {WishlistUsersComponent} from './pages/visitor/wishlist-users/wishlist-users.component';
import {ProfileUsersComponent} from './pages/visitor/profile-users/profile-users.component';
import {ProfileSidebarComponent} from './components/profile-sidebar/profile-sidebar.component';
import {ProfileCoverComponent} from './components/profile-cover/profile-cover.component';
import {ProfileContentComponent} from './components/profile-content/profile-content.component';
import {ProfileAboutComponent} from './components/profile-content/profile-about/profile-about.component';
import {ProfileFavouriteComponent} from './components/profile-content/profile-about/profile-favourite/profile-favourite.component';
import {ProfileStatsComponent} from './components/profile-content/profile-about/profile-stats/profile-stats.component';
import {ProfileActivitiesComponent} from './components/profile-content/profile-activities/profile-activities.component';
import {ActivityService} from './shared/activity.service';
import {UserSettingsService} from './shared/user-settings.service';
import {UserRoutingModule} from './user-routing.module';

@NgModule({
    imports: [
        CommonModule,
        NgxBootstrapModule,
        ReactiveFormsModule,
        UserRoutingModule,
        TextTruncateModule,
        InputFieldsModule,
        ServerSideMessagesModule,
        HeadersModule
    ],
    declarations: [
        SettingsUsersComponent,
        SettingsProfileComponent,
        WishlistUsersComponent,
        ProfileUsersComponent,
        ProfileSidebarComponent,
        ProfileCoverComponent,
        ProfileContentComponent,
        ProfileAboutComponent,
        ProfileFavouriteComponent,
        ProfileStatsComponent,
        ProfileActivitiesComponent,
    ],
    providers: [
        ActivityService,
        UserSettingsService
    ]
})
export class UserModule {
}
