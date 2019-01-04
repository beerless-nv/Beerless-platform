import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    // storageNames beers
    private readonly storageNameBeerSearchResults = 'BeerSearchResults';
    private readonly storageNameNewestBeers = 'NewestBeers';
    private readonly storageNameToasts = 'Notification';

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
    // localStorage for toasts
    //

    setToast(data) {
        localStorage.setItem(this.storageNameToasts, JSON.stringify(data));
    }

    getToast() {
        const data = localStorage.getItem(this.storageNameToasts);
        return JSON.parse(data);
    }

    clearToast() {
        localStorage.removeItem(this.storageNameToasts);
    }


    //
    // localStorage general
    //

    clearAll() {
        localStorage.clear();
    }
}
