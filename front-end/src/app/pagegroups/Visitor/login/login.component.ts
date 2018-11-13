import { Component, OnInit, Testability } from '@angular/core';
import {LoginService} from '../../../services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  test;
  userExists$: Observable<any>;
  isRegistrated = true;
  user = {
    name: 'arno',
    pass: 'arno'
  }

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login(form){
    console.log(this.loginService.checkUser(form.myName));
  }

}
