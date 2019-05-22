import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../../shared/search.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: []
})
export class SearchBarComponent implements OnInit {

    @Input() totalResults: any;
    searchedValue: string;
    suggestions: Array<any> = [];
    showSuggestions = false;

    constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService) {
    }

    ngOnInit() {
        this.searchedValue = this.route.snapshot.queryParams['q'];
    }

    search(name) {
        const result = new Promise((resolve, reject) => {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                    q: name
                },
                queryParamsHandling: 'merge',
            });

            this.searchedValue = name;

            resolve(true);
        });

        result.then(() => {
            this.showSuggestions = false;
        });
    }

    suggest(name, event) {
        if (event.key !== 'Enter') {
            if (!name) {
                this.suggestions = [];
            } else {
                this.searchService.suggest(name)
                    .subscribe(suggestions => {
                        this.showSuggestions = true;
                        this.suggestions = suggestions[0]['options'];
                    });
            }
        }
    }

}
