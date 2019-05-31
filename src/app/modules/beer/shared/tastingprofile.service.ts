import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../core/authorization/auth.service';
import {LoggedUserService} from '../../../core/user/logged-user.service';

@Injectable({
    providedIn: 'root'
})
export class TastingprofileService {

    private readonly urlTastingprofile = environment.backend + 'tastingprofiles'

    constructor(private http: HttpClient, private authService: AuthService, private loggedUserService: LoggedUserService) {
    }

    addTastingprofile(tastingprofile: any) {
        tastingprofile['userId'] = this.loggedUserService.user$.value.id;
        return this.http.post(this.urlTastingprofile, tastingprofile, {headers: this.authService.beerlessAuthHeaders})
            .toPromise()
            .then(data => true)
            .catch(err => console.error(err));
    }
}
