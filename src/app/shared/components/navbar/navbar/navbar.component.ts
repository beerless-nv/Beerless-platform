import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/authorization/auth.service';
import {LoggedUserService} from '../../../../core/user/logged-user.service';
import {SignOutService} from '../../../../core/user/sign-out.service';

@Component({
    selector: 'beerless-navbar',
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    styles: []
})
export class NavbarComponent implements OnInit {

    isCollapsed = true;
    user;

    menuItems = [
        {name: 'Search', routerLink: '/search'},
        {name: 'Blog', routerLink: '/blog'},
    ];

    constructor(private loggedUserService: LoggedUserService, private signOutService: SignOutService, private cdRef: ChangeDetectorRef, private auth: AuthService) {
    }

    ngOnInit() {
        this.loggedUserService.user$.subscribe( data => {
            this.user = data;
            this.cdRef.detectChanges();
        });
    }

    logOut() {
        this.signOutService.logout(this.user);
    }
}
