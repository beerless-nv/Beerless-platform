import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NavService {

    keyboardIsOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {
    }
}
