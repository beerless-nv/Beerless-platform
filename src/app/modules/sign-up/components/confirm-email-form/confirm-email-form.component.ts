import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-confirm-email-form',
    templateUrl: './confirm-email-form.component.html',
    styles: []
})
export class ConfirmEmailFormComponent implements OnInit {

    @Input() user: any;

    constructor() {
    }

    ngOnInit() {
    }

}
