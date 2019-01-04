import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../../../_services/login.service';
import {UserService} from "../../../../../_services/user.service";

@Component({
    selector: 'app-settings-profile',
    templateUrl: './settings-profile.component.html',
    styles: []
})
export class SettingsProfileComponent implements OnInit {

    maxLengthTextarea = 500;

    formProfile: FormGroup;
    formAddress: FormGroup;
    formPassword: FormGroup;

    user;
    pictureSrc;

    passwordMatch = true;

    constructor(private loginService: LoginService, private userService: UserService) {
    }

    ngOnInit() {
        this.loginService.userData$.subscribe(data => {
            this.user = data;
            console.log(this.user);
        });

        // forms
        this.formProfile = new FormGroup({
            username: new FormControl(this.user.username, [Validators.required, Validators.maxLength(255), Validators.minLength(3)]),
            email: new FormControl(this.user.email, [Validators.required, Validators.email]),
            picture: new FormControl(''),
            firstName: new FormControl(this.user.firstName, [Validators.required, Validators.maxLength(255)]),
            lastName: new FormControl(this.user.lastName, [Validators.required, Validators.maxLength(255)]),
            bio: new FormControl(this.user.bio, [Validators.maxLength(500)]),
        });

        this.formAddress = new FormGroup({
            place: new FormControl('', [Validators.maxLength(255)]),
            province: new FormControl('', [Validators.maxLength(255)]),
            country: new FormControl('', [Validators.maxLength(255)]),
        });

        this.formPassword = new FormGroup({
            currentPassword: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$')
            ]),
            newPassword: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$')
            ]),
            repeatPassword: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$')
            ]),
        });

    }

    showProfilePicture(event) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = e => this.pictureSrc = reader.result;

            reader.readAsDataURL(file);
        }
    }

    updateProfile() {
        this.userService.updateUserProfile(this.formProfile.value);
    }

    updateAddress() {

    }

    updatePassword() {
        if (this.formPassword.value.newPassword !== this.formPassword.value.repeatPassword) {
            this.passwordMatch = false;
        } else {
            this.passwordMatch = true;

            // submit formPassword
        }
    }

}
