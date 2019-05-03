import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorService} from '../../../../shared/components/error/error.service';
import {ResetPasswordService} from '../../shared/reset-password.service';

@Component({
    selector: 'app-reset-form',
    templateUrl: './reset-form.component.html',
    styles: []
})
export class ResetFormComponent implements OnInit {

    resetPasswordForm: FormGroup;
    serverSideMessages: any;

    constructor(private resetPasswordService: ResetPasswordService, private errorService: ErrorService) {
        this.errorService.errorMessages$.subscribe(err => {
            this.serverSideMessages = {type: 'error', data: err};
        });
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
        if (this.resetPasswordForm.valid) {
            this.resetPasswordService.reset(this.resetPasswordForm.value)
                .then(data => {
                    this.serverSideMessages = {type: 'success', data: ['Great! In a few minutes, you\'ll receive an email with the instructions!']};
                });
        }
    }

}
