import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {BeersService} from '../../../../services/beers.service';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {delay, finalize, share} from "rxjs/operators";

@Component({
    selector: 'app-index-beers',
    templateUrl: './index-beers.component.html',
    styleUrls: []
})
export class IndexBeersComponent implements OnInit {
    loading = false;
    beersList$: Observable<any>;
    newestBeersList$: Observable<any>;
    beerName;
    beerNameOld = '';
    newestBeerLoaded;
    page;

    constructor(private beersService: BeersService, private router: Router, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(queryParam => {
            this.beerName = queryParam.get('name');
            this.page = queryParam.get('page');
        });
        this.cdRef.detectChanges();

        if (this.beerName !== null) {
            this.beersList$ = of(JSON.parse(localStorage.getItem('BeerSearchArray')));
        } else {
            localStorage.removeItem('BeerSearchArray');
        }

        this.getBeersNewest();
    }

    getBeersByName(naam) {
        this.loading = true;
        this.beerNameOld = this.beerName;
        this.beerName = naam;

        if (naam !== '') {
            if (this.beerName !== this.beerNameOld) {
                this.getPage(1);
                this.beersService.getBeersByName(this.beerName)
                    .then(data => this.beersList$ = of(data))
                    .then(
                        finalize(() => {
                            // save to localStorage
                            this.beersList$.subscribe(val => localStorage.setItem('BeerSearchArray', JSON.stringify(val)));
                                // finalize(() => {
                                //     this.loading = false;
                                // }));

                            this.delay(2000).then(() => {
                                this.loading = false;
                            });
                        }),
                        share()
                    );

            } else {
                this.getPage(this.page);
            }
        } else {
            localStorage.removeItem('BeerSearchArray');
            this.beersList$ = JSON.parse(localStorage.getItem('BeerSearchArray'));
        }
    }

    getBeersNewest() {
        if (this.newestBeerLoaded !== true) {
            this.beersService.getBeersNewest().subscribe(val => localStorage.setItem('NewestBeersArray', JSON.stringify(val)));
            this.newestBeersList$ = JSON.parse(localStorage.getItem('NewestBeersArray'));
            this.newestBeerLoaded = true;
        } else {
            this.newestBeersList$ = JSON.parse(localStorage.getItem('NewestBeersArray'));
        }
    }

    getPage(page) {
        this.page = page;
        this.routeChange();
    }

    routeChange() {
        if (this.page === 0) {
            this.router.navigate(['/beers'], {queryParams: {name: this.beerName}});
        } else {
            this.router.navigate(['/beers'], {queryParams: {name: this.beerName, page: this.page}});
        }
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(()=>resolve(), ms)).then();
    }
}
