import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoginService} from 'src/app/_services/login.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    styles: []
})
export class NavbarComponent implements OnInit {

    isCollapsed = true;
    user;

    menuItems = [
        {name: 'Home', routerLink: '/home'},
        {name: 'Bieren', routerLink: '/beers'},
        {name: 'Blog', routerLink: '/blog'},
    ];

    constructor(public loginService: LoginService, public cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.loginService.userData$.subscribe( data => {
            this.user = data;
            this.cdRef.detectChanges();
        });
    }

    logout() {
        this.loginService.logout();
    }
}
