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
    messageLogin;

    constructor(private signInService: SignInService, private errorService: ErrorService) {
    }

    ngOnInit() {
        this.formLoginRemembered = new FormGroup({
            username: new FormControl('Test112', Validators.required),
            password: new FormControl('', Validators.required)
        });

        this.errorService.errorMessages$.subscribe(data => this.messageLogin = data);
    }

    signIn() {
        this.signInService.signIn(this.formLoginRemembered.value);
    }

}
