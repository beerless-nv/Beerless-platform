import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from '../../../_services/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    toast$: BehaviorSubject<any> = new BehaviorSubject(null);

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
