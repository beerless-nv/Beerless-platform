import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../../../shared/search.service';

@Component({
    selector: 'app-search-index',
    templateUrl: './search-index.component.html',
    styleUrls: []
})
export class SearchIndexComponent implements OnInit {

    q: string;
    type: string;
    from = 0;
    size = 10;

    searchResults = [];
    searchResultsTotal: number;

    loading = false;

    constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.q = params['q'];
            this.type = params['type'];
            this.from = 0;

            if (!this.q) {
                this.searchResultsTotal = 0;
                this.searchResults = [];
            } else {
                this.search(false);
            }
        });
    }

    search(append) {
        let searchResults;
        this.searchService.search(this.q, this.from, this.size, this.type).subscribe(results => {
            searchResults = results['hits'];
            this.searchResultsTotal = results['total']['value'];

            if (!append) {
                this.searchResults = [];
            }

            searchResults.map(result => {
                this.searchResults.push(result);
            });

            this.loading = false;
        });


    }

    @HostListener('window:scroll', ['$event'])
    doSomething(event) {
        const windowHeight = document.body.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;

        if (windowHeight - scrollPosition < 250 && this.loading === false && (this.searchResults.length !== this.searchResultsTotal)) {
            this.loading = true;
            this.from = this.from + 10;
            this.search(true);
        }
    }
}
