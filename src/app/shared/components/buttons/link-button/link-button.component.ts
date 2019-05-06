import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'beerless-link-button',
    templateUrl: './link-button.component.html',
    styleUrls: ['./link-button.component.scss'],
})
export class LinkButtonComponent implements OnInit {

    // required attributes
    @Input() routerLink: string;

    // optional attributes
    @Input() queryParams: any;
    @Input() class: string;
    // @Input() color = 'primary';
    // @Input() textColor = 'white';

    constructor() {
    }

    ngOnInit() {
        if (!this.routerLink) {
            throw new TypeError('\'RouterLink\' is required');
        }
    }

}
