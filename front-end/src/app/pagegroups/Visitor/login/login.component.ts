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
    userExists;
    passCorrect;
    user = {};

    formLogin: FormGroup;
    formRegister: FormGroup;

    constructor(public loginService: LoginService, private errorService: ErrorService, private router: Router) {
    }

    ngOnInit() {
        this.formLogin = new FormGroup({
            username: new FormControl('test1'),
            password: new FormControl('test1')
        });
        this.formRegister = new FormGroup({
            username: new FormControl(''),
            email: new FormControl(''),
            password: new FormControl('')
        })
    }

    login() {
        this.user = this.formLogin.value;
        this.loginService.signIn(this.user['username'], this.user['password']);
        this.router.navigate(['/']);
    }
}
