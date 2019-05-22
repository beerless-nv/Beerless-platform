import {Component, OnInit} from '@angular/core';
import {LoggedUserService} from '../../../../../core/user/logged-user.service';
import {UserService} from '../../../../../core/user/user.service';

@Component({
    selector: 'app-settings-users',
    templateUrl: './settings-users.component.html',
    styles: []
})
export class SettingsUsersComponent implements OnInit {

    user;

    constructor(private loggedUserService: LoggedUserService, private userService: UserService) {
    }

    ngOnInit() {
        this.loggedUserService.user$.subscribe(loggedUser => {
            this.userService.getUserById(loggedUser.id).then(user => {
                this.user = user;
            });
        });
    }

}
