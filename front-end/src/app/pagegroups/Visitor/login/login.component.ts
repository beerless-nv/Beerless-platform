import {Component, OnInit, Testability} from '@angular/core';
import {LoginService} from '../../../services/login.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {

    isRegistrated = true;
    user = {};

    formLogin: FormGroup;

    constructor(private loginService: LoginService) {
    }

    ngOnInit() {
        this.formLogin = new FormGroup({
            gebruikersnaam: new FormControl(''),
            wachtwoord: new FormControl('')
        });
    }

    login() {
        this.user = this.formLogin.value;
        console.log(this.user.gebruikersnaam);
        this.loginService.checkUser(this.user.gebruikersnaam);
    }

}
