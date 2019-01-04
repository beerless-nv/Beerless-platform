import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoginService} from "./login.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly URLUsers = environment.backend + 'users';
    userId: number;

    constructor(private http: HttpClient, private loginService: LoginService) {
    }

    getUserById(userId) {
        return this.http.get(this.URLUsers + '/' + userId)
            .toPromise()
            .then(data => data['user']);
    }

    updateUserProfile(user) {
        this.loginService.userData$.subscribe(data => this.userId = data.ID);

        return this.http.patch(this.URLUsers + '/patchProfile/' + this.userId, {
            // updateArray: [{
            //         propName: 'username',
            //         value: user.username
            //     },
            //     {
            //         propName: 'email',
            //         value: user.email
            //     },
            //     {
            //         propName: 'firstName',
            //         value: user.firstName
            //     },
            //     {
            //         propName: 'lastName',
            //         value: user.lastName
            //     },
            //     {
            //         propName: 'picture',
            //         value: user.picture
            //     },
            //     {
            //         propName: 'bio',
            //         value: user.bio
            //     },
            // ]
            updateObject: {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                picture: user.picture,
                bio: user.bio
            }
        })
            .toPromise()
            .then(data => {
                console.log('user', data['user']);
            })
            .catch(error => {
                console.log('error', error);
            });
    }
}
