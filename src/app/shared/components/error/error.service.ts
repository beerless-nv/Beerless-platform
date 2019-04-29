import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    errorMessages$: BehaviorSubject<Array<string>> = new BehaviorSubject(null);

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.errorMessages$.next(null);
            }
        });
    }

    handleErrorMsg(errorMessages) {
        const errorMessageArray = [];
        if (errorMessages != null) {
            for (const key in errorMessages) {
                errorMessages[key].map(errorMessage => {
                    if (/^[A-Z]/.test(errorMessage)) {
                        errorMessageArray.push(errorMessage);
                    }
                });
            }
        }

        this.errorMessages$.next(errorMessageArray);
    }

    handleLoginError(errorMessage) {
        const errorMessageArray = [];
        if (errorMessage != null) {
            errorMessageArray.push(errorMessage);
        }

        this.errorMessages$.next(errorMessageArray);
    }
}
