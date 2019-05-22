import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styles: []
})
export class SearchResultsComponent implements OnInit {

    @Input() searchResult: any;
    @Input() q: string;

    constructor() {
    }

    ngOnInit() {
    }
}
