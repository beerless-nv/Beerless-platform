import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../../../../_services/login.service';
import {UserService} from '../../../shared/user.service';

@Component({
    selector: 'app-settings-users',
    templateUrl: './settings-users.component.html',
    styles: []
})
export class SettingsUsersComponent implements OnInit {

    userId;
    user;

    constructor(private loginService: LoginService, private userService: UserService) {
    }

    ngOnInit() {
        this.loginService.userData$.subscribe(data => {
            this.userId = data.ID;

            this.userService.getUserById(this.userId).then(user => {
                this.user = user;
            });
        });
    }

}
