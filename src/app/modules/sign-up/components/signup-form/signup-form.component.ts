import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpService} from '../../shared/sign-up.service';
import {ErrorService} from "../../../../shared/components/error/error.service";

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styles: []
})
export class SignupFormComponent implements OnInit {

    messageRegister;
    formRegister: FormGroup;
    registrationSuccessful = false;

    constructor(private signupService: SignUpService, private errorService: ErrorService) {
    }

    ngOnInit() {
        this.formRegister = new FormGroup({
            firstName: new FormControl('Test', [
                Validators.required
            ]),
            lastName: new FormControl('Test', [
                Validators.required
            ]),
            username: new FormControl('Test112', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(25),
                Validators.pattern('^([a-zA-ZÀ-ÿ0-9-])*$')
            ]),
            email: new FormControl('Test112@test.com', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('Test1234', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$')
            ]),
            picture: new FormControl('https://avatars.dicebear.com/v2/identicon/' + Math.random().toString(36).substr(0, 13) + '.svg'),
            favouriteBeerId: new FormControl(0),
        });

        this.errorService.messageRegister$.subscribe(data => this.messageRegister = data);
    }

    register() {
        this.signupService.signUp(this.formRegister.value).then(data => {
            console.log(data);
            if (data !== undefined) {
                this.registrationSuccessful = true;
            }
        });
    }
}
