import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {NgBootstrapModule} from '../../../sharedModules/ng-bootstrap.module';
import {
    AuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider,
    LinkedinLoginProvider,
    SocialLoginModule
} from 'angular-6-social-login';

export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('719680298387454')
            },
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('648305944502-pbh5nhql3gk1domrop4gimlc2cfnrro0.apps.googleusercontent.com')
            },
            // {
            //     id: LinkedinLoginProvider.PROVIDER_ID,
            //     provider: new LinkedinLoginProvider('')
            // },
        ]
    );
    return config;
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgBootstrapModule,
        SocialLoginModule
    ],
    declarations: [LoginComponent],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        }
    ]
})
export class LoginModule {
}
