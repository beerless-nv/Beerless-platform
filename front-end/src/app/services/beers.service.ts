import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, share, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BeersService {

    readonly urlGetBeersByName = environment.backend + 'beer/getByName';
    readonly urlGetAllBeers = environment.backend + 'beer/all';
    readonly urlGetBeersNewest = environment.backend + 'beer/getNewest';
    readonly urlInsertBeer = environment.backend + 'beer/insert';
    readonly urlUploadImageBeer = environment.backend + 'beer/uploadImage';

    constructor(private http: HttpClient) {
    }

    getBeersByName(name): Observable<any> {
        const params = new HttpParams()
            .set('name', name);

        return this.http.get(this.urlGetBeersByName, {params})
            .pipe(
                tap(req => console.log('get-request', req)),
                catchError(
                    (error) => {
                        console.log(error);
                        alert(error.message);
                        return EMPTY;
                    }),
                share()
            );
    }

    getBeersNewest(): Observable<any> {
        return this.http.get(this.urlGetBeersNewest)
            .pipe(
                tap(req => console.log('get-request', req)),
                catchError(
                    (error) => {
                        console.log(error);
                        alert(error.message);
                        return EMPTY;
                    }),
                share()
            );
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
                req => {
                    console.log(req);
                },
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
                req => {
                    console.log(req);
                },
                err => {
                    console.log('Error occured', err);
                }
            );
    }
}
