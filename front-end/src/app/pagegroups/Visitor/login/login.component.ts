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
    userExists;
    passCorrect;
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
        console.log('wachtwoord: ' + this.user['wachtwoord']);
        
    }
}
