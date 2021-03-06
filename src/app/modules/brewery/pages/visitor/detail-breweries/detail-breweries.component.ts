import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {BreweryService} from '../../../shared/brewery.service';

@Component({
    selector: 'app-detail-breweries',
    templateUrl: './detail-breweries.component.html',
    styles: []
})
export class DetailBreweriesComponent implements OnInit {

    environment = environment;
    brewery;

    constructor(private route: ActivatedRoute, private breweriesService: BreweryService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.getBeerById(params.get('id'));
        });
    }

    getBeerById(beerId) {
        this.breweriesService.getBreweryById(beerId)
            .subscribe(data => {
                this.brewery = data;
            });
    }

}
