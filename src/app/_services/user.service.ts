import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoginService} from './login.service';
import {ToastsService} from './toasts.service';
import {LocalStorageService} from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly URLUsers = environment.backend + 'users';
    userId: number;

    constructor(private http: HttpClient, private loginService: LoginService, private toastsService: ToastsService, private localStorageService: LocalStorageService) {
    }

    getUserById(userId) {
        return this.http.get(this.URLUsers + '/' + userId)
            .toPromise()
            .then(data => data['user']);
    }

    updateUserProfileWithPicture(user, selectedPicture, pictureName, picturePath) {
        this.uploadPicture(selectedPicture, pictureName, picturePath).then(() => {
            this.updateUserProfile(user);
        });
    }

    updateUserProfile(user) {
        this.loginService.userData$.subscribe(data => this.userId = data.ID);

        return this.http.patch(this.URLUsers + '/patchProfile/' + this.userId, {
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
                this.loginService.setUserData(data['user'].ID, this.localStorageService.getUser().token);
                this.toastsService.addToast('Profiel gewijzigd', 'Je profiel is bijgewerkt!', 0);
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    updateUserAddress(user) {
        this.loginService.userData$.subscribe(data => this.userId = data.ID);

        return this.http.patch(this.URLUsers + '/patchAddress/' + this.userId, {
            updateObject: {
                country: user.country,
                province: user.province,
                place: user.place,
            }
        })
            .toPromise()
            .then(data => {
                this.loginService.userData$.next(data['user']);
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

        return this.http.post(this.URLUsers + '/uploadPicture', uploadData)
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(error => {
                console.log('error', error);
            });
    }
}
