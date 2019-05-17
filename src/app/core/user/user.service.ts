import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoginService} from 'src/app/_services/login.service';
import {ToastService} from 'src/app/shared/components/toast/toast.service';
import {LocalStorageService} from 'src/app/_services/local-storage.service';
import {AuthService} from '../authorization/auth.service';
import {LoggedUserService} from './logged-user.service';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly urlUsers = environment.backend + 'users';
    userId: number;

    constructor(private http: HttpClient, private loginService: LoginService, private toastsService: ToastService, private localStorageService: LocalStorageService, private cookieService: CookieService, private auth: AuthService) {
    }

    updateUser(user) {
        const userId = this.cookieService.get('userId');
        return this.http.patch(this.urlUsers + '/' + userId, user, {headers: this.auth.beerlessAuthHeaders}).toPromise()
            .then(data => data)
            .catch(err => null);
    }


















    getUserById(userId) {
        return this.http.get(this.urlUsers + '/' + userId)
            .toPromise()
            .then(data => data);
    }

    updateUserProfileWithPicture(user, selectedPicture, pictureName, picturePath) {
        this.uploadPicture(selectedPicture, pictureName, picturePath).then(() => {
            this.updateUserProfile(user);
        });
    }

    updateUserProfile(user) {
        this.loginService.userData$.subscribe(data => this.userId = data.ID);

        return this.http.patch(this.urlUsers + '/patchProfile/' + this.userId, {
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
                this.loginService.setUserData(data['member'].ID, this.localStorageService.getUser().token);
                this.toastsService.addToast('Profiel gewijzigd', 'Je profiel is bijgewerkt!', 0);
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    updateUserAddress(user) {
        this.loginService.userData$.subscribe(data => this.userId = data.ID);

        return this.http.patch(this.urlUsers + '/patchAddress/' + this.userId, {
            updateObject: {
                country: user.country,
                province: user.province,
                place: user.place,
            }
        })
            .toPromise()
            .then(data => {
                this.loginService.userData$.next(data['member']);
                this.toastsService.addToast('Profiel gewijzigd', 'Je profiel is bijgewerkt!', 0);
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    uploadPicture(selectedPicture, pictureName, picturePath): Promise<any> {
        const uploadData = new FormData();
        uploadData.append('picture', selectedPicture);
        uploadData.append('pictureName', pictureName);
        uploadData.append('picturePath', picturePath);

        return this.http.post(this.urlUsers + '/uploadPicture', uploadData)
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(error => {
                console.log('error', error);
            });
    }
}
