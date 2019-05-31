import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../../core/user/user.service';

@Component({
    selector: 'app-profile-users',
    templateUrl: './profile-users.component.html',
    styles: []
})
export class ProfileUsersComponent implements OnInit {

    user;


    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.getUserByName(params.get('username'));
        });
    }

    getUserByName(username: string) {
        this.userService.getUserByName(username).subscribe(user => {
            this.user = user;
            console.log(user);
        });
    }
}
