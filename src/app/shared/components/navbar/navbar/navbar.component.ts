import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/authorization/auth.service';
import {RoleGuardService} from '../../../../core/authorization/role-guard.service';
import {LoggedUserService} from '../../../../core/user/logged-user.service';
import {SignOutService} from '../../../../core/user/sign-out.service';
import {SidebarService} from '../../sidebar/sidebar.service';

@Component({
    selector: 'beerless-navbar',
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    styles: []
})
export class NavbarComponent implements OnInit {

    @Input() sidebar = false;
    isCollapsed = true;
    user;
    role;

    constructor(private loggedUserService: LoggedUserService, private signOutService: SignOutService, private cdRef: ChangeDetectorRef, private auth: AuthService, private roleGuard: RoleGuardService, private sidebarService: SidebarService) {
        this.userRole();
    }

    ngOnInit() {
        this.loggedUserService.user$.subscribe(user => {
            this.user = user;
        });
    }

    logOut() {
        this.signOutService.logout(this.user);
    }

    async userRole() {
        this.role = (await this.roleGuard.getUserRole()).id;
    }

    toggleSidebar() {
        if (this.sidebarService.isOpen$.value === null) {
            this.sidebarService.isOpen$.next(false);
        } else {
            this.sidebarService.isOpen$.next(!this.sidebarService.isOpen$.value);
        }
    }
}
