import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../../../../../core/user/user.service';

@Component({
    selector: 'app-profile-users',
    templateUrl: './profile-users.component.html',
    styles: []
})
export class ProfileUsersComponent implements OnInit {

    user$: Observable<any>;
    sidebarSticky = false;
    sidebarTopMargin = false;


    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.getUserByName(params.get('username'));
        });
    }

    getUserByName(username: string) {
        this.user$ = this.userService.getUserByName(username);
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.sidebarSticky = window.pageYOffset > 80;

        this.sidebarTopMargin = window.pageYOffset > 300;
    }
}
