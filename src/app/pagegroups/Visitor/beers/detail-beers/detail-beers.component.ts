import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BeersService} from '../../../../_services/beers.service';
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
            this.getBeerById(params.get('id'));
            this.beerId = params.get('id');
        });
    }

    getBeerById(beerId) {
        this.beersService.getBeerById(beerId)
            .then(data => this.beer = data);
    }
}
