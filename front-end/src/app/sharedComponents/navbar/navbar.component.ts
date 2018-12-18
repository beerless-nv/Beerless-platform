import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { LoginService } from 'src/app/_services/login.service';
import { User } from 'src/app/_interfaces/user';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styles: []
})
export class NavbarComponent implements OnInit {

    isCollapsed = true;
    user: User;

    constructor(public loginService: LoginService) {
    }

    ngOnInit() {
        this.loginService.userData$.subscribe( data => {
            this.user = data;
        });
    }

    logout() {
        this.loginService.logout();
    }
}
