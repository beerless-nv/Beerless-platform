import {HttpClient, HttpParams} from '@angular/common/http';
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
     * @param route (activated route snapshot)
     */
    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        // get user role
        const role = await this.getUserRole();
        const roles = await this.getUserRoles();

        const expectedRoleId = Object.values(roles).filter(item => item['name'] === route.data.expectedRole)[0]['id'];

        // depending on user role, pass or reject
        if (!this.auth.isAuthenticated() || role['id'] < expectedRoleId) {
            this.router.navigate(['sign-in']);
            return false;
        }
        return true;
    }

    /**
     * Get the user role
     */
    async getUserRole() {
        return await this.http.get(environment.backend + 'users/getRole', {headers: this.auth.beerlessAuthHeaders$.value}).toPromise();
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

        return await this.http.get(environment.backend + 'roles', {params: params, headers: this.auth.beerlessAuthHeaders$.value}).toPromise();
    }
}
