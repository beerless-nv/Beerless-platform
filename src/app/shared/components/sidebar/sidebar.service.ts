import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    isOpen$: BehaviorSubject<boolean> = new BehaviorSubject(null);

    constructor() {
    }
}
