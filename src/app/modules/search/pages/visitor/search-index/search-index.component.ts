import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BeerService} from '../../../../beer/shared/beer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../../../../_services/local-storage.service';
import {PlatformLocation} from '@angular/common';

@Component({
    selector: 'app-search-index',
    templateUrl: './search-index.component.html',
    styleUrls: []
})
export class SearchIndexComponent implements OnInit {
    loading = false;
    beersList;
    beersListTotal;
    beerName;
    beerNameOld = null;
    page: number;
    pageOld: number;
    popState = false;

    constructor(private beersService: BeerService, private router: Router, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private localStorageService: LocalStorageService, private platformLocation: PlatformLocation) {
    }

    ngOnInit() {

        // this.platformLocation.onPopState(() => {
        //     this.getBeersHistory();
        //     this.popState = true;
        // });
        //
        // this.route.queryParamMap.subscribe(queryParam => {
        //     this.beerName = queryParam.get('name');
        //     this.page = Number(queryParam.get('page'));
        //
        //     // Check if queryparameter name exists
        //     if (queryParam.get('name') != null) {
        //         this.getBeersByName(this.beerName, queryParam.get('page'));
        //     }
        // });
        // this.cdRef.detectChanges();
        // console.log(this.route.snapshot.data);

        // this.newestBeersList = this.route.snapshot.data['beers'];
    }

    getBeersByName(name, page) {
        // this.beerName = name;
        // if (this.localStorageService.getBeerSearchResults() != null) {
        //     this.beerNameOld = this.localStorageService.getBeerSearchResults().search_term;
        //     this.pageOld = this.localStorageService.getBeerSearchResults().page;
        // }
        //
        //
        // if (this.beerName) {
        //     if (this.beerName !== this.beerNameOld) {
        //         // this.getPage(1);
        //         this.beersService.getBeersByNamePagination('name', this.beerName, 10, (this.page - 1) * 10)
        //             .then(data => {
        //                 this.beersList = this.localStorageService.getBeerSearchResults();
        //             });
        //         this.getCurrentBierCount();
        //
        //     } else {
        //         if (this.page !== this.pageOld) {
        //             this.beersService.getBeersByNamePagination('name', this.beerName, 10, (this.page - 1) * 10)
        //                 .then(data => {
        //                     this.beersList = this.localStorageService.getBeerSearchResults();
        //                 });
        //         } else {
        //             this.getPage(this.pageOld);
        //
        //             this.beersList = this.localStorageService.getBeerSearchResults();
        //             this.getCurrentBierCount();
        //         }
        //     }
        // } else {
        //     this.beersList = null;
        //     this.beersListTotal = null;
        //     this.getPage(0);
        // }
    }

    getBeersHistory() {
        this.beersList = this.localStorageService.getBeerSearchResults();
        this.getCurrentBierCount();
    }

    getPage(page) {
        this.routeChange(this.beerName, page);
    }

    getCurrentBierCount() {
        this.beersService.getBeersByNameCount('name', this.beerName)
            .then(data => {
                this.beersListTotal = data;
            });
    }

    routeChange(beerName, page) {
        this.beerName = beerName;
        if (page === 0) {
            this.router.navigate(['/beers'], {queryParams: {name: beerName}});
        } else {
            this.router.navigate(['/beers'], {queryParams: {name: beerName, page: page}});
        }
    }
}
