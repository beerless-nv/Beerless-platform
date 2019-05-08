import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../core/authorization/auth.service';
import {LoggedUserService} from '../../../../../core/user/logged-user.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styles: []
})
export class SigninComponent implements OnInit {

    constructor(private router: Router, private loggedUserService: LoggedUserService, private auth: AuthService) {
        this.auth.setToken();
        this.loggedUserService.checkToken().then(isValid => {
            if (isValid) {
                router.navigate(['/']);
            }
        });
    }

    ngOnInit() {
    }


}
