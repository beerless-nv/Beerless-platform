import {Component, ElementRef, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
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
    searchedType: string;
    suggestions: Array<any> = [];
    showSuggestions = false;
    suggestionDivs;
    focusedSuggestion = -1;
    @ViewChild('searchDropdown') searchDropdown: ElementRef;
    @ViewChildren('search-dropdown-item') searchDropdownItems: ElementRef;

    constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService, private elRef: ElementRef) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.searchedValue = (params['q'] || null);
            this.searchedType = (params['type'] || 'Beer');
        });
    }

    search(name: string, type: string) {
        const result = new Promise((resolve, reject) => {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                    q: name,
                    type: type
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

    async suggest(name, event) {
        if (event.key !== 'Enter') {
            if (!name) {
                this.suggestions = [];
            } else {
                this.suggestions = await this.searchService.suggest(name, this.searchedType);
                this.showSuggestions = true;
            }
        }

        this.focusedSuggestion = -1;
    }

    select(event) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Tab') {
            event.preventDefault();

            this.suggestionDivs = this.elRef.nativeElement.querySelectorAll('.suggest-item');

            switch (event.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    if (this.suggestionDivs.length > this.focusedSuggestion + 1) {
                        this.focusedSuggestion++;
                    } else {
                        this.focusedSuggestion = 0;
                    }
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    if (this.focusedSuggestion > 0) {
                        this.focusedSuggestion--;
                    } else {
                        this.focusedSuggestion = this.suggestionDivs.length - 1;
                    }
                    break;
            }

            const focusingDiv = this.suggestionDivs[this.focusedSuggestion];
            if (focusingDiv) {
                this.suggestionDivs[this.focusedSuggestion].focus();
            }
        }
    }

    selectType(selectedValue: string) {
        this.searchedType = selectedValue;
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                type: selectedValue
            },
            queryParamsHandling: 'merge',
        });
    }
}
