import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    // storageNames beers
    private readonly storageNameBeerSearchResults = 'BeerSearchResults';
    private readonly storageNameNewestBeers = 'NewestBeers';

    constructor() {
    }

    //
    // localStorage for beers
    //

    // BeerSearchResults

    setBeerSearchResults(data) {
        localStorage.setItem(this.storageNameBeerSearchResults, JSON.stringify(data));
    }

    getBeerSearchResults() {
        const data = localStorage.getItem(this.storageNameBeerSearchResults);
        return JSON.parse(data);
    }

    clearBeerSearchResults() {
        localStorage.removeItem(this.storageNameBeerSearchResults);
    }

    // NewestBeers

    setNewestBeers(data) {
        localStorage.setItem(this.storageNameNewestBeers, JSON.stringify(data));
    }

    getNewestBeers() {
        const data = localStorage.getItem(this.storageNameNewestBeers);
        return JSON.parse(data);
    }

    clearNewestBeers() {
        localStorage.removeItem(this.storageNameNewestBeers);
    }



    //
    // localStorage general
    //

    clearAll() {
        localStorage.clear();
    }
}
