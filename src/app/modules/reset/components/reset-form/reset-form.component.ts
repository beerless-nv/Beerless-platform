import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from '../../shared/reset-password.service';

@Component({
    selector: 'app-reset-form',
    templateUrl: './reset-form.component.html',
    styles: []
})
export class ResetFormComponent implements OnInit {

    resetPasswordForm: FormGroup;

    constructor(private resetPasswordService: ResetPasswordService) {
    }

    ngOnInit() {
        this.resetPasswordForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
        });
    }

    reset() {
        this.resetPasswordService.reset(this.resetPasswordForm.value);
    }

}
