import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {BehaviorSubject} from 'rxjs';
import {Toast} from '../_interfaces/toast';

@Injectable({
    providedIn: 'root'
})
export class ToastsService {

    toast$: BehaviorSubject<Toast> = new BehaviorSubject(null);

    constructor(private localStorageService: LocalStorageService) {
        this.getToast();
    }

    addToast(title, content, style) {
        this.localStorageService.setToast({
            title: title,
            content: content,
            style: style
        });

        this.getToast();
    }

    getToast() {
        this.toast$.next(this.localStorageService.getToast());
    }

    deleteToast() {
        this.localStorageService.clearToast();
        this.toast$.next(null);
    }
}
