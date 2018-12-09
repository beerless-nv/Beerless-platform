import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsUsersComponent} from './settings-users/settings-users.component';
import {NgxBootstrapModule} from '../../../sharedModules/ngx-bootstrap.module';
import { SettingsProfileComponent } from '../../Member/users/settings-users/settings-profile/settings-profile.component';

@NgModule({
    imports: [
        CommonModule,
        NgxBootstrapModule,
    ],
    declarations: [SettingsUsersComponent, SettingsProfileComponent]
})
export class UsersModule {
}
