import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router, private http: HttpClient) {
    }

    /**
     * Check if the user is allowed to access this route.
     * If allowed let him pass, if not reject him.
     *
     * @param route
     */
    async canActivate(route: ActivatedRouteSnapshot): boolean {
        // get user role
        const role = await this.getUserRole();

        // depending on user role, pass or reject
        if (!this.auth.isAuthenticated() || role !== route.data.expectedRole) {
            this.router.navigate(['sign-in']);
            return false;
        }
        return true;
    }

    /**
     * Get the user role
     */
    getUserRole() {
        return this.http.get(environment.backend + 'users/getRole', {params: this.auth.beerlessAuthParams})
            .toPromise()
            .then(data => data);
    }
}
