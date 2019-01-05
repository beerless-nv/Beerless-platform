import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {BeersService} from '../../../../_services/beers.service';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../../../_services/local-storage.service';

@Component({
    selector: 'app-index-beers',
    templateUrl: './index-beers.component.html',
    styleUrls: []
})
export class IndexBeersComponent implements OnInit {
    loading = false;
    beersList;
    beersListTotal;
    newestBeersList;
    beerName;
    beerNameOld;
    page;

    constructor(private beersService: BeersService, private router: Router, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(queryParam => {
            this.beerName = queryParam.get('name');
            this.beerNameOld = queryParam.get('name');
            this.page = queryParam.get('page');

            // Check if queryparameter name exists
            if (queryParam.get('name') == null) {
                this.getBeersByName(this.beerName);
            }
        });
        this.cdRef.detectChanges();

        this.getBeersByName(this.beerName);
        this.getBeersNewest();
    }

    getBeersByName(naam) {
        this.beerName = naam;

        if (this.beerName) {
            if (this.beerName !== this.beerNameOld) {
                this.getPage(1);
                this.beersService.getBeersByNamePagination('name', this.beerName, 10, (this.page-1)*10)
                    .then(data => {
                        this.beersList = this.localStorageService.getBeerSearchResults();
                    })
                    .then(() => {
                        this.beerNameOld = naam;
                    });
                this.getCurrentBierCount();
            } else {
                this.getPage(this.page);
                this.beersList = this.localStorageService.getBeerSearchResults();
                this.getCurrentBierCount();
            }
        } else {
            this.beersList = null;
            this.beersListTotal = null;
            this.getPage(this.page);
        }
    }

    getBeersNewest() {
        if (this.newestBeersList !== null) {
            this.beersService.getBeersNewest().then(() => {
                this.newestBeersList = this.localStorageService.getNewestBeers();
            });
        } else {
            this.newestBeersList = this.localStorageService.getNewestBeers();
        }
    }

    setPage(page){
        this.beersService.getBeersByNamePagination('name', this.beerName, 10, (page-1)*10)
            .then(() => {
                this.getPage(page);
                this.getBeersByName(this.beerName);
            });        
    }

    getPage(page) {
        this.page = page;  
        this.routeChange();
    }

    getCurrentBierCount(){
        this.beersService.getBeersByNameCount('name', this.beerName)
            .then(data => {
                this.beersListTotal = data;
            })
    }

    routeChange() {
        if (this.page === 0) {
            this.router.navigate(['/beers'], {queryParams: {name: this.beerName}});
        } else {
            this.router.navigate(['/beers'], {queryParams: {name: this.beerName, page: this.page}});
        }
    }
}
