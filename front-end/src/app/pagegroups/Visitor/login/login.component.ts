import {Component, OnInit, Testability} from '@angular/core';
import {LoginService} from '../../../services/login.service';
import {ErrorService} from '../../../services/error.service';
import {Observable, of, Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {

    isRegistrated = true;
    messageLogin;
    messageRegister;
    user = {};

    formLogin: FormGroup;
    formRegister: FormGroup;

    constructor(public loginService: LoginService, private errorService: ErrorService, private router: Router) {
    }

    ngOnInit() {
        this.formLogin = new FormGroup({
            username: new FormControl('to'),
            password: new FormControl('test')
        });
        this.formRegister = new FormGroup({
            username: new FormControl(''),
            email: new FormControl(''),
            password: new FormControl('')
        });

        this.loginService.messageLogin$.subscribe(data => this.messageLogin = data);
        this.loginService.messageRegister$.subscribe(data => this.messageRegister = data);
    }

    login() {
        this.user = this.formLogin.value;
        this.loginService.signIn(this.user['username'], this.user['password']);
        this.loginService.userData$.subscribe(data => {
            if (data != null) {
                this.router.navigate(['/']);
            }
        });
    }

    register() {
        this.loginService.signUp(this.formRegister.value);
    }
}
