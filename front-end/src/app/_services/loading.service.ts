import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor() {
    }

    loading$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
    error$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

    startLoading() {
        this.loading$.next(true);
    }

    finishLoading() {
        this.loading$.next(false);
    }

    // error-handling

    hasError() {
        this.error$.next(true);
    }

    noError() {
        this.error$.next(false);
    }
}
