import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {NgbActiveModal, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';
import {RestrictPlatformComponent} from '../../shared/components/restrict-platform/restrict-platform/restrict-platform.component';
import {LoggedUserService} from '../user/logged-user.service';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
    constructor(public router: Router, public http: HttpClient, private modalService: NgbModal, private activeModal: NgbActiveModal, private loggedUserService: LoggedUserService, private authService: AuthService) {
    }

    /**
     * Check if the user is allowed to access this route.
     * If allowed let him pass, if not reject him.
     *
     * @param route (activated route snapshot)
     */
    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        // check token
        if (!await this.loggedUserService.checkToken()) {
            console.log('ok');
            this.router.navigate(['sign-in']);
            return false;
        }

        // get user role
        const role = await this.getUserRole();

        // block users without permission in early release
        if (route.data.expectedRole === '$everyone') {
            if (role) {
                if (role.name !== 'Blocked') {
                    return true;
                }
            }
            // this.restrictPlatform();
            this.router.navigate(['sign-in']);
            return false;
        }

        const roles = await this.getUserRoles();

        const expectedRoleId = Object.values(roles).filter(item => item['name'] === route.data.expectedRole)[0]['id'];

        // depending on user role, pass or reject
        if (!this.authService.isAuthenticated() || role['id'] < expectedRoleId) {
            this.router.navigate(['sign-in']);
            return false;
        }
        return true;
    }

    /**
     * Get the user role
     */
    getUserRole() {
        return this.http.get(environment.backend + 'users/getRole', {headers: this.authService.beerlessAuthHeaders}).toPromise()
            .then(data => data)
            .catch(err => {
                return null;
            });
    }

    /**
     * Get all user roles
     */
    async getUserRoles() {
        const params = new HttpParams({
            fromObject: {
                'filter[fields][id]': 'true',
                'filter[fields][name]': 'true'
            }
        });

        return await this.http.get(environment.backend + 'roles', {
            params: params,
            headers: this.authService.beerlessAuthHeaders
        }).toPromise();
    }

    /**
     * Shows modal to block users from platform
     */
    restrictPlatform() {
        const modalReference = [];

        if (modalReference) {
            modalReference.map(modal => modal.close());
        }

        console.log(this.router.url);

        if (this.router.url) {
            const options: NgbModalOptions = {
                centered: true,
                backdropClass: 'backdrop',
                keyboard: false,
            };

            modalReference.push(this.modalService.open(RestrictPlatformComponent, options));
        }
    }
}
