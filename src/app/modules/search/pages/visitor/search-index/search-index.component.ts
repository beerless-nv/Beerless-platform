import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SearchService} from '../../../shared/search.service';

@Component({
    selector: 'app-search-index',
    templateUrl: './search-index.component.html',
    styleUrls: []
})
export class SearchIndexComponent implements OnInit {

    page: number;
    searchResults$: Observable<any> = null;
    q: string;

    constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            console.log(params);
            this.q = params['q'];
            this.search(this.q);
        });
    }

    search(q: string) {
        this.searchResults$ = this.searchService.search(q, 0, 10);
        console.log(this.searchResults$);
    }
}
