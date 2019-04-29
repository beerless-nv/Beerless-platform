import {Component, OnInit} from '@angular/core';
import {BeerService} from '../../../shared/beer.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-detail-beers',
    templateUrl: './detail-beers.component.html',
    styles: []
})
export class DetailBeersComponent implements OnInit {

    environment = environment;
    beer;
    recommendations;

    constructor(private beerService: BeerService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.getBeerById(params.get('id'));
            this.getItemBasedRecommendations(params.get('id'));
        });
    }

    getBeerById(beerId) {
        this.beerService.getBeerById(beerId)
            .then(data => {
                this.beer = data;
            });
    }

    async getItemBasedRecommendations(beerId) {
        this.beerService.getItemBasedRecommendations(beerId, 10)
            .subscribe(data => {
                this.recommendations = data;
            });
    }
}
