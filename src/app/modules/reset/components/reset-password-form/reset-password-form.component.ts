import {invalid} from '@angular/compiler/src/render3/view/util';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {ResetPasswordService} from '../../shared/reset-password.service';

@Component({
    selector: 'app-reset-password-form',
    templateUrl: './reset-password-form.component.html',
    styles: []
})
export class ResetPasswordFormComponent implements OnInit {

    @Input() accessToken: string;
    formResetPassword;

    constructor(private formBuilder: FormBuilder, private resetPasswordService: ResetPasswordService) {
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
        console.log(c);
        if (c.get('password').value !== c.get('passwordRepeat').value) {
            return {invalid: true};
        }
    }

    resetPassword() {
        if (this.formResetPassword.valid) {
            this.resetPasswordService.resetPassword(this.formResetPassword.value.passwords.password, this.accessToken);
        }
    }
}
