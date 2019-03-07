import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LocalStorageService} from './local-storage.service';
import {ToastsService} from './toasts.service';

@Injectable({
    providedIn: 'root'
})
export class BeersService {

    readonly urlBeer = environment.backend + 'beers';

    constructor(private http: HttpClient, private localStorageService: LocalStorageService, private toastsService: ToastsService) {
    }

    getBeersByName(name, value) {
        const params = new HttpParams()
            .set('joinTables', 'beertype,brewery');

        return this.http.post(this.urlBeer + '/search', {
            searchParams: [{
                propName: name,
                value: value
            }]
        }, {params})
            .toPromise()
            .then(data => {
                this.localStorageService.clearBeerSearchResults();
                this.localStorageService.setBeerSearchResults(value, 1, data['beers']);
            });
    }

    getBeersByNameCount(name, value) {
        const params = new HttpParams()
            .set('joinTables', 'beertype,brewery');

        return this.http.post(this.urlBeer + '/search', {
            searchParams: [{
                propName: name,
                value: value
            }]
        }, {params})
            .toPromise()
            .then(data => {
                return data['beers'].length;
            });
    }

    getBeersByNamePagination(name, value, limit, offset) {
        let params;

        if (offset !== 0) {
            params = new HttpParams()
                .set('joinTables', 'beertype,brewery')
                .set('limit', limit)
                .set('offset', offset);
        } else {
            params = new HttpParams()
                .set('joinTables', 'beertype,brewery')
                .set('limit', limit);
        }

        return this.http.post(this.urlBeer + '/search', {
            searchParams: [{
                propName: name,
                value: value,
            }]
        }, {params})
            .toPromise()
            .then(data => {
                this.localStorageService.clearBeerSearchResults();
                this.localStorageService.setBeerSearchResults(value, (offset / 10) + 1, data['beers']);
            });
    }

    getBeerById(id) {
        const params = new HttpParams()
            .set('joinTables', 'beertype,brewery');

        return this.http.get(this.urlBeer + '/' + id, {params})
            .toPromise()
            .then(data => {
                return data;
            });
    }

    getBeersNewest() {
        return this.http.get(this.urlBeer + '/new')
            .toPromise()
            .then(data => {
                this.localStorageService.clearNewestBeers();
                this.localStorageService.setNewestBeers(data['beers']);
            });
    }


    insertBeer(beer) {
        this.http.post(this.urlBeer,
            {
                inputObject: beer
            })
            .subscribe(() => {
                this.toastsService.addToast('Bevestiging', 'Het bier werd succesvol toegevoegd.', 0);
            });
    }

    uploadImageBeer(selectedImage, imageName, imagePath) {
        const uploadData = new FormData();
        uploadData.append('image', selectedImage);
        uploadData.append('imageName', imageName);
        uploadData.append('imagePath', imagePath);

        this.http.post(this.urlBeer + '/uploadImage', uploadData)
            .subscribe();
    }
}
