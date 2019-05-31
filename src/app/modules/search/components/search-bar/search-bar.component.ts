import {
    AfterViewChecked,
    AfterViewInit, ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {SearchService} from '../../shared/search.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: []
})
export class SearchBarComponent implements OnInit, AfterViewChecked {

    @Input() totalResults: any;
    environment = environment;
    searchedValue: string;
    searchedTerm: any;
    searchedType: string;
    suggestions: Array<any> = [];
    showSuggestions = false;
    suggestionDivs;
    focusedSuggestion = -1;
    loadingResults$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    @ViewChild('searchDropdown') searchDropdown: ElementRef;
    @ViewChildren('search-dropdown-item') searchDropdownItems: ElementRef;

    constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService, private elRef: ElementRef, private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.searchedValue = (params['q'] || null);
            this.searchedTerm = (params['q'] || null);
            this.searchedType = (params['type'] || 'Beer');
        });

        this.searchService.loadingResults$.subscribe(isLoading => {
            this.loadingResults$ = this.searchService.loadingResults$;
        });
    }

    ngAfterViewChecked(): void {
        this.cdRef.detectChanges();
    }

    search(name: string, type: string) {
        if (name) {
            // loading starts
            this.searchService.loadingResults$.next(true);
        }

        // change url
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

        // hide suggestions after search
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
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Tab') {
            event.preventDefault();

            this.suggestionDivs = this.elRef.nativeElement.querySelectorAll('.suggest-item');

            switch (event.key) {
                case 'ArrowDown':
                    if (this.suggestionDivs.length > this.focusedSuggestion + 1) {
                        this.focusedSuggestion++;
                    } else {
                        this.focusedSuggestion = 0;
                    }
                    break;
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

    clearResults() {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                q: null
            },
            queryParamsHandling: 'merge',
        });
    }
}
