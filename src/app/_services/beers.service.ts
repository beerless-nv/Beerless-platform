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

    getBeerById(id) {
        const params = new HttpParams()
            .append('filter', '{"include":[{"relation":"breweries","scope":{"include":{"relation":"beerFromBreweries","scope":{"where":{"beerId":847}}}}},"styleTags"]}');

        return this.http.get(this.urlBeer + '/' + id, {params})
            .toPromise();
    }

    getBeersNewest(limit) {
        const params = new HttpParams()
            .set('filter[fields][id]', 'true')
            .set('filter[fields][name]', 'true')
            .set('filter[fields][logo]', 'true')
            .set('filter[fields][timestampCreated]', 'true')
            .set('filter[include]', 'breweries')
            .set('filter[order]', 'timestampCreated DESC')
            .set('filter[limit]', limit);

        return this.http.get(this.urlBeer, {params});
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
