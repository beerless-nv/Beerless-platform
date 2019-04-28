import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoginService} from 'src/app/_services/login.service';
import {LoggedUserService} from '../../../../core/logged-user.service';
import {SignInService} from '../../../../modules/sign-in/shared/sign-in.service';

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

    constructor(private loggedUserService: LoggedUserService, private signInService: SignInService, private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.loggedUserService.user$.subscribe( data => {
            this.user = data;
            this.cdRef.detectChanges();
        });
    }

    logout() {
        this.signInService.logout();
    }
}
