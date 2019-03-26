import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsUsersComponent} from './settings-users/settings-users.component';
import {NgxBootstrapModule} from '../../../sharedModules/ngx-bootstrap.module';
import {SettingsProfileComponent} from './settings-users/settings-profile/settings-profile.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NgxBootstrapModule,
        ReactiveFormsModule,
    ],
    declarations: [
        SettingsUsersComponent,
        SettingsProfileComponent
    ]
})
export class UsersModule {
}
