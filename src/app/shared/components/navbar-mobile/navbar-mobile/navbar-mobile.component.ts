import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {LoginService} from '../../../../_services/login.service';
import {NavService} from '../../../../core/nav/nav.service';
import {LoggedUserService} from '../../../../core/user/logged-user.service';
import {SignOutService} from '../../../../core/user/sign-out.service';

@Component({
    selector: 'beerless-navbar-mobile',
    templateUrl: './navbar-mobile.component.html',
    styles: []
})
export class NavbarMobileComponent implements OnInit {

    submenu;
    user;
    showNav = true;

    constructor(private loginService: LoginService, private loggedUserService: LoggedUserService, private signOutService: SignOutService, private router: Router, private navService: NavService) {
    }

    ngOnInit() {
        this.loggedUserService.user$.subscribe(user => {
            this.user = user;
        });

        this.navService.keyboardIsOpen$.subscribe(isOpen => {
            this.showNav = !isOpen;
        });

        console.log('nav mobile');
    }

    openSubmenu(submenu) {
        if (this.submenu !== submenu) {
            this.submenu = submenu;
        } else {
            this.submenu = null;
        }
    }

    hideAllSubmenu() {
        this.submenu = null;
    }

    logOut() {
        this.signOutService.logout(this.user);
    }
}
