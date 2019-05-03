import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignInService} from '../../../../../core/user/sign-in.service';
import {ErrorService} from '../../../../../shared/components/error/error.service';

@Component({
    selector: 'app-signin-remember-form',
    templateUrl: './signin-remember-form.component.html',
    styles: []
})
export class SigninRememberFormComponent implements OnInit {

    formLoginRemembered: FormGroup;
    rememberedUser: any;
    serverSideMessages: any;

    constructor(private signInService: SignInService, private errorService: ErrorService) {
        const user = JSON.parse(localStorage.getItem('r-u-data'));
        if (user) {
            this.rememberedUser = user;
        }
    }

    ngOnInit() {
        this.formLoginRemembered = new FormGroup({
            username: new FormControl(this.rememberedUser.username, Validators.required),
            password: new FormControl('', Validators.required)
        });

        this.errorService.errorMessages$.subscribe(err => {
            this.serverSideMessages = {type: 'error', data: err};
        });
    }

    signIn() {
        this.signInService.signIn(this.formLoginRemembered.value);
    }

}
