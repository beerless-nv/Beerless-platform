import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../_services/login.service';

@Component({
    selector: 'app-navbar-mobile',
    templateUrl: './navbar-mobile.component.html',
    styles: []
})
export class NavbarMobileComponent implements OnInit {

    submenu;
    user;

    constructor(private loginService: LoginService) {
    }

    ngOnInit() {
        this.loginService.userData$.subscribe( data => {
            this.user = data;
        });
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

    logout() {
        this.loginService.logout();
    }
}
