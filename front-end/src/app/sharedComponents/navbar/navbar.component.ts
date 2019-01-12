import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoginService} from 'src/app/_services/login.service';
import {User} from 'src/app/_interfaces/user';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    styles: []
})
export class NavbarComponent implements OnInit {

    isCollapsed = true;
    user;

    constructor(public loginService: LoginService, public cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.loginService.userData$.subscribe( data => {
            this.user = data;
            this.user.picture = this.user.picture;
        });
        // this.cdRef.detectChanges();
    }

    logout() {
        this.loginService.logout();
    }
}
