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
            username: new FormControl('test1'),
            password: new FormControl('test1')
        });
    }

    login() {
        this.user = this.formLogin.value;
        this.loginService.signIn(this.user['username'], this.user['password']).subscribe(function(data) {
            if(data['success'] == true){
                console.log('Gebruiker ' + data['user']['gebruikersnaam'] + ' is correct ingelogd');
            } else{
                console.log(data['msg']);
            }
        });
        
    }
}
