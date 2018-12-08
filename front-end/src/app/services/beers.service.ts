import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, share, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

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

    constructor(private http: HttpClient) {
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
                return data;
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
                return data;
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
