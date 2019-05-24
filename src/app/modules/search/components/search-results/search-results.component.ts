import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from '../../shared/search.service';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styles: []
})
export class SearchResultsComponent implements OnInit {
    @Input() searchResult: any;
    @Input() searchResultsTotal: number;
    @Input() q: string;

    constructor(private searchService: SearchService) {
    }

    ngOnInit() {
    }
}
