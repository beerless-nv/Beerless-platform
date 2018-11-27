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
    readonly urlInsertBeer = environment.backend + 'beers/';
    readonly urlGetBeersByName = environment.backend + 'beers/getByName';
    readonly urlGetBeersNewest = environment.backend + 'beers/getNewest';
    readonly urlUploadImageBeer = environment.backend + 'beers/uploadImage';

    constructor(private http: HttpClient) {
    }

    getBeersByName(name) {
        const params = new HttpParams()
            .set('name', name);

        return this.http.get(this.urlGetBeersByName, {params})
            .toPromise()
            .then(data => {
                console.log(data);
                return data;
            });
    }

    getBeerById(id): Observable<any> {
        return this.http.get(this.urlGetBeerById + id)
            .pipe(
                tap(),
                catchError(
                    (error) => {
                        console.log(error);
                        alert(error.message);
                        return EMPTY;
                    }),
                share()
            );
    }

    getBeersNewest() {
        return this.http.get(this.urlGetBeersNewest)
            .toPromise()
            .then(data => {
                return data;
            });
    }

    insertBeer(beer) {
        this.http.post(this.urlInsertBeer,
            {
                name: beer.name,
                abv: beer.abv,
                ibu: beer.ibu,
                ebc: beer.ebc,
                temperature: beer.temperature,
                fermentation: beer.fermentation,
                season: beer.season,
                since: beer.sinds,
                picture: beer.picture,
                logo: beer.logo,
                description: beer.description,
                breweryID: beer.brewery,
                beertypeID: beer.beertype
            })
            .subscribe(
                err => {
                    console.log('Error occured', err);
                }
            );
    }

    uploadImageBeer(selectedImage, imageName, imagePath) {
        const uploadData = new FormData();
        uploadData.append('image', selectedImage);
        uploadData.append('imageName', imageName);
        uploadData.append('imagePath', imagePath);

        console.log(uploadData);

        this.http.post(this.urlUploadImageBeer, uploadData)
            .subscribe(
                err => {
                    console.log('Error occured', err);
                }
            );
    }
}
