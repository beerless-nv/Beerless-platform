import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-profile-users',
    templateUrl: './profile-users.component.html',
    styles: []
})
export class ProfileUsersComponent implements OnInit {

    userId;
    user;
    backgroundPictureSrc = './src/assets/images/beer-background.jpg';

    limit = 150;
    moreShown = false;

    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.userId = params.get('id');
            this.getUserById(this.userId);
        });


    }

    getUserById(userId) {
        this.userService.getUserById(userId).then(data => this.user = data);
    }
}
