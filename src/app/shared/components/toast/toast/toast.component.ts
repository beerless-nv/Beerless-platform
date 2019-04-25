import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../../../_services/local-storage.service';
import {ToastService} from '../toast.service';

@Component({
    selector: 'beerless-toast',
    templateUrl: './toast.component.html',
    styles: []
})
export class ToastComponent implements OnInit {
    toast;

    constructor(private toastsService: ToastService) {
    }

    ngOnInit() {
        this.toastsService.toast$.subscribe(data => {
            this.toast = data;
        });
    }

    deleteToast() {
        this.toastsService.deleteToast();
    }
}
