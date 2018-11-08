import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {formatDate} from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    title = 'Beerless-platform';

    dateToday = new Date();

    constructor() {
    }

    ngOnInit() {
    }
}
