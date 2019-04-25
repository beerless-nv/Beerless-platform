import {Component, Input, OnInit} from '@angular/core';
import {BeerService} from '../../shared/beer.service';
import {environment} from '../../../../../environments/environment';
import {LocalStorageService} from '../../../../_services/local-storage.service';

@Component({
    selector: 'app-beers-sidebar',
    templateUrl: './beers-sidebar.component.html',
    styleUrls: []
})
export class BeersSidebarComponent implements OnInit {

    environment = environment;

    newestBeersList;
    numberOfBeers = 5;

    constructor(private beersService: BeerService, private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        this.getBeersNewest();
    }

    getBeersNewest() {
        this.beersService.getBeersNewest(this.numberOfBeers).subscribe(data => {
            this.newestBeersList = data;
        });
    }

    getMoreBeersNewest() {
        this.numberOfBeers = this.numberOfBeers + 5;
        this.getBeersNewest();
    }
}
