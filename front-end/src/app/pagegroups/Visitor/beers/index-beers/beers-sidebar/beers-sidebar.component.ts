import {Component, Input, OnInit} from '@angular/core';
import {BeersService} from '../../../../../_services/beers.service';
import {environment} from '../../../../../../environments/environment';
import {LocalStorageService} from "../../../../../_services/local-storage.service";

@Component({
    selector: 'app-beers-sidebar',
    templateUrl: './beers-sidebar.component.html',
    styleUrls: []
})
export class BeersSidebarComponent implements OnInit {

    environment = environment;

    newestBeersList;

    constructor(private beersService: BeersService, private localStorageService: LocalStorageService,) {
    }

    ngOnInit() {
        this.getBeersNewest();
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
}
