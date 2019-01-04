import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../_services/local-storage.service';
import {ToastsService} from '../../_services/toasts.service';
import {Toast} from '../../_interfaces/toast';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styles: []
})
export class ToastComponent implements OnInit {
    toast: Toast;

    constructor(private toastsService: ToastsService) {
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
