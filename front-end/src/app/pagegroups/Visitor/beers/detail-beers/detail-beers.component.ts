import {Component, OnInit} from '@angular/core';
import {BeersService} from '../../../../services/beers.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {finalize, share} from 'rxjs/operators';

@Component({
    selector: 'app-detail-beers',
    templateUrl: './detail-beers.component.html',
    styles: []
})
export class DetailBeersComponent implements OnInit {
    loading = false;
    environment = environment;
    beerId;
    beer;

    constructor(private beersService: BeersService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.beerId = params.get('id');
        });

        this.getBeerById();
    }

    getBeerById() {
        this.beersService.getBeerById(this.beerId)
            .then(data => this.beer = data['beer'])
            .then(() => this.loading = true)
            .then(() => console.log(this.beer));
    }
}
