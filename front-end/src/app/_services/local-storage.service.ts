import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    // storageNames beers
    private readonly storageNameBeerSearchResults = 'BeerSearchResults';
    private readonly storageNameNewestBeers = 'NewestBeers';
    private readonly storageNameToasts = 'Notification';
    private readonly storageNameUser = 'User';

    constructor() {
    }

    //
    // localStorage for beers
    //

    // BeerSearchResults

    setBeerSearchResults(name, page, data) {
        localStorage.setItem(this.storageNameBeerSearchResults, JSON.stringify({search_term: name, page: page, search_result: data}));
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
    // localStorage for users
    //

    setUser(data) {
        localStorage.setItem(this.storageNameUser, JSON.stringify(data));
    }

    getUser() {
        const data = localStorage.getItem(this.storageNameUser);
        return JSON.parse(data);
    }

    clearUser() {
        localStorage.removeItem(this.storageNameUser);
    }


    //
    // localStorage general
    //

    clearAll() {
        localStorage.clear();
    }
}
