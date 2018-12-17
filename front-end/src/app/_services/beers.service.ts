import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LocalStorageService} from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class BeersService {

    readonly urlGetBeerById = environment.backend + 'beers/';
    readonly urlGetAllBeers = environment.backend + 'beers/';
    readonly urlInsertBeer = environment.backend + 'beers';
    readonly urlGetBeersByName = environment.backend + 'beers/search';
    readonly urlGetBeersNewest = environment.backend + 'beers';
    readonly urlUploadImageBeer = environment.backend + 'beers/uploadImage';

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    }

    getBeersByName(name, value) {
        const params = new HttpParams()
            .set('joinTables', 'beertype,brewery');

        return this.http.post(this.urlGetBeersByName, {
                searchParams : [{
                    propName: name,
                    value: value
                }]
            }, {params})
            .toPromise()
            .then(data => {
                this.localStorageService.clearBeerSearchResults();
                this.localStorageService.setBeerSearchResults(data['beers']);
            });
    }

    getBeerById(id) {
        const params = new HttpParams()
            .set('joinTables', 'beertype,brewery');

        return this.http.get(this.urlGetBeerById + id, {params})
            .toPromise()
            .then(data => {
                return data;
            });
    }

    getBeersNewest() {
        const params = new HttpParams()
            .set('joinTables', 'brewery')
            .set('orderBy', 'timestampCreated.desc');

        return this.http.get(this.urlGetBeersNewest, {params})
            .toPromise()
            .then(data => {
                this.localStorageService.clearNewestBeers();
                this.localStorageService.setNewestBeers(data['beers']);
            });
    }

    insertBeer(beer) {
        this.http.post(this.urlInsertBeer,
            {
                inputObject: beer
            })
            .subscribe();
    }

    uploadImageBeer(selectedImage, imageName, imagePath) {
        const uploadData = new FormData();
        uploadData.append('image', selectedImage);
        uploadData.append('imageName', imageName);
        uploadData.append('imagePath', imagePath);

        console.log(uploadData);

        this.http.post(this.urlUploadImageBeer, uploadData)
            .subscribe();
    }
}
