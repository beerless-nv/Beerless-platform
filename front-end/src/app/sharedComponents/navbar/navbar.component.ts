import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/interfaces/user';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styles: []
})
export class NavbarComponent implements OnInit {

    isCollapsed = true;
    user: User;

    constructor(public loginService: LoginService) {
        this.loginService.userData$.subscribe( data => {
            this.user = data;
            console.log('navbar');
        });
    }

    ngOnInit() {
    }
}
