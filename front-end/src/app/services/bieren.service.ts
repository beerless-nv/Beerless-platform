import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BierenService {

    bierenList: { name: string, brewery: string, style: string, image: string }[] = [
        {
            name: 'Gouden Carolus Cuvée Van De Keizer Whisky Infused',
            brewery: 'Brouwerij Het Anker',
            style: 'Belgian Strong Dark Ale',
            image: 'https://untappd.akamaized.net/site/beer_logos/beer-2055873_b712b_sm.jpeg'
        },
        {
            name: 'Gouden Carolus Cuvée Van De Keizer Imperial Dark',
            brewery: 'Brouwerij Het Anker',
            style: 'Belgian Strong Dark Ale',
            image: 'https://untappd.akamaized.net/site/beer_logos/beer-37945_f4c96_sm.jpeg'
        },
        {
            name: 'Gouden Carolus Tripel',
            brewery: 'Brouwerij Het Anker',
            style: 'Belgian Tripel',
            image: 'https://untappd.akamaized.net/site/beer_logos/beer-356_3b198_sm.jpeg'
        }
    ];

    constructor() {
    }
}
