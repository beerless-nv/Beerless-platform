import {Component, OnInit, Testability} from '@angular/core';
import {LoginService} from '../../../services/login.service';
import {Observable, of, Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {

    isRegistrated = true;
    userExists$: Observable<any>;
    user = {};

    formLogin: FormGroup;

    constructor(private loginService: LoginService) {
    }

    ngOnInit() {
        this.formLogin = new FormGroup({
            gebruikersnaam: new FormControl('tomboy'),
            wachtwoord: new FormControl('test')
        });
    }

    login() {
        this.user = this.formLogin.value;
        this.loginService.checkUser(this.user['gebruikersnaam']).subscribe(val => this.userExists$ = val);
        console.log(this.userExists$);
        if (this.userExists$ !== of(false)) {
            console.log('user bestaat');
        } else {
            console.log('user bestaat niet');
        }

    }
}
