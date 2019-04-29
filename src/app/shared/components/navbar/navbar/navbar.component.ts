import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
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

    constructor(private loggedUserService: LoggedUserService, private signOutService: SignOutService, private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.loggedUserService.user$.subscribe( data => {
            this.user = data;
            this.cdRef.detectChanges();
        });
    }

    signOut() {
        this.signOutService.signOut();
    }
}
