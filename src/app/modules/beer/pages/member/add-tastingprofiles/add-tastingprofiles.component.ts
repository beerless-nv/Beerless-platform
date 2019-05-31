import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../environments/environment';
import {BeerService} from '../../../shared/beer.service';

@Component({
    selector: 'app-add-tastingprofiles',
    templateUrl: './add-tastingprofiles.component.html',
    styles: []
})
export class AddTastingprofilesComponent implements OnInit {

    beer: any;
    environment = environment;

    constructor(private route: ActivatedRoute, private beerService: BeerService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.getBeerById(params['id']);
        });
    }

    getBeerById(beerId: number) {
        this.beerService.getBeerById(beerId).subscribe(beer => {
            this.beer = beer;
        });
    }

}
