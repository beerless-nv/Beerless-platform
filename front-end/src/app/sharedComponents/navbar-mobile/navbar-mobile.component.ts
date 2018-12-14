import {Component, OnInit} from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-navbar-mobile',
    templateUrl: './navbar-mobile.component.html',
    styles: []
})
export class NavbarMobileComponent implements OnInit {

    submenu;

    constructor() {
    }

    ngOnInit() {

        // console.log(this.submenuArray['user']);
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
}
