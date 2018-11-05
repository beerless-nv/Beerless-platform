import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, share, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BierenService {

    readonly url = 'http://localhost/Beerless-platform/back-end/public/bieren/all';

    // bierenList: { name: string, brewery: string, style: string, image: string }[] = [
    //     {
    //         name: 'Gouden Carolus Cuvée Van De Keizer Whisky Infused',
    //         brewery: 'Brouwerij Het Anker',
    //         style: 'Belgian Strong Dark Ale',
    //         image: 'https://untappd.akamaized.net/site/beer_logos/beer-2055873_b712b_sm.jpeg'
    //     },
    //     {
    //         name: 'Gouden Carolus Cuvée Van De Keizer Imperial Dark',
    //         brewery: 'Brouwerij Het Anker',
    //         style: 'Belgian Strong Dark Ale',
    //         image: 'https://untappd.akamaized.net/site/beer_logos/beer-37945_f4c96_sm.jpeg'
    //     },
    //     {
    //         name: 'Gouden Carolus Tripel',
    //         brewery: 'Brouwerij Het Anker',
    //         style: 'Belgian Tripel',
    //         image: 'https://untappd.akamaized.net/site/beer_logos/beer-356_3b198_sm.jpeg'
    //     }
    // ];

    constructor(private http: HttpClient) {
        console.log(this.url);
    }

    getBieren(): Observable<any> {
        return this.http.get(this.url)
            .pipe(
                tap(req => console.log('get-request', req)),          // (6)
                catchError(                                                // (7)
                    (error) => {
                        console.log(error);
                        alert(error.message);
                        return EMPTY;
                    }),
                share()                                                    // (8)
            );
    }
}
