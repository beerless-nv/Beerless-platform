import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../../_services/login.service';
import {environment} from '../../../../../environments/environment';
import {UserService} from '../../../../core/user/user.service';

@Component({
    selector: 'app-settings-profile',
    templateUrl: './settings-profile.component.html',
    styles: []
})
export class SettingsProfileComponent implements OnInit {

    @Input() user: any;

    maxLengthTextarea = 500;

    formProfile: FormGroup;
    formAddress: FormGroup;
    formPassword: FormGroup;

    pictureSrc;
    pictureFile;

    passwordMatch = true;

    constructor(private loginService: LoginService, private userService: UserService) {
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
            picture: new FormControl(''),
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
            this.pictureFile = event.target.files[0];

            const reader = new FileReader();
            reader.onload = e => this.pictureSrc = reader.result;

            reader.readAsDataURL(this.pictureFile);
        }
    }

    // update profile

    onUpload(selectedPicture, pictureName, picturePath) {
        console.log(pictureName);
        console.log(selectedPicture);
        this.userService.uploadPicture(selectedPicture, pictureName, picturePath);
    }

    updateProfile() {
        let pictureName;

        if (this.formProfile.value.picture === '') {
            this.formProfile.value.picture = this.user.picture;

            this.userService.updateUserProfile(this.formProfile.value);
        } else {
            const dateToday = new Date();
            pictureName = 'picture-member-' + this.user.ID + '-'
                + (dateToday.getDate() < 10 ? '0' + dateToday.getDate() : dateToday.getDate())
                + ((dateToday.getMonth() + 1) < 10 ? '0' + (dateToday.getMonth() + 1) : (dateToday.getMonth() + 1))
                + dateToday.getFullYear()
                + '-'
                + (dateToday.getHours() < 10 ? '0' + dateToday.getHours() : dateToday.getHours())
                + (dateToday.getMinutes() < 10 ? '0' + dateToday.getMinutes() : dateToday.getMinutes())
                + (dateToday.getSeconds() < 10 ? '0' + dateToday.getSeconds() : dateToday.getSeconds())
                + '.jpg';

            // this.onUpload(this.pictureFile, pictureName, '/member/picture/');
            this.formProfile.value.picture = environment.imageURL + 'member/picture/' + pictureName;
            this.userService.updateUserProfileWithPicture(this.formProfile.value, this.pictureFile, pictureName, '/member/picture/');
        }
    }

    // update address

    updateAddress() {
        this.userService.updateUserAddress(this.formAddress.value);
    }

    // update password

    updatePassword() {
        if (this.formPassword.value.newPassword !== this.formPassword.value.repeatPassword) {
            this.passwordMatch = false;
        } else {
            this.passwordMatch = true;

            // submit formPassword
        }
    }

}
