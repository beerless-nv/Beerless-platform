import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../../_services/login.service';
import {environment} from '../../../../../environments/environment';
import {ErrorService} from '../../../../shared/components/error/error.service';
import {UserSettingsService} from '../../shared/user-settings.service';

@Component({
    selector: 'app-settings-profile',
    templateUrl: './settings-profile.component.html',
    styles: []
})
export class SettingsProfileComponent implements OnInit {

    @Input() user: any;

    profileServerSideMessages: any;
    addressServerSideMessages: any;
    passwordServerSideMessages: any;

    formProfile: FormGroup;
    formAddress: FormGroup;
    formPassword: FormGroup;

    pictureSrc;
    pictureFile;

    passwordMatch = true;

    constructor(private formBuilder: FormBuilder, private loginService: LoginService, private userSettingsService: UserSettingsService, private errorService: ErrorService) {
    }

    ngOnInit() {
        // forms
        this.formProfile = new FormGroup({
            username: new FormControl(this.user.username, [
                Validators.required,
                Validators.maxLength(255),
                Validators.minLength(3)
            ]),
            email: new FormControl(this.user.email, [
                Validators.required,
                Validators.email
            ]),
            picture: new FormControl(this.user.picture),
            firstName: new FormControl(this.user.firstName, [
                Validators.required,
                Validators.maxLength(255)
            ]),
            lastName: new FormControl(this.user.lastName, [
                Validators.required,
                Validators.maxLength(255)
            ]),
            bio: new FormControl(this.user.bio, [
                Validators.maxLength(500)
            ]),
        });

        this.formAddress = new FormGroup({
            place: new FormControl(this.user.place, [
                Validators.maxLength(255)
            ]),
            province: new FormControl(this.user.province, [
                Validators.maxLength(255)
            ]),
            country: new FormControl(this.user.country, [
                Validators.maxLength(255)
            ]),
        });

        this.formPassword = this.formBuilder.group({
            passwords: this.formBuilder.group({
                currentPassword: new FormControl('', [
                    Validators.maxLength(255)
                ]),
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

    showProfilePicture(event) {
        if (event.target.files && event.target.files[0]) {
            this.pictureFile = event.target.files[0];

            const reader = new FileReader();
            reader.onload = e => this.pictureSrc = reader.result;
            console.log(this.pictureSrc);

            reader.readAsDataURL(this.pictureFile);
        }
    }

    updateProfile() {
        this.userSettingsService.updateProfile(this.formProfile.value)
            .then(data => {
                if (data === true) {
                    this.profileServerSideMessages = {
                        type: 'success',
                        data: ['Your profile details have been successfully updated!']
                    };
                } else {
                    this.errorService.errorMessages$.subscribe(err => {
                        this.profileServerSideMessages = {type: 'error', data: err};
                    });
                }
            });
        // }
    }

    // update address
    updateAddress() {
        this.userSettingsService.updateProfile(this.formAddress.value)
            .then(data => {
                if (data === true) {
                    this.addressServerSideMessages = {
                        type: 'success',
                        data: ['Your address details have been successfully updated!']
                    };
                } else {
                    this.errorService.errorMessages$.subscribe(err => {
                        this.addressServerSideMessages = {type: 'error', data: err};
                    });
                }
            });
    }

    // update password
    updatePassword() {
        if (this.formPassword.valid) {
            this.userSettingsService.resetPassword(this.formPassword.value.passwords.currentPassword, this.formPassword.value.passwords.password)
                .then(data => {
                    if (data === true) {
                        this.passwordServerSideMessages = {
                            type: 'success',
                            data: ['Your password has been successfully reset!']
                        };
                    } else {
                        this.passwordServerSideMessages = {
                            type: 'error',
                            data: ['Something went wrong, please try again!']
                        };
                    }
                });
        }
    }

}
