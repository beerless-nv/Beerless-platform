import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../../_services/login.service';

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styles: []
})
export class SignupFormComponent implements OnInit {

    messageRegister;
    formRegister: FormGroup;
    registrationSuccessful = false;

    constructor(public loginService: LoginService) {
    }

    ngOnInit() {
        this.formRegister = new FormGroup({
            firstName: new FormControl('', [
                Validators.required
            ]),
            lastName: new FormControl('', [
                Validators.required
            ]),
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(25),
                Validators.pattern('^([a-zA-ZÀ-ÿ0-9-])*$')
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$')
            ]),
            picture: new FormControl('https://avatars.dicebear.com/v2/identicon/' + Math.random().toString(36).substr(0, 13) + '.svg'),
        });

        this.loginService.messageRegister$.subscribe(data => this.messageRegister = data);
    }

    register() {
        this.loginService.signUp(this.formRegister.value).then(data => {
            if (data['success'] === true) {
                this.registrationSuccessful = true;
            }
        });
    }
}
