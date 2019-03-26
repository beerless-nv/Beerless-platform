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
    private readonly storageNameAccessToken = 'AccessToken';

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
        return JSON.parse(localStorage.getItem(this.storageNameBeerSearchResults));
    }

    clearBeerSearchResults() {
        localStorage.removeItem(this.storageNameBeerSearchResults);
    }

    // NewestBeers

    setNewestBeers(data) {
        localStorage.setItem(this.storageNameNewestBeers, JSON.stringify(data));
    }

    getNewestBeers() {
        return JSON.parse(localStorage.getItem(this.storageNameNewestBeers));
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
        return JSON.parse(localStorage.getItem(this.storageNameToasts));
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
        return JSON.parse(localStorage.getItem(this.storageNameUser));
    }

    clearUser() {
        localStorage.removeItem(this.storageNameUser);
    }


    //
    // localStorage for access token
    //

    setAccessToken(data) {
        localStorage.setItem(this.storageNameAccessToken, JSON.stringify(data));
    }

    getAccessToken() {
        return JSON.parse(localStorage.getItem(this.storageNameAccessToken));
    }

    clearAccessToken() {
        localStorage.removeItem(this.storageNameAccessToken);
    }


    //
    // localStorage general
    //

    clearAll() {
        localStorage.clear();
    }
}
