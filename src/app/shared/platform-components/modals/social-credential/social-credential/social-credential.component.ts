import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../../../core/user/user.service';
import {ErrorService} from '../../../../components/error/error.service';

@Component({
    selector: 'app-social-credential',
    templateUrl: './social-credential.component.html',
    styles: []
})
export class SocialCredentialComponent implements OnInit {

    formCredentials: FormGroup;
    serverSideMessages: any;

    constructor(private errorService: ErrorService, private userService: UserService, private activeModal: NgbActiveModal) {
    }

    ngOnInit() {
        this.errorService.errorMessages$.subscribe(data => {
            this.serverSideMessages = {type: 'error', data: data};
        });

        this.formCredentials = new FormGroup({
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(25),
                Validators.pattern('^([a-zA-ZÀ-ÿ0-9-])*$')
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$')
            ])
        });
    }

    updateCredentials() {
        this.userService.updateUser(this.formCredentials.value)
            .then(user => {
                if (user) {
                    this.activeModal.close();
                }
            });
    }
}
