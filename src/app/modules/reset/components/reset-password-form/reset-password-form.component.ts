import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorService} from '../../../../shared/components/error/error.service';
import {ResetPasswordService} from '../../shared/reset-password.service';

@Component({
    selector: 'app-reset-password-form',
    templateUrl: './reset-password-form.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: []
})
export class ResetPasswordFormComponent implements OnInit {

    @Input() accessToken: string;
    formResetPassword;
    serverSideMessages: any;

    constructor(private formBuilder: FormBuilder, private resetPasswordService: ResetPasswordService, private errorService: ErrorService, private router: Router) {
        errorService.errorMessages$.subscribe(err => {
            this.serverSideMessages = {type: 'error', data: err};
        });
    }

    ngOnInit() {
        this.formResetPassword = this.formBuilder.group({
            passwords: this.formBuilder.group({
                password: new FormControl('', [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$')
                ]),
                passwordRepeat: new FormControl('')
            }, {validator: this.passwordConfirming})
        });
    }

    passwordConfirming(c: AbstractControl): { invalid: boolean } {
        if (c.get('password').value !== c.get('passwordRepeat').value) {
            return {invalid: true};
        }
    }

    resetPassword() {
        if (this.formResetPassword.valid) {
            this.resetPasswordService.resetPassword(this.formResetPassword.value.passwords.password, this.accessToken)
                .then(data => {
                    if (data === 'Unauthorized')  {
                        this.serverSideMessages = {type: 'error', data: ['Your password reset has expired!']};
                    } else if (data === true) {
                        this.serverSideMessages = {type: 'success', data: ['Your password has been reset, you will be redirected to the login page.']};
                        setTimeout(() => {
                            this.router.navigate(['sign-in']);
                        }, 1500);
                    }
                });
        }
    }
}
