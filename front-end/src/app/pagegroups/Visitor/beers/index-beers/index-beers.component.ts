import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {BeersService} from '../../../../services/beers.service';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-index-beers',
    templateUrl: './index-beers.component.html',
    styleUrls: []
})
export class IndexBeersComponent implements OnInit {
    loading = false;
    beersList;
    newestBeersList;
    beerName;
    beerNameOld;
    page;

    constructor(private beersService: BeersService, private router: Router, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(queryParam => {
            this.beerName = queryParam.get('name');
            this.beerNameOld = queryParam.get('name');
            this.page = queryParam.get('page');
        });
        this.cdRef.detectChanges();

        this.getBeersByName(this.beerName);
        this.getBeersNewest();
    }

    getBeersByName(naam) {
        this.beerName = naam;

        if (this.beerName) {
            console.log(this.beerName + ' ::: ' + this.beerNameOld);
            if (this.beerName !== this.beerNameOld) {
                this.getPage(1);
                this.beersService.getBeersByName(this.beerName)
                    .then(data => {
                        this.beersList = data;
                        console.log('naam verschillend');
                        localStorage.setItem('BeerSearchResults', JSON.stringify(this.beersList));
                    })
                    .then(() => {
                        console.log('oude naam', this.beerNameOld);
                        this.beerNameOld = naam;
                    });
            } else {
                this.getPage(this.page);
                this.beersList = JSON.parse(localStorage.getItem('BeerSearchResults'));
            }
        } else {
            this.beersList = null;
            this.getPage(this.page);
        }
    }

    getBeersNewest() {
        if (this.newestBeersList !== null) {
            this.beersService.getBeersNewest().then(data => localStorage.setItem('NewestBeersArray', JSON.stringify(data)));
            this.newestBeersList = JSON.parse(localStorage.getItem('NewestBeersArray'));
        } else {
            this.newestBeersList = JSON.parse(localStorage.getItem('NewestBeersArray'));
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
}
