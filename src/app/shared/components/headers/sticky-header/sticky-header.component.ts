import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'beerless-sticky-header',
    templateUrl: './sticky-header.component.html',
    styleUrls: ['./sticky-header.component.scss']
})
export class StickyHeaderComponent implements OnInit {

    constructor(private location: Location) {
    }

    ngOnInit() {
    }

    goBack() {
        this.location.back();
    }
}
