import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../../_services/user.service';
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

    limit = 120;
    moreShown = false;

    sidebarSticky = false;
    sidebarTopMargin = false;
    coverTopMargin = false;

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

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.sidebarSticky = window.pageYOffset > 80;

        this.sidebarTopMargin = window.pageYOffset > 300;

        if (window.innerWidth > 992) {
            this.coverTopMargin = window.pageYOffset > 180;
        } else {
            this.coverTopMargin = window.pageYOffset > 30;
        }
    }
}
