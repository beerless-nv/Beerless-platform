import {Component, OnInit} from '@angular/core';
import {ErrorService} from '../../../../shared/components/error/error.service';

@Component({
    selector: 'app-confirm-email-error',
    templateUrl: './confirm-email-error.component.html',
    styles: []
})
export class ConfirmEmailErrorComponent implements OnInit {

    serverSideMessages: any;

    constructor(private errorService: ErrorService) {
    }

    ngOnInit() {
        this.errorService.errorMessages$.subscribe(data => {
            this.serverSideMessages = {type: 'error', data: data};
        });
    }

}
