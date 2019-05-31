import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LayoutsService {

    layout$: BehaviorSubject<string> = new BehaviorSubject<string>('standard');

    constructor() {
    }


}
