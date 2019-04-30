import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-reset-password-form',
    templateUrl: './reset-password-form.component.html',
    styles: []
})
export class ResetPasswordFormComponent implements OnInit {

    resetPasswordForm: FormGroup;

    constructor() {
    }

    ngOnInit() {
        this.resetPasswordForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
        });

    }

}
